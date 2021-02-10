const fs = require('fs').promises;
const {program} = require('commander');
const {TonClient} = require("@tonclient/core");
const {libNode} = require("@tonclient/lib-node");

const TimerManagerContract = require('./src/TimerManagerContract.js');


program
    .option('-l, --node-se', 'deploy to node-se with default giver')
    .option('-n, --network <url>', 'network url', 'http://localhost')
    .option('-k, --keys <path>', 'path to file with keys', 'timer.keys.json');

program.parse(process.argv);
const options = program.opts();


async function getKeys(client) {
    const keys_path = options.keys;

    try {
        return JSON.parse(await fs.readFile(keys_path, 'utf8'));
    } catch (e) {
        console.log('Can\'t find saved keys, generating new');
        let keys = await client.crypto.generate_random_sign_keys();
        await fs.writeFile(keys_path, JSON.stringify(keys));
        return keys

    }
}


const giverAddress = '0:841288ed3b55d9cdafa806807f02a0ae0c169aa5edfe88a789a6482429756a94';
const giverAbi = {
    'ABI version': 1,
    functions: [{
        name: 'constructor',
        inputs: [],
        outputs: []
    }, {
        name: 'sendGrams',
        inputs: [
            {name: 'dest', type: 'address'},
            {name: 'amount', type: 'uint64'}
        ],
        outputs: []
    }],
    events: [],
    data: []
};

async function get_tokens_from_giver(client, account) {
    const params = {
        send_events: false,
        message_encode_params: {
            address: giverAddress,
            abi: {
                type: 'Contract',
                value: giverAbi
            },
            call_set: {
                function_name: 'sendGrams',
                input: {
                    dest: account,
                    amount: 10_000_000_000
                }
            },
            signer: {type: 'None'}
        },
    };
    await client.processing.process_message(params)
}


async function main(client) {
    const timer_code = await fs.readFile('./src/timer-code.boc', {encoding: 'base64'});

    const abi = {
        type: 'Contract',
        value: TimerManagerContract.package.abi
    };

    const deployKeys = await getKeys(client);

    const deployOptions = {
        abi,
        deploy_set: {
            tvc: TimerManagerContract.package.imageBase64,
            initial_data: {}
        },
        call_set: {
            function_name: 'constructor',
            input: {timerCode: timer_code}
        },
        signer: {
            type: 'Keys',
            keys: deployKeys
        }
    };

    const {address} = await client.abi.encode_message(deployOptions);
    console.log(`Future address of the timer contract will be: ${address}`);

    if (options.nodeSe) {
        await get_tokens_from_giver(client, address);
        console.log(`Tokes were transferred from giver to ${address}`);
    } else {
        console.log(`Please, send some tokens to ${address} in ${options.network} and rerun this script`);
        return
    }

    await client.processing.process_message({
        send_events: false,
        message_encode_params: deployOptions
    });

    console.log(`TimerManager contract was deployed at address: ${address}`);

}

(async () => {
    try {
        TonClient.useBinaryLibrary(libNode);
        const client = new TonClient({
            network: {
                server_address: options.network
            }
        });
        await main(client);
        process.exit(0);
    } catch (error) {
        console.error(error);
    }
})();

//
// This file was generated using TON Labs developer tools.
//

const abi = {
	"ABI version": 2,
	"header": ["time"],
	"functions": [
		{
			"name": "constructor",
			"inputs": [
				{"name":"timerCode","type":"cell"}
			],
			"outputs": [
			]
		},
		{
			"name": "getTimer",
			"inputs": [
			],
			"outputs": [
				{"name":"value0","type":"address"}
			]
		},
		{
			"name": "addEvent",
			"inputs": [
				{"name":"dest","type":"address"},
				{"name":"value","type":"uint128"},
				{"name":"payload","type":"cell"},
				{"name":"bounce","type":"bool"},
				{"name":"sendFlags","type":"uint16"},
				{"name":"delay","type":"uint64"},
				{"name":"next","type":"uint64"}
			],
			"outputs": [
			]
		},
		{
			"name": "removeEvent",
			"inputs": [
				{"name":"eventId","type":"uint32"}
			],
			"outputs": [
			]
		},
		{
			"name": "getEvents",
			"inputs": [
			],
			"outputs": [
				{"components":[{"name":"id","type":"uint32"},{"name":"dest","type":"address"},{"name":"value","type":"uint128"},{"name":"payload","type":"cell"},{"name":"bounce","type":"bool"},{"name":"sendFlags","type":"uint16"},{"name":"delay","type":"uint64"},{"name":"next","type":"uint64"},{"name":"last","type":"uint64"}],"name":"eventsList","type":"tuple[]"}
			]
		},
		{
			"name": "onEvent",
			"inputs": [
				{"name":"eventId","type":"uint32"}
			],
			"outputs": [
			]
		},
		{
			"name": "replenishTimer",
			"inputs": [
				{"name":"value","type":"uint128"}
			],
			"outputs": [
			]
		},
		{
			"name": "updateTimerAddress",
			"inputs": [
				{"name":"newTimer","type":"address"}
			],
			"outputs": [
			]
		},
		{
			"name": "stopPending",
			"inputs": [
			],
			"outputs": [
			]
		},
		{
			"name": "startPending",
			"inputs": [
			],
			"outputs": [
			]
		},
		{
			"name": "setCode",
			"inputs": [
				{"name":"code","type":"cell"}
			],
			"outputs": [
			]
		}
	],
	"data": [
	],
	"events": [
	]
};

const pkg = {
    abi,
    imageBase64: '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',
};

class TimerManagerContract {
    /**
    * @param {TONClient} client
    * @param {string} address can be null if contract will be deployed
    * @param {TONKeyPairData} keys
    */
    constructor(client, address, keys) {
        this.client = client;
        this.address = address;
        this.keys = keys;
        this.package = pkg;
        this.abi = abi;
    }

    /**
     * @param {object} constructorParams
     * @param {cell} constructorParams.timerCode
     */
    async deploy(constructorParams) {
        if (!this.keys) {
            this.keys = await this.client.crypto.ed25519Keypair();
        }
        this.address = (await this.client.contracts.deploy({
            package: pkg,
            constructorParams,
            initParams: {},
            keyPair: this.keys,
        })).address;
    }

    /**
    * @param {string} functionName
    * @param {object} input
    * @return {Promise.<object>}
    */
    async run(functionName, input) {
        const result = await this.client.contracts.run({
            address: this.address,
            functionName,
            abi,
            input,
            keyPair: this.keys,
        });
        return result.output;
    }

   /**
    * @param {string} functionName
    * @param {object} input
    * @return {Promise.<object>}
    */
    async runLocal(functionName, input) {
        const result = await this.client.contracts.runLocal({
            address: this.address,
            functionName,
            abi,
            input,
            keyPair: this.keys,
        });
        return result.output;
    }

    /**
     * @typedef TimerManagerContract_getTimer
     * @type {object}
     * @property {string} value0  (address)
     */

    /**
     * @return {Promise.<TimerManagerContract_getTimer>}
     */
    getTimer() {
        return this.run('getTimer', {});
    }

    /**
     * @return {Promise.<TimerManagerContract_getTimer>}
     */
    getTimerLocal() {
        return this.runLocal('getTimer', {});
    }

    /**
     * @param {object} params
     * @param {string} params.dest (address)
     * @param {uint128} params.value
     * @param {cell} params.payload
     * @param {bool} params.bounce
     * @param {number} params.sendFlags (uint16)
     * @param {uint64} params.delay
     * @param {uint64} params.next
     */
    addEvent(params) {
        return this.run('addEvent', params);
    }

    /**
     * @param {object} params
     * @param {string} params.dest (address)
     * @param {uint128} params.value
     * @param {cell} params.payload
     * @param {bool} params.bounce
     * @param {number} params.sendFlags (uint16)
     * @param {uint64} params.delay
     * @param {uint64} params.next
     */
    addEventLocal(params) {
        return this.runLocal('addEvent', params);
    }

    /**
     * @param {object} params
     * @param {number} params.eventId (uint32)
     */
    removeEvent(params) {
        return this.run('removeEvent', params);
    }

    /**
     * @param {object} params
     * @param {number} params.eventId (uint32)
     */
    removeEventLocal(params) {
        return this.runLocal('removeEvent', params);
    }

    /**
     * @typedef TimerManagerContract_getEvents
     * @type {object}
     * @property {tuple[]} eventsList 
     */

    /**
     * @return {Promise.<TimerManagerContract_getEvents>}
     */
    getEvents() {
        return this.run('getEvents', {});
    }

    /**
     * @return {Promise.<TimerManagerContract_getEvents>}
     */
    getEventsLocal() {
        return this.runLocal('getEvents', {});
    }

    /**
     * @param {object} params
     * @param {number} params.eventId (uint32)
     */
    onEvent(params) {
        return this.run('onEvent', params);
    }

    /**
     * @param {object} params
     * @param {number} params.eventId (uint32)
     */
    onEventLocal(params) {
        return this.runLocal('onEvent', params);
    }

    /**
     * @param {object} params
     * @param {uint128} params.value
     */
    replenishTimer(params) {
        return this.run('replenishTimer', params);
    }

    /**
     * @param {object} params
     * @param {uint128} params.value
     */
    replenishTimerLocal(params) {
        return this.runLocal('replenishTimer', params);
    }

    /**
     * @param {object} params
     * @param {string} params.newTimer (address)
     */
    updateTimerAddress(params) {
        return this.run('updateTimerAddress', params);
    }

    /**
     * @param {object} params
     * @param {string} params.newTimer (address)
     */
    updateTimerAddressLocal(params) {
        return this.runLocal('updateTimerAddress', params);
    }

    /**
     */
    stopPending() {
        return this.run('stopPending', {});
    }

    /**
     */
    stopPendingLocal() {
        return this.runLocal('stopPending', {});
    }

    /**
     */
    startPending() {
        return this.run('startPending', {});
    }

    /**
     */
    startPendingLocal() {
        return this.runLocal('startPending', {});
    }

    /**
     * @param {object} params
     * @param {cell} params.code
     */
    setCode(params) {
        return this.run('setCode', params);
    }

    /**
     * @param {object} params
     * @param {cell} params.code
     */
    setCodeLocal(params) {
        return this.runLocal('setCode', params);
    }

}

TimerManagerContract.package = pkg;

module.exports = TimerManagerContract;

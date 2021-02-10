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

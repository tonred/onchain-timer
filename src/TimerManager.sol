pragma ton-solidity >= 0.36.0;

contract Timer {}

contract TimerManager {

    address owner;
    address timer;

    struct Event {
        uint32 id;

        // Callback message description
        // When timer runs out, it will be sent message with the specified fields
        address dest;     // Destination address where the message will be sent
        uint128 value;    // Amount of tokes for outgoing message
        TvmCell payload;  // Message payload
        bool bounce;      // Message bounce flag
        uint16 sendFlags; // Message flags

        // Timer description
        uint64 delay;   // Delay in seconds between activations, 0 if onetime event
        uint64 next;    // next activation time
        uint64 last;    // last activation time
    }

    mapping(uint32 => Event) events;

    uint constant IS_NOT_OWNER = 101;
    uint constant IS_NOT_TIMER = 102;
    uint constant EMPTY_DELAY_AND_NEXT = 111;

    uint8 constant TIMER_PAUSE_CODE = 0;
    uint8 constant TIMER_RESUME_CODE = 1;
    uint8 constant TIMER_REMOVE_EVENT_CODE = 10;
    uint8 constant TIMER_ADD_EVENT_CODE = 11;


    uint128 constant TIMER_DEPLOY_VALUE = 1e9;
    uint128 constant TIMER_CALL_VALUE = 1e8;

    modifier checkOwnerAndAccept {
        require(msg.pubkey() == tvm.pubkey() || (owner != address(0) && msg.sender == owner), IS_NOT_OWNER);
        tvm.accept();
        _;
    }

    modifier timerCall {
        require(msg.sender == timer, IS_NOT_TIMER);
        tvm.accept();
        _;
    }

    constructor(TvmCell timerCode) public checkOwnerAndAccept{
        if (msg.sender != address(0)) {
            owner == msg.sender;
        }
        TvmBuilder buildHash;
        buildHash.store(address(this));
        uint256 publicKey = tvm.hash(buildHash.toCell());
        TvmBuilder buildData;
        mapping(uint32 => uint64) timerEventsDict;
        uint8 timerInitCode = uint8(10);
        buildData.store(timerInitCode, publicKey, timerEventsDict);
        TvmCell timerData = buildData.toCell();
        TvmCell stateInit = tvm.buildStateInit(timerCode, timerData);
        timer = new Timer{value : TIMER_DEPLOY_VALUE, stateInit : stateInit}();
    }

    function getTimer() public view returns (address){
        return timer;
    }

    function addEvent(
        address dest,
        uint128 value,
        TvmCell payload,
        bool bounce,
        uint16 sendFlags,
        uint64 delay,
        uint64 next
    ) public checkOwnerAndAccept {
        require(delay != 0 || next != 0, EMPTY_DELAY_AND_NEXT);
        if (delay != 0 && next == 0) {
            next = uint64(now) + delay;
        }
        uint32 id = _generateId();
        Event newEvent = Event(id, dest, value, payload, bounce, sendFlags, delay, next, 0);
        events[id] = newEvent;
        setEventOnTimer(id, next);
    }

    function removeEvent(uint32 eventId) public checkOwnerAndAccept {
        _removeEvent(eventId);
        removeEventOnTimer(eventId);
    }

    function _removeEvent(uint32 eventId) private {
        delete events[eventId];
    }

    function getEvents() public view returns (Event[] eventsList) {
        optional(uint32, Event) eventMap = events.min();
        while (eventMap.hasValue()) {
            (,Event eventData) = eventMap.get();
            eventsList.push(eventData);
            eventMap = events.next(eventData.id);
        }
    }

    function onEvent(uint32 eventId) public timerCall {
        optional(Event) eventMap = events.fetch(eventId);
        if (eventMap.hasValue()) {
            Event eventData = eventMap.get();
            sendCallback(eventData);
            if (eventData.delay != 0) {
                eventData.last = eventData.next;
                eventData.next = eventData.next + eventData.delay;
                events[eventId] = eventData;
                setEventOnTimer(eventId, eventData.next);
            } else {
                _removeEvent(eventId);
            }
        }
    }

    function sendCallback(Event eventData) pure private {
        eventData.dest.transfer(eventData.value, eventData.bounce, eventData.sendFlags, eventData.payload);
    }

    function replenishTimer(uint128 value) public view checkOwnerAndAccept {
        timer.transfer(value, false);
    }

    function updateTimerAddress(address newTimer) public checkOwnerAndAccept {
        timer = newTimer;
    }

    function setEventOnTimer(uint32 eventId, uint64 next) private view {
        TvmBuilder payload;
        payload.store(TIMER_ADD_EVENT_CODE, eventId, next);
        callTimer(payload);
    }

    function removeEventOnTimer(uint32 eventId) private view {
        TvmBuilder payload;
        payload.store(TIMER_REMOVE_EVENT_CODE, eventId);
        callTimer(payload);
    }

    function stopPending() public view checkOwnerAndAccept {
        TvmBuilder payload;
        payload.store(TIMER_PAUSE_CODE);
        callTimer(payload);
    }

    function startPending() public view checkOwnerAndAccept {
        TvmBuilder payload;
        payload.store(TIMER_RESUME_CODE);
        callTimer(payload);
    }

    function callTimer(TvmBuilder payload) private view {
        timer.transfer({value : TIMER_CALL_VALUE, body : payload.toCell()});
    }


    function setCode(TvmCell code) public pure checkOwnerAndAccept {
        tvm.setcode(code);
        tvm.setCurrentCode(code);
        onCodeUpgrade();
    }

    function onCodeUpgrade() private pure {}

    function _generateId() inline private pure returns (uint32) {
        return rnd.next(uint32(0xFFFFFFFF));
    }


}

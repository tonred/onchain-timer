pragma ton-solidity ^0.36.0;

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

interface ITimerManager {

    function addEvent(
        address dest,
        uint128 value,
        TvmCell payload,
        bool bounce,
        uint16 sendFlags,
        uint64 delay,
        uint64 next
    ) external;


    function removeEvent(uint32 eventId) external;

    function replenishTimer(uint128 value) external;

    function updateTimerAddress(address newTimer) external;

    function stopPending() external;

    function startPending() external;

    function setCode(TvmCell code) external;

    function getEvents() external returns (Event[] eventsList);

}

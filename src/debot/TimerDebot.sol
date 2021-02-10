pragma ton-solidity >= 0.36.0;
pragma AbiHeader expire;
pragma AbiHeader time;
pragma AbiHeader pubkey;

import "Debot.sol";
import "Terminal.sol";
import "AddressInput.sol";
import "Sdk.sol";
import "Menu.sol";
import "../ITimerManager.sol";


contract TimerDebot is Debot {

    address timer_addr;
    uint128 timer_balance;
    Event[] timer_events;


    constructor(string debotAbi) public {
        require(tvm.pubkey() == msg.pubkey(), 100);
        tvm.accept();
        init(DEBOT_ABI, debotAbi, "", address(0));
    }

    /*
    * Debot Basic API
    */

    function fetch() public override returns (Context[] contexts) {}

    function start() public override {
        Menu.select("Main menu", "Hello, i'm a timer debot. I can help setup and configure timers.", [
            MenuItem("Select TimerManager", "", tvm.functionId(selectTimer)),
            MenuItem("Exit", "", 0)
            ]);
    }

    function quit() public override {

    }

    function getVersion() public override returns (string name, uint24 semver) {
        (name, semver) = ("Timer Debot", 4 << 8);
    }

    function setTargetABI(string targetAbi) public {
        require(tvm.pubkey() == msg.pubkey(), 100);
        tvm.accept();
        m_targetAbi.set(targetAbi);
        m_options |= DEBOT_TARGET_ABI;
    }

    /*
    * Public
    */

    function selectTimer(uint32 index) public {
        index = index;
        Terminal.print(0, "Please, enter your timer address:");
        AddressInput.select(tvm.functionId(checkTimer));
    }

    function checkTimer(address value) public {
        Sdk.getBalance(tvm.functionId(setBalance), value);
        Sdk.getAccountType(tvm.functionId(getTimerInfo), value);
        timer_addr = value;
    }

    function setBalance(uint128 nanotokens) public {
        timer_balance = nanotokens;
    }

    function getTimerInfo(int8 acc_type) public {
        if (acc_type == - 1) {
            Terminal.print(0, format("Account with address {} doesn't exist", timer_addr));
        } else {
            string state = "";
            if (acc_type == 0) {
                state = "Uninit";
            } else if (acc_type == 2) {
                state = "Frozen";
            } else if (acc_type == 1) {
                state = "Active";
            }
            Terminal.print(0, "Account state: " + state);
            (uint64 dec, uint64 float) = tokens(timer_balance);
            Terminal.print(0, format("Account balance: {}.{}", dec, float));
            if (state != "Active") {
                return;
            }

            optional(uint256) pubkey;
            ITimerManager(timer_addr).getEvents{
                extMsg : true,
                time : uint64(now),
                sign : false,
                pubkey : pubkey,
                callbackId: tvm.functionId(setActiveEvents),
                onErrorId : tvm.functionId(onErrorGetEvents),
                abiVer : 2
            }();

        }
    }

    function setActiveEvents(Event[] eventsList) public {
        timer_events = eventsList;
        string str = format("Timer has {} event(s)", eventsList.length);
        Terminal.print(tvm.functionId(submit), str);
    }

    function onErrorGetEvents(TvmCell a) public {
        Terminal.print(tvm.functionId(submit), "Error while fetching events from Timer");
    }

    function submit() public view {

    }
    //
    //    function setResult() public {
    //        Terminal.print(0, "Transaction succeeded. Bye!");
    //    }

    function tokens(uint128 nanotokens) private pure returns (uint64, uint64) {
        uint64 decimal = uint64(nanotokens / 1e9);
        uint64 float = uint64(nanotokens - (decimal * 1e9));
        return (decimal, float);
    }

}

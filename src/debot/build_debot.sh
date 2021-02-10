SOLC_PATH="solc"
TVM_LINKER_PATH="tvm_linker"
STDLIB_SOL_PATH="lib"
TONOS_CLI_PATH="tonos-cli"

$SOLC_PATH TimerDebot.sol

DEBOT_TVC=$($TVM_LINKER_PATH compile TimerDebot.code --lib $STDLIB_SOL_PATH/stdlib_sol.tvm --abi-json TimerDebot.abi.json | grep "Saved contract to file " | sed -e 's/Saved contract to file \(.*\)/\1/')
mv "$DEBOT_TVC" TimerDebot.tvc

if [ -e timer_debot.keys.json ]; then
  echo "Reading saved keys"
else
  echo "Generating new keys for debot"
  DEBOT_SEED=$($TONOS_CLI_PATH-cli genphrase | grep Seed | sed -e 's/Seed phrase: "\(.*\)"/\1/')
  $TONOS_CLI_PATH getkeypair timer_debot.keys.json "${DEBOT_SEED}"
fi

DEBOT_ADDR=$($TONOS_CLI_PATH genaddr TimerDebot.tvc TimerDebot.abi.json --setkey timer_debot.keys.json | grep "Raw address" | sed -e 's/Raw address: \(.*\)/\1/')
echo "Future timer debot address: ${DEBOT_ADDR}"
node send_grams.js "$DEBOT_ADDR"

DEBOT_ABI=$(cat TimerDebot.abi.json | xxd -ps -c 20000)
TARGET_ABI=$(cat ../TimerManager.abi.json | xxd -ps -c 20000)
$TONOS_CLI_PATH deploy TimerDebot.tvc "{\"debotAbi\": \"${DEBOT_ABI}\"}" --sign timer_debot.keys.json --abi TimerDebot.abi.json

$TONOS_CLI_PATH call "$DEBOT_ADDR" setTargetABI "{\"targetAbi\":\"${TARGET_ABI}\"}" --sign timer_debot.keys.json --abi TimerDebot.abi.json

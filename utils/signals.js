import AsyncStorage from "@react-native-async-storage/async-storage";

export const addNewSignal = async (data) => {
  let signalsRaw = await AsyncStorage.getItem("signals");
  let signals = JSON.parse(signalsRaw) || [];
  const threshold = 100;
  if (signals.length > threshold) {
    signals = signals.splice(-Math.ceil(threshold / 2));
  }
  const exists = signals.find((signal) => signal.id === data.id);
  if (!exists) {
    signals.push(data);
  }
  await AsyncStorage.setItem("signals", JSON.stringify(signals));
  return signals.sort(sorter);
};

export const getSignals = async () => {
  //   await AsyncStorage.removeItem("signals");
  let signals = await AsyncStorage.getItem("signals");
  signals = JSON.parse(signals) || [];
  return signals.sort(sorter);
};

const sorter = (a, b) => {
  if (b.timestamp > a.timestamp) return 1;
  if (b.timestamp < a.timestamp) return -1;
  return 0;
};

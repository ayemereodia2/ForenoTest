import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import firebase from "firebase";

export const registerForPushNotificationsAsync = async () => {
  if (Constants.isDevice) {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      Alert.alert("Failed to get push token for push notification!");
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    AsyncStorage.setItem("push:token", token);
    const id = firebase.auth().currentUser.uid;
    await firebase.firestore().collection("users").doc(id).update({
      token,
    });
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
};

export const sendPushNotification = async (tokens, data) => {
  const message = {
    to: tokens,
    sound: "default",
    title: `New Signal: ${data.type} - ${data.pair}`,
    body: "Click to view Signal",
    data,
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
};

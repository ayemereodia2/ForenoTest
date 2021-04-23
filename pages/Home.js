import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Avatar } from "../components/Avatar";
import { Dot } from "../components/Dot";
import { Pill } from "../components/Pill";
import { SafeScrollView } from "../components/SafeScrollView";
import { styled } from "../utils/global.styles";
import { registerForPushNotificationsAsync } from "../utils/notification";
import { Send } from "./Send";
import { addNewSignal, getSignals } from "../utils/signals";
import moment from "moment";
import { auth } from "firebase";

export const Home = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [signals, setSignals] = useState([]);
  const [isNew, setIsNew] = useState([]);
  const [expired] = useState(
    props.auth?.user?.isSubscribed
      ? moment().diff(
          props.auth?.user?.expires
            ? props.auth?.user?.expires?.toDate()
            : new Date()
        ) > 0
      : true
  );
  const limited = props.auth.user?.count ? props.auth.user?.count >= 10 : false;

  const addSignal = async (notification) => {
    await firebase
      .firestore()
      .collection("users")
      .doc(props.auth.token)
      .update({
        count: props.auth.user?.count ? props.auth.user?.count + 1 : 1,
      });
    props.refeshUser(props.auth?.token);
    const id = notification.request.identifier;
    const data = notification.request.content.data;
    setIsNew(id);
    const signals = await addNewSignal({
      ...data,
      timestamp: notification.date,
      id,
      date: moment(notification.date).format("ddd Do, MMM"),
      time: moment(notification.date).format("hh:mm a"),
    });
    setSignals(signals);
  };

  useEffect(() => {
    const effect = async () => {
      await registerForPushNotificationsAsync();
      const signals = await getSignals();
      setSignals(signals);

      notificationListener.current = Notifications.addNotificationReceivedListener(
        addSignal
      );
      // // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
      responseListener.current = Notifications.addNotificationResponseReceivedListener(
        (res) => addSignal(res.notification)
      );
    };
    effect();
  }, []);

  return (
    <SafeScrollView style={styles.safe}>
      {/* Header */}
      <View style={[styles.header, styled.row, styled.between]}>
        <Text style={styled.h3}>
          Signals
          {(props.auth.user.isAdmin || props.auth.user.isBroker)  && (
            <Text style={[styled.h6, styled.bold, styled.link]}> Admin </Text>
          )}
        </Text>
        <TouchableOpacity
          style={styles.profile}
          onPress={() => props.navigation.navigate("Profile")}
        >
          <Text style={[styled.h5]}>
            Hi {props.auth?.user?.name?.split(" ")[0]} 👋
          </Text>
          <Avatar />
        </TouchableOpacity>
      </View>
      {/* Notification */}

      {limited ? (
        expired && (
          <Pill
            onPress={() => {
              Alert.alert(
                "Upgrade to Premium 💪🏾",
                "Subscribe for unlimited signals for NGN 10,000 a month",
                [
                  {
                    text: "No, thanks.",
                  },
                  {
                    text: "Proceed",
                    onPress: () => props.navigation.navigate("Upgrade"),
                  },
                ]
              );
            }}
            color={"#505050"}
          >
            You have reach your limit – Subscribe Now 🤝
          </Pill>
        )
      ) : (
        <Pill color={"#505050"}>
          You have {props.auth.user?.count ? 10 - props.auth.user?.count : 10}{" "}
          free signals left
        </Pill>
      )}
      {/* Signal */}
      <FlatList
        style={styles.list}
        data={signals}
        ListEmptyComponent={() => {
          return (
            <View style={styles.empty}>
              <Text style={styled.h5}>
                You have not recieved any signals yet
              </Text>
            </View>
          );
        }}
        renderItem={({ item: { date, time, pair, sl, tp, type, id } }, key) => {
          return (
            <>
              <TouchableOpacity
                key={key}
                elevation={30}
                style={[styles.signal, styled.shadow]}
              >
                {isNew === id && (
                  <Pill style={{ textAlign: "center" }} color="#3BC14A">
                    New
                  </Pill>
                )}
                <View style={[styled.row, styled.between]}>
                  <Text style={styled.h5}>{date}</Text>
                  <Text style={styled.h5}>{time}</Text>
                </View>
                <View style={[styled.row, styled.between]}>
                  <Text style={[styled.h5, styled.bold]}>{pair}</Text>
                  {Boolean(tp) && <Text style={styled.h5}>TP: {tp}%</Text>}
                  {Boolean(sl) && <Text style={styled.h5}>SL: {sl}%</Text>}

                  <View style={styles.type}>
                    <Dot color={type === "SELL" ? "#FF5D73" : "#3BC14A"} />
                    <Text style={[styled.h5, styled.bold]}> {type} </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </>
          );
        }}
      />
      {(props.auth.user.isAdmin || props.auth.user.isBroker) && (
        <>
          <TouchableOpacity
            onPress={async () => setIsModalVisible(true)}
            style={styles.fab}
          >
            <Text style={styles.fabIcon}>➕</Text>
          </TouchableOpacity>
          <Send visible={isModalVisible} setVisible={setIsModalVisible} />
        </>
      )}
    </SafeScrollView>
  );
};

const styles = StyleSheet.create({
  safe: {
    maxHeight: "100%",
  },
  type: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    zIndex: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: styled.safe.backgroundColor,
  },
  list: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 20,
    overflow: "visible",
    minHeight: "100%",
  },
  profile: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signal: {
    width: "100%",
    backgroundColor: "#31304B",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  fab: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: "#FFF",
    borderRadius: 30,
  },
  fabIcon: {
    fontSize: 20,
    color: "#31304B",
  },
  empty: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

import firebase from "firebase";
import React, { useState } from "react";
import Toast from "react-native-root-toast";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { SafeScrollView } from "../components/SafeScrollView";
import { styled } from "../utils/global.styles";
import { sendPushNotification } from "../utils/notification";

export const Send = ({ visible, setVisible }) => {
  const [type, setType] = useState("BUY");
  const [pair, setPair] = useState("");
  const [tp, setTP] = useState("");
  const [sl, setSL] = useState("");
  const [sending, setSending] = useState(false);

  const reset = async () => {
    setPair("");
    setTP("");
    setSL("");
  };

  const send = async () => {
    try {
      setSending(true);
      if (!pair || !type || !(type === "SELL" ? tp : sl)) {
        throw new Error("All Fields are Required!");
      }

      const tokens = [];
      const users = await firebase.firestore().collection("users").get();
      users.forEach((user) => {
        tokens.push(user.data().token);
      });

      await sendPushNotification(tokens, {
        pair,
        type,
        sl,
        tp,
      });
      reset();
    } catch (error) {
      Toast.show(error.message, {
        backgroundColor: "orange",
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
    }
    setSending(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setVisible(false);
      }}
    >
      <SafeScrollView style={styles.safe}>
        <View style={[styles.container, styled.shadow]}>
          <View style={[styled.row, styled.between]}>
            <Text style={styled.h4}>Send Signal</Text>
            <TouchableOpacity
              style={styles.profile}
              onPress={() => setVisible(false)}
            >
              <Text style={[styled.h4]}>✖︎</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.form}>
            {/* Pair */}
            <View style={styled.inputGroup}>
              <Text style={styled.h5}> Enter Currency Pair </Text>
              <TextInput
                style={[styled.input, styles.uppercase]}
                placeholder="e.g AUD/CAD"
                onChangeText={(pair) => setPair(pair.toUpperCase())}
                value={pair}
                placeholderTextColor={styled.text.color}
              />
            </View>

            {/* Type */}
            <View style={styled.inputGroup}>
              <Text style={styled.h5}> Signal Type </Text>
              <View style={[styled.row, styles.switches]}>
                {["BUY", "SELL"].map((option) => {
                  return option == type ? (
                    <View style={styles.switch}>
                      <TouchableOpacity
                        style={[styled.button]}
                        onPress={() => setType(option)}
                      >
                        <Text style={[styled.buttonText, styled.textCenter]}>
                          {option}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={styles.switch}>
                      <TouchableOpacity
                        style={[styled.button, styled.buttonTransparent]}
                        onPress={() => setType(option)}
                      >
                        <Text
                          style={[
                            styled.buttonText,
                            styled.buttonTransparentText,
                            styled.textCenter,
                          ]}
                        >
                          {option}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* SL / TP */}
            <View style={styled.inputGroup}>
              <Text style={styled.h5}>
                {type == "SELL"
                  ? "Enter Take Profit(TP)"
                  : "Enter Stop Loss (SL)"}
              </Text>
              <TextInput
                style={styled.input}
                onChangeText={type == "SELL" ? setTP : setSL}
                keyboardType="decimal-pad"
                value={type == "SELL" ? tp : sl}
                placeholder={
                  type == "SELL"
                    ? " Enter Take Profit(TP)"
                    : "Enter Stop Loss (SL)"
                }
                placeholderTextColor={styled.text.color}
              />
            </View>
          </View>

          {/* SEND */}
          <View style={styles.actions}>
            <View style={styles.button}>
              <TouchableOpacity style={[styled.button]} onPress={send}>
                {sending ? (
                  <ActivityIndicator color={styled.buttonText.color} />
                ) : (
                  <Text style={[styled.buttonText, styled.textCenter]}>
                    Send Signal
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={reset}>
              <Text style={[styled.h5, styled.link, styled.textCenter]}>
                Reset Fields
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safe: {
    maxHeight: "100%",
    backgroundColor: "transparent",
  },
  container: {
    marginTop: 30,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    padding: 20,
    height: "100%",
    width: "100%",
    backgroundColor: styled.safe.backgroundColor,
  },
  switch: {
    width: "50%",
  },
  switches: {
    margin: 5,
    borderRadius: 10,
    width: "100%",
    alignSelf: "center",
    justifyContent: "space-around",
    backgroundColor: "#323232",
  },
  actions: {
    marginVertical: 15,
    bottom: 0,
  },
  uppercase: {
    textTransform: "uppercase",
  },
});

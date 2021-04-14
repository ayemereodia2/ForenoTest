import firebase from "firebase";
import moment from "moment";
import React, { useEffect } from "react";
import { View, Alert, ActivityIndicator } from "react-native";
import PaystackWebView from "react-native-paystack-webview";
import { PAYMENT_API_KEY, SUBSCRIPTION_AMOUNT } from "../utils/constant";

export const Upgrade = (props) => {
  const onSuccess = async (res) => {
    if (res.status === "success") {
      const expires = moment().add(1, "M").toDate();
      await firebase
        .firestore()
        .collection("users")
        .doc(props.auth.token)
        .update({
          isSubscribed: true,
          expires,
        });
      await props.refreshUser(props.auth.token);
    }
    props.navigation.goBack();
  };

  const onCancel = (res) => {
    console.error(res);
    if (res.status !== "cancelled") Alert.alert(res.status || res.event);
    props.navigation.goBack();
  };

  useEffect(() => {});

  return (
    <View style={{ flex: 1 }}>
      <PaystackWebView
        buttonText="Pay Now"
        showPayButton={false}
        paystackKey={PAYMENT_API_KEY}
        amount={SUBSCRIPTION_AMOUNT}
        billingEmail={props.auth.user.email}
        // billingMobile="0123456789"
        billingName={props.auth.user.name}
        channels={JSON.stringify(["card"])}
        ActivityIndicatorColor="green"
        SafeAreaViewContainer={{ marginTop: 5 }}
        SafeAreaViewContainerModal={{ marginTop: 5 }}
        // handleWebViewMessage={handleWebViewMessage}
        refNumber={"" + Math.floor(Math.random() * 1000000000 + 1)}
        onCancel={onCancel}
        onSuccess={onSuccess}
        autoStart={true}
      />
      <ActivityIndicator size="large" />
    </View>
  );
};

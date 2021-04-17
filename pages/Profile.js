import moment from "moment";
import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
} from "react-native";
import { Avatar } from "../components/Avatar";
import { Pill } from "../components/Pill";
import { SafeScrollView } from "../components/SafeScrollView";
import { styled } from "../utils/global.styles";

export const Profile = (props) => {
  const [expired, setExpired] = useState(
    props.auth?.user?.isSubscribed
      ? moment().diff(
          props.auth?.user?.expires
            ? props.auth?.user?.expires?.toDate()
            : new Date()
        ) > 0
      : true
  );

  return (
    <SafeScrollView style={styles.container}>
      <View style={styles.wrapper}>
        <Avatar size={80} />
        <Text style={[styled.h3]}>{props.auth.user?.name}</Text>

        <View style={styles.form}>
          <View style={styled.inputGroup}>
            {/* Email */}
            <Text style={styled.h5}> Current Broker ({props.auth.user?.brokers?.[0] || "None"}) </Text>
            <TextInput
              style={styled.input}
              placeholder="Broker Name "
              value={props.auth.user?.broker?.name|| "No Broker yet"}
              editable={false}
              placeholderTextColor={styled.text.color}
            />
          </View>
          <View style={styled.inputGroup}>
            {/* Email */}
            <Text style={styled.h5}> Email </Text>
            <TextInput
              style={styled.input}
              placeholder="Enter Your Email Address"
              value={props.auth.user?.email}
              editable={false}
              placeholderTextColor={styled.text.color}
            />
          </View>
        </View>
        <View style={[styled.row, styles.item]}>
          {expired && (
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
              color={"#585c50"}
            >
              You are on Free Plan – Subscribe 🤝
            </Pill>
          )}
        </View>
      </View>
      <View style={[styled.row]}>
        <TouchableOpacity onPress={props.navigation.goBack}>
          <Text
            style={[styled.h5, styled.link, styles.link, styled.textCenter]}
          >
            Return Home
          </Text>
        </TouchableOpacity>
        <Text>{"     "}</Text>
        <TouchableOpacity onPress={props.logout}>
          <Text
            style={[styled.h5, styled.link, styles.link, styled.textCenter]}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    paddingVertical: 20,
  },
  wrapper: {
    width: "90%",
  },
});

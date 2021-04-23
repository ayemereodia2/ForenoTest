import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeScrollView } from "../components/SafeScrollView";
import { styled } from "../utils/global.styles";

export const Auth = (props) => (
  <SafeScrollView>
    <Image style={styles.image} source={require("../assets/idea.png")} />

    <View style={styles.wrapper}>
      <Text style={[styled.h1, styled.textCenter]}>Premium Forex Signals</Text>
      <Text style={[styled.text, styled.textCenter]}>
        Get Premium Forex Signal in an instant as soon as you need. No delay, No
        Losses.
      </Text>
    </View>

    <View style={[styled.row, styles.action]}>
      <View style={styles.button}>
        <TouchableOpacity
          style={[styled.button]}
          onPress={() => props.navigation.navigate("Login")}
        >
          <Text style={[styled.buttonText, styled.textCenter]}>Sign in</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          style={[styled.button, styled.buttonTransparent]}
          onPress={() => props.navigation.navigate("Register")}
        >
          <Text
            style={[
              styled.buttonText,
              styled.buttonTransparentText,
              styled.textCenter,
            ]}
          >
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    <TouchableOpacity onPress={()=>props.navigation.navigate("RegisterBroker")}>
          <Text style={[styled.h5, styled.link, styled.textCenter]}>
            Sign up as a Broker
          </Text>
        </TouchableOpacity>
  </SafeScrollView>
);

const styles = StyleSheet.create({
  button: {
    width: "50%",
  },
  action: {
    borderRadius: 10,
    width: "80%",
    alignSelf: "center",
    justifyContent: "space-around",
    backgroundColor: "#323232",
  },
  google: {
    width: 30,
    height: 30,
    paddingHorizontal: 30,
    resizeMode: "contain",
  },
  wrapper: {
    width: "80%",
    height: 300,
    alignSelf: "center",
  },
  container: {
    padding: 20,
    justifyContent: "space-between",
  },
  image: {
    width: 300,
    height: 350,
    resizeMode: "contain",
    alignSelf: "center",
  },
});

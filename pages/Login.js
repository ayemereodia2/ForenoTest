import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { SafeScrollView } from "../components/SafeScrollView";
import { styled } from "../utils/global.styles";

export const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const login = async () => {
    setLoading(true);
    await props.login({ email, password });
    setLoading(false);
  };
  return (
    <SafeScrollView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={[styled.h3]}>Welcome Back! 👋 </Text>
        <Text style={[styled.text]}>
          Get Premium Forex Signal in an instant as soon as you need. No delay,
          No Losses.
        </Text>
        <View style={styles.form}>
          <View style={styled.inputGroup}>
            {/* Email */}
            <Text style={styled.h5}> Email </Text>
            <TextInput
              style={styled.input}
              placeholder="Enter Your Email Address"
              onChangeText={setEmail}
              value={email}
              editable={!loading}
              placeholderTextColor={styled.text.color}
            />
          </View>
          <View style={styled.inputGroup}>
            {/* Password */}
            <Text style={styled.h5}> Password </Text>
            <TextInput
              style={styled.input}
              placeholder="Enter Your Password"
              onChangeText={setPassword}
              value={password}
              editable={!loading}
              secureTextEntry={true}
              placeholderTextColor={styled.text.color}
            />
          </View>
        </View>

        {/* Sign up */}
        <View style={styles.button}>
          <TouchableOpacity style={[styled.button]} onPress={login}>
            {loading ? (
              <ActivityIndicator color={styled.buttonText.color} />
            ) : (
              <Text style={[styled.buttonText, styled.textCenter]}>
                Sign in
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={props.navigation.goBack}>
          <Text style={[styled.h5, styled.link, styled.textCenter]}>
            Back to Home
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
  form: {
    paddingVertical: 20,
  },
  wrapper: {
    width: "80%",
  },
});

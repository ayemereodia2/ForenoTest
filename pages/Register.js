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

export const Register = (props) => {
  const [name, setName] = useState("");
  const [brokerId, setBrokerId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async () => {
    setLoading(true);
    await props.register({ name, email, password, confirm, brokerId });
    setLoading(false);
  };

  return (
    <SafeScrollView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={[styled.h3]}>Let's get registered! 🚀</Text>
        <Text style={[styled.text]}>
          Get Premium Forex Signal in an instant as soon as you need. No delay,
          No Losses.
        </Text>
        <View style={styles.form}>
          <View style={styled.inputGroup}>
            {/* Full Name */}
            <Text style={styled.h5}> Full Name </Text>
            <TextInput
              style={styled.input}
              placeholder="Enter Your Full Name"
              onChangeText={setName}
              value={name}
              editable={!loading}
              placeholderTextColor={styled.text.color}
            />
          </View>
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
              secureTextEntry={true}
              editable={!loading}
              placeholderTextColor={styled.text.color}
            />
          </View>
          <View style={styled.inputGroup}>
            {/* Password */}
            <Text style={styled.h5}> Confirm Password </Text>
            <TextInput
              style={styled.input}
              placeholder="Confirm Your Password"
              onChangeText={setConfirm}
              secureTextEntry={true}
              value={confirm}
              editable={!loading}
              placeholderTextColor={styled.text.color}
            />
          </View>
          <View style={styled.inputGroup}>
            {/* Broker Id */}
            <Text style={styled.h5}> Broker ID </Text>
            <TextInput
              style={styled.input}
              placeholder="Enter Broker ID"
              onChangeText={setBrokerId}
              value={brokerId}
              editable={!loading}
              placeholderTextColor={styled.text.color}
            />
          </View>
        </View>

        {/* Sign up */}
        <View style={styles.button}>
          <TouchableOpacity
            style={[styled.button]}
            disabled={loading}
            onPress={register}
          >
            {loading ? (
              <ActivityIndicator color={styled.buttonText.color} />
            ) : (
              <Text style={[styled.buttonText, styled.textCenter]}>
                Sign up
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

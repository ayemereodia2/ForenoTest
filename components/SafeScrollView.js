import React from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { styled } from "../utils/global.styles";

export const SafeScrollView = ({ children, style }) => (
  <SafeAreaView style={[styled.safe, style]}>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.container, style]}>{children}</ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    overflow: "scroll"
  },
});

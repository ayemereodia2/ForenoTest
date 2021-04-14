import React from "react";
import { View, StyleSheet } from "react-native";

export const Dot = ({ color }) => {
  const styles = StyleSheet.create({
    dot: {
      width: 10,
      height: 10,
      borderRadius: 10,
      backgroundColor: color || "#FF5D73",
    },
  });

  return <View style={styles.dot} />;
};

import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { styled } from "../utils/global.styles";

export const Pill = ({ style, color, children, ...props }) => {
  const styles = StyleSheet.create({
    pill: {
      zIndex: 10,
      borderRadius: 100,
      backgroundColor: color,
      paddingHorizontal: 10,
      paddingVertical: 2,
    },
    text: {
      color: "#fff",
      paddingVertical: 0,
      fontWeight: "500",
      ...style,
    },
  });

  return (
    <TouchableOpacity {...props} style={styles.pill}>
      <Text style={[styled.h5, styles.text]}>{children}</Text>
    </TouchableOpacity>
  );
};

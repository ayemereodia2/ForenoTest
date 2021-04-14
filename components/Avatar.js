import React from "react";
import { Image, StyleSheet } from "react-native";

export const Avatar = ({ size, name }) => {
  const styles = StyleSheet.create({
    avatar: {
      borderRadius: size || 40,
      width: size || 40,
      height: size || 40,
      backgroundColor: "white",
      resizeMode: "cover",
    },
  });

  return (
    <Image
      style={styles.avatar}
      source={{ uri: `https://ui-avatars.com/api/?name=${name}&background=ffffff` }}
    />
  );
};

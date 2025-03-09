import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const LoadingScreen = ({ message = "Loading..." }) => {
  return (
    <View style={styles.container}>
      {/* Lottie Animation */}

      {/* Loading Text */}
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    alignItems: "center",
    justifyContent: "center",
  },
  animation: {
    width: 150,
    height: 150,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    marginTop: 20,
    fontWeight: "bold",
  },
});

export default LoadingScreen;

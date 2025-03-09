import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { colors } from "@/component/colors";
import { useUserStore } from "@/services/useUserStore";
import NotificationManager from "@/services/notificationService";

export default function Login() {
  const setUser = useUserStore((state) => state.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = () => {
    setUser(phoneNumber);

    if (!phoneNumber && !password ) {
      Alert.alert("Please, enter your phone number and password!");
    } else {
      router.push({
        pathname: "/(tabs)",
        params: {

        },
      });
    }

  };

  useEffect(() => {
    new NotificationManager();
  }, []);

  return (
    <SafeAreaProvider style={styles.safeAreaProvider}>
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>LOG IN</Text>

          <Text style={styles.instructionText}>
            Enter your full name to be authenticated
          </Text>

          <Text style={styles.text}>Fullname :</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPhoneNumber}
            value={phoneNumber}
            placeholder="Your Full Name"
          />

          <Text style={styles.text}>Password :</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            secureTextEntry={true} // Hides the password
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.separator} />
          <Text style={styles.noAccountText}>Don't have an account?</Text>
          <TouchableOpacity style={styles.signUpButton}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaProvider: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 20,
    marginBottom: 30,
    fontFamily: "DomineRegular",
  },
  inputContainer: {
    flex: 1,
    width: "85%",
    alignItems: "center",
    paddingTop: 40,
  },
  input: {
    width: "100%",
    padding: 15,
    marginBottom: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
  },
  instructionText: {
    fontWeight: "300",
    marginBottom: 40,
  },
  text: {
    fontWeight: "300",
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.space_cadet,
    alignItems: "center",
    paddingVertical: 15,
    width: "100%",
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
  switchButton: {
    padding: 30,
  },
  switchButtonText: {
    color: "#5E83C0",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  bottomContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    width: "90%",
    marginBottom: 20,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#000000",
    opacity: 0.25,
    marginBottom: 10,
  },
  noAccountText: {
    fontSize: 14,
    marginBottom: 10,
  },
  signUpButton: {
    padding: 10,
  },
  signUpButtonText: {
    color: "#5E83C0",
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

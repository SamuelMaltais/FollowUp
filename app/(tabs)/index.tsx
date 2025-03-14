"use client";

import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as Font from "expo-font";
import { MedicationCard } from "@/component/medicationCard";
import TodayDate from "@/component/TodayDate";
import { useRouter } from "expo-router";
import Prescription from "@/app/(prescription)/prescription";
import NotificationManager from "@/services/notificationService";
import { UserService } from "@/services/user";
import { User } from "@/services/schemas/User";
import { Medication } from "@/services/schemas/Medication";
import { MedicationService } from "@/services/medicationService";
import LoadingScreen from "@/component/loading";
import { useUserStore } from "@/services/useUserStore";

async function getMedications(setMedications: Function, name: string) {
  const medications = await MedicationService.getPrescriptions(name);
  setMedications(medications);
}

async function fetchUser(name: string, setUser: Function): Promise<void> {
  try {
    const user = await UserService.getUser(name);
    setUser(user);
  } catch (error) {
    console.error("Error fetching user:", error);
  }
}

const formatTimeToday = (date: Date): string => {
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return formattedTime.toLocaleLowerCase();
};

// Create a function to load fonts
const loadFonts = () => {
  return Font.loadAsync({
    Gambetta: require("./../../assets/fonts/Gambetta.ttf"),
    Antic: require("./../../assets/fonts/Antic-Regular.ttf"),
    DomineBold: require("./../../assets/fonts/Domine-Bold.ttf"),
    DomineRegular: require("./../../assets/fonts/Domine-Regular.ttf"),
    DomineSemiBold: require("../../assets/fonts/Domine-SemiBold.ttf"),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [user, setUser] = useState<User>();

  const username = useUserStore((state) => state.name);
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/(prescription)/prescription",
      params: {},
    });
  };

  // Load fonts when component mounts
  useEffect(() => {
    async function prepare() {
      try {
        await loadFonts();
        console.log("LE USERNAME ?? " + username);
        await getMedications(setMedications, username);
        await fetchUser(username, setUser);
        setFontsLoaded(true);
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  // Show loading screen until fonts are loaded
  if (!fontsLoaded || !user || !medications) {
    console.log("NOT LOADIGN WHY ??");

    console.log(user);
    console.log(medications);

    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Home</Text>
          <Text style={styles.greeting}>Hello, {user.name}</Text>
          <View style={{ alignItems: "center" }}>
            <TodayDate date={undefined} />
          </View>

          <Text style={styles.party}>Happy Women's Day !</Text>
        </View>

        {/* SCROLL VIEW */}

        {medications
          .sort((a, b) => (a.hasTaken === b.hasTaken ? 0 : a.hasTaken ? 1 : -1)) // Sort medications by `hasTaken`
          .map((med, i) => (
            <MedicationCard
              key={i} // Adding a unique key for each item
              time={formatTimeToday(
                med.calculateNextDosageDate(med.interval, med.lastTakenDate)
              )}
              medicationName={med.medicationName}
              amount={med.amount}
              imageSource={med.img_url}
              handlePress={handlePress}
              medication={med}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  // HEADER
  header: {
    backgroundColor: "white",
    alignItems: "center",
  },
  headerTitle: {
    color: "#aaaaaa",
    fontSize: 16,
    marginBottom: 8,
    fontFamily: "Gambetta",
  },
  greeting: {
    fontSize: 28,
    fontWeight: "500",
    color: "#333",
    marginBottom: 16,
    fontFamily: "DomineRegular",
  },

  party: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginTop: 16,
    fontFamily: "DomineRegular",
  },

  // SCROLL VIEW
  scrollView: {
    padding: 20,
  },

  contentContainer: {
    paddingBottom: 20,
  },
});

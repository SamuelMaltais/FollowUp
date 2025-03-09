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

async function getMedications(setMedications: Function) {
  const medications = await MedicationService.getPrescriptions("Jackson");
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
  return date.toLocaleString("en-US", { hour: "numeric", hour12: true });
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
  const [user, setUser] = useState<User>();
  const [medications, setMedications] = useState<Medication[]>([]);

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
        await fetchUser("Jane Doe", setUser);
        await getMedications(setMedications);
        setFontsLoaded(true);
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  // Show loading screen until fonts are loaded
  if (!fontsLoaded || !user || !medications) {
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

          <TodayDate date={undefined} />

          <Text style={styles.party}>Happy Women's Day !</Text>
        </View>

        {/* SCROLL VIEW */}

        {medications.map((med, i) => (
          <MedicationCard
            key={i} // Adding a unique key for each item
            time={formatTimeToday(
              med.calculateNextDosageDate(med.interval, med.lastTakenDate)
            )}
            medicationName={med.medicationName}
            amount={`${med.amount} mg`}
            imageSource={require("./../../assets/images/comprime2.png")}
            handlePress={handlePress}
            medication={med}
          />
        ))}

        <MedicationCard
          time="11:00 am"
          medicationName="Potassium K20 in pills"
          amount="1 pill"
          imageSource={require("./../../assets/images/comprime2.png")}
          handlePress={handlePress}
          medication={medications[0]}
        />

        <MedicationCard
          time="2:00 pm"
          medicationName="Potassium K20 in tablet"
          amount="2 tablets"
          imageSource={require("./../../assets/images/comprime.png")}
          handlePress={handlePress}
          medication={medications[0]}
        />
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

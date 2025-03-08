"use client"

import { useState, useEffect } from "react"
import {Text, View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity} from "react-native"
import * as Font from "expo-font"
import {MedicationCard} from "@/component/medicationCard";
import TodayDate from "@/component/TodayDate";

// Create a function to load fonts
const loadFonts = () => {
  return Font.loadAsync({
    Gambetta: require("./../../assets/fonts/Gambetta.ttf"),
    Antic: require("./../../assets/fonts/Antic-Regular.ttf"),
  })
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  // Load fonts when component mounts
  useEffect(() => {
    async function prepare() {
      try {
        await loadFonts()
        setFontsLoaded(true)
      } catch (e) {
        console.warn(e)
      }
    }
    prepare()
  }, [])

  // Show loading screen until fonts are loaded
  if (!fontsLoaded) {
    return <Text>Loading...</Text>
  }

  return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Home</Text>
            <Text style={styles.greeting}>Hello, Jane Doe</Text>

            <TodayDate />

            <Text style={styles.party}>Happy Women Day !</Text>
          </View>

          {/* SCROLL VIEW */}
          <MedicationCard
              time="11:00 am"
              medicationName="Potassium K20 in pills"
              amount="1 pill"
              imageSource={require("./../../assets/images/comprime2.png")}
          />

          <MedicationCard
              time="2:00 pm"
              medicationName="Potassium K20 in tablet"
              amount="2 tablets"
              imageSource={require("./../../assets/images/comprime.png")}
          />

        </ScrollView>
      </SafeAreaView>
  )
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

})


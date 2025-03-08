"use client"

import { useState, useEffect } from "react"
import { Text, View, StyleSheet } from "react-native"
import * as Font from "expo-font"

// Create a function to load fonts
const loadFonts = () => {
  return Font.loadAsync({
    Gambetta: require("./../../assets/fonts/Gambetta.ttf"),
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
      <View style={styles.container}>
        <Text style={styles.text}>Hello</Text>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 40,
    color: "#000",
    fontFamily: "Gambetta",
  },
})


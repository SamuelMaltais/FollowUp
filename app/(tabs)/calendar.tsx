import { Text, View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { UserService } from "@/services/user";

export default function CalendarView() {
  const [selected, setSelected] = useState("");
  const [medications, setMedications] = useState([]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + "T00:00:00");
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
    };
    return date.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    var user = UserService.getUser("John");
  }, []);

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day: any) => {
          setSelected(day.dateString);
        }}
        style={styles.calendar}
        markedDates={{
          "2025-03-16": { marked: true },
          "2025-03-17": { marked: true },
          "2025-03-18": { marked: true },

          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: "orange",
          },
        }}
      />

      <View style={styles.flexColumn}>
        <Text style={styles.text}>
          {selected ? formatDate(selected) : "No date selected"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
  },
  flexColumn: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  text: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
  },
  calendar: {
    width: "100%",
    height: 400,
  },
});

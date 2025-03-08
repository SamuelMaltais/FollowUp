import { Text, View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { UserService } from "@/services/user";
import { MedicationService } from "@/services/medicationService";
import { Medication } from "@/services/schemas/Medication";
import { colors } from "@/component/colors";
import TodayDate from "@/component/TodayDate";

const formatDate = (dateString: string) => {
  const date = new Date(dateString + "T00:00:00"); // Ensure it starts at midnight local time
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

async function getMedications(setMedications: Function) {
  const medications = await MedicationService.getPrescriptions("Jackson");
  setMedications(medications);
  console.log(medications[0].prescriptionDate.toDateString());
}

export default function CalendarView() {
  const [selected, setSelected] = useState("");
  const [medications, setMedications] = useState<Medication[]>([]);

  useEffect(() => {
    getMedications(setMedications);
  }, []);

  const filteredMedications = medications.filter(
    (med) =>
      med.prescriptionDate.toDateString() == new Date(selected).toDateString()
  );
  console.log(selected);

  var markedDates: any = {};
  medications.forEach((med) => {
    markedDates[med.prescriptionDate.toISOString().split("T")[0]] = {
      marked: true,
      dotColor: "orange",
    };
  });
  markedDates[selected] = {
    selected: true,
    disableTouchEvent: true,
    selectedDotColor: "orange",
  };
  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day: any) => {
          setSelected(day.dateString);
        }}
        style={styles.calendar}
        markedDates={markedDates}
      />

      <View style={styles.flexColumn}>
        <TodayDate date={selected} />
        {filteredMedications.length > 0 ? (
          filteredMedications.map((med, index) => (
            <Text key={index} style={styles.text}>
              {med.medicationName}
            </Text>
          ))
        ) : (
          <Text style={styles.text}>No medications for this date</Text>
        )}
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

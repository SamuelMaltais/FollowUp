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
}


export default function CalendarView() {
  const [selected, setSelected] = useState("");


  console.log(selected);
  const [medications, setMedications] = useState<Medication[]>([]);
  console.log(medications);
  useEffect(() => {
    getMedications(setMedications);
  }, []);

  const filteredMedications = medications.filter(
    (med) =>
      //med.lastTakenDate.toISOString().split("T")[0] === selected
      med.allDosages.map(date => date.toISOString().split("T")[0]).includes(selected)  );

  console.log(filteredMedications);

  // var markedDates: any = {};
  // medications.forEach((med) => {
  //   med.allDosages.forEach((dosageDate) => {
  //     const dateString = dosageDate.toISOString().split("T")[0];
  //     markedDates[dateString] = {
  //       marked: true,
  //       dotColor: "red",
  //     };
  //   });
  // });
  // markedDates[selected] = {
  //   selected: true,
  //   disableTouchEvent: true,
  //   selectedDotColor: "red",
  // };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Calendar</Text>
      </View>
      <Calendar
        onDayPress={(day: any) => {
          setSelected(day.dateString);
        }}
        initialDate={selected}
        style={styles.calendar}
        theme={{
        backgroundColor: '#ffffff',
        calendarBackground: '#ffffff',
        textSectionTitleColor: colors.space_cadet,
        selectedDayBackgroundColor: colors.space_cadet,
        selectedDayTextColor: colors.lavender,
        todayTextColor: colors.orange,
        dayTextColor: '#2d4150',
        textDisabledColor: colors.peach_yellow
      }}
        markedDates={{ // dont have any selected (???)
          [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
        }}
      />

      <View style={styles.flexColumn}>
        <Text style={styles.dateText}>
          {selected ? formatDate(selected) : "No date selected"}
        </Text>
        {filteredMedications.length > 0 ? (
              filteredMedications.map((med, index) => {
                const today = new Date();
                const selectedDate = new Date(selected);
                const isPast = selectedDate < today;
                return (
                    <Text
                        key={index}
                        style={styles.medText}
                    >
                      {isPast
                          ? `You have taken ${med.medicationName} ${med.dosage} mg ✅`
                          : `${med.medicationName} ${med.dosage} mg`}
                    </Text>
                );
              })

        )
            :
            (
          <Text style={styles.medText}>No medications for this date</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 15,
  },
  flexColumn: {
    alignItems: "center",
    marginTop: 40,
    justifyContent: "flex-start",
    flex: 1,
  },
  text: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
  },
  calendar: {
    width: "100%",
    height: 400,
  },
  dateText: {
    fontFamily: "Gambetta",
    color: colors.space_cadet,
    fontSize: 30,
    paddingVertical: 15,
  },
  medText: {
    fontFamily: "Antic",
    fontSize: 20,
    paddingHorizontal: 15,
  },
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

});

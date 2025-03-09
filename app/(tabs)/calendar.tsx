"use client"

import {Text, View, StyleSheet, ScrollView} from "react-native"
import { useEffect, useState } from "react"
import { Calendar } from "react-native-calendars"
import { MedicationService } from "@/services/medicationService"
import type { Medication } from "@/services/schemas/Medication"
import { colors } from "@/component/colors"
import { useUserStore } from "@/services/useUserStore"
import TableExample from "@/component/table";

const formatDate = (dateString: string) => {
  const date = new Date(dateString + "T00:00:00") // Ensure it starts at midnight local time
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  }
  return date.toLocaleDateString("en-US", options)
}

async function getMedications(setMedications: Function, name: string) {
  const medications = await MedicationService.getPrescriptions(name)
  setMedications(medications)
}

export default function CalendarView() {
  const [selected, setSelected] = useState("")
  const username = useUserStore((state) => state.name)
  const [medications, setMedications] = useState<Medication[]>([])

  useEffect(() => {
    getMedications(setMedications, username)
  }, [])

  const filteredMedications = medications.filter((med) =>
      //med.lastTakenDate.toISOString().split("T")[0] === selected
      med.allDosages
          .map((date) => date.toISOString().split("T")[0])
          .includes(selected),
  )

  const today = new Date();
  const  selectedDate  =   new   Date ( selected ) ;
  const  isPast  =  selectedDate  <  today ;

  console.log(filteredMedications)

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
        <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Calendar</Text>
        </View>
        <Calendar
            onDayPress={(day: any) => {
              setSelected(day.dateString)
            }}
            initialDate={selected}
            style={styles.calendar}
            theme={{
              backgroundColor: "#ffffff",
              calendarBackground: "#ffffff",
              textSectionTitleColor: colors.space_cadet,
              selectedDayBackgroundColor: colors.space_cadet,
              selectedDayTextColor: colors.lavender,
              todayTextColor: colors.orange,
              dayTextColor: "#2d4150",
              textDisabledColor: colors.peach_yellow,
            }}
            markedDates={{
              // dont have any selected (???)
              [selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: "orange",
              },
            }}
        />

        <View style={styles.flexColumn}>
          <Text style={styles.dateText}>{selected ? formatDate(selected) : "No date selected"}</Text>
          {filteredMedications.length > 0 ? (

                  <TableExample
                      namePills={filteredMedications.map((med) => med.medicationName)}
                      amount={filteredMedications.map((med) => `${med.dosage} mg`)}
                      isPast={filteredMedications.map(() => isPast)}
                  />
          )
              : (
              <Text style={styles.medText}>No medications for this date</Text>
          )}
        </View>
        </ScrollView>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 15,
  },
  flexColumn: {
    alignItems: "center",
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
    fontSize: 18,
    paddingHorizontal: 15,
    width: "90%",
    textAlign: "center",
  },
  header: {
    paddingTop: 50,
    backgroundColor: "white",
    alignItems: "center",
  },
  headerTitle: {
    color: "#000",
    fontSize: 16,
    marginBottom: 8,
    fontFamily: "Gambetta",
  },
})


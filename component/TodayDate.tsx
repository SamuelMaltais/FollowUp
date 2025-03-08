import { StyleSheet, Text } from "react-native";
import { colors } from "./colors";

const formatDate = (dateString: string | undefined) => {
  const date = dateString ? new Date(dateString + "T00:00:00") : new Date();
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

export default function TodayDate(props: { date: string | undefined }) {
  return <Text style={styles.dateText}>{formatDate(props.date)}</Text>;
}

const styles = StyleSheet.create({
  dateText: {
    backgroundColor: colors.peach_yellow,
    color: "white",
    fontFamily: "Gambetta",
    fontSize: 27,
    fontWeight: 600,
    paddingHorizontal: 50,
    paddingVertical: 15,
    width: "100%",
    borderRadius: 20,
  },
});

import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import SwipeButton from "rn-swipe-button";
import { useCallback, useState } from "react";
import { colors } from "@/component/colors";
import { Medication } from "@/services/schemas/Medication";
import { MedicationService } from "@/services/medicationService";

interface MedicationCardProps {
  time: string;
  medicationName: string;
  amount: string;
  imageSource: any;
  confirmed?: boolean;
  medication: Medication;
  handlePress?: () => void;
}

const CheckMarkIcon = () => {
  return (
    <View
      style={{
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: colors.lavender,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        ✓
      </Text>
    </View>
  );
};

const EmptyButton = () => <></>;

const ArrowIcon = () => {
  return (
    <View
      style={{
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: colors.lavender,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        →
      </Text>
    </View>
  );
};

async function updateMedication(med: Medication) {
  await MedicationService.updateMedication(
    med.uuid,
    med.lastTakenDate.toISOString().split("T")[0]
  );
}

export const MedicationCard = ({
  time,
  medicationName,
  amount,
  imageSource,
  confirmed = false,
  handlePress,
  medication,
}: MedicationCardProps) => {
  const [submitted, setSubmited] = useState<boolean>(medication.hasTaken);
  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{time}</Text>

      <View style={styles.medicationCard}>
        <Image source={{ uri: imageSource }} style={styles.medicationImage} />
        <Text style={styles.medicationName}>{medicationName}</Text>
        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Amount : </Text>
          <Text style={styles.amountValue}>{amount}</Text>
        </View>

        <SwipeButton
          disabled={submitted || medication.hasTaken}
          disabledRailBackgroundColor="white"
          disabledThumbIconBackgroundColor="white"
          disabledThumbIconBorderColor="white"
          //disable the button by doing true (Optional)
          swipeSuccessThreshold={70}
          width={Dimensions.get("window").width - 120}
          title={submitted ? "Taken!" : "Confirm taken >>"}
          titleFontSize={16}
          titleColor={submitted ? "black" : "#666"}
          thumbIconComponent={submitted ? CheckMarkIcon : ArrowIcon}
          //Text inside the button (Optional)
          //thumbIconImageSource={thumbIcon}
          //You can also set your own icon for the button (Optional)
          onSwipeSuccess={() => {
            alert("Submitted Successfully!");
            updateMedication(medication);
            setSubmited(true);
          }}
          //After the completion of swipe (Optional)
          railFillBackgroundColor="#fff" //(Optional)
          railFillBorderColor={submitted ? colors.space_cadet : colors.lavender} //(Optional)
          thumbIconBackgroundColor={submitted ? "red" : colors.lavender} //(Optional)
          thumbIconBorderColor={submitted ? "red" : colors.lavender} //(Optional)
          railBackgroundColor={submitted ? "#fff" : "#fff"}
          railBorderColor={submitted ? colors.space_cadet : colors.lavender} //(Optional)
        />

        <TouchableOpacity
          style={styles.prescriptionButton}
          onPress={handlePress}
        >
          <Text style={styles.prescriptionButtonText}>See my prescription</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  timeText: {
    fontSize: 20,
    marginBottom: 10,
    color: "#333",
    fontFamily: "Antic",
  },
  medicationCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: "center",
  },
  medicationImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginBottom: 10,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 15,
    textAlign: "center",
    fontFamily: "DomineBold",
  },
  amountContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  amountLabel: {
    color: "#666",
  },
  amountValue: {
    fontWeight: "500",
  },
  confirmButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 15,
    width: "100%",
  },
  confirmText: {
    marginRight: 10,
    color: "#666",
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#b8b5e1",
    alignItems: "center",
    justifyContent: "center",
  },
  checkmark: {
    color: "white",
    fontSize: 14,
  },
  prescriptionButton: {
    backgroundColor: "#3a3564",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  prescriptionButtonText: {
    color: "white",
    fontWeight: "500",
  },
});

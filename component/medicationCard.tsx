import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
// @ts-ignore
import RNSwipeVerify from 'react-native-swipe-verify'
import {useState} from "react";

interface MedicationCardProps {
    time: string
    medicationName: string
    amount: string
    imageSource: any
    confirmed?: boolean
}

export const MedicationCard = ({ time, medicationName, amount, imageSource, confirmed = false }: MedicationCardProps) => {

    const [isUnlocked, setIsUnlocked] = useState(false)
    const [isUploading, setIsUploading] = useState(false)

    return (

        <View style={styles.timelineItem}>
            <Text style={styles.timeText}>{time}</Text>
            <View style={styles.medicationCard}>
                <Image source={imageSource} style={styles.medicationImage} />
                <Text style={styles.medicationName}>{medicationName}</Text>
                <View style={styles.amountContainer}>
                    <Text style={styles.amountLabel}>Amount : </Text>
                    <Text style={styles.amountValue}>{amount}</Text>
                </View>
                <TouchableOpacity style={styles.confirmButton}>
                    <Text style={styles.confirmText}>Confirm taken</Text>
                    <View style={styles.checkCircle}>
                        <Text style={styles.checkmark}>✓</Text>
                    </View>
                </TouchableOpacity>
                <RNSwipeVerify ref={(ref: any) => null}
                               width={200}
                               buttonSize={60}
                               borderColor="#fff"
                               buttonColor="#37474F"
                               backgroundColor="#ececec"
                               textColor="#37474F"
                               okButton={{ visible: false, duration: 400 }}
                               onVerified={() => {
                                   setIsUnlocked(true)
                               }}
                               icon={<Image source={isUnlocked ? require('./../assets/images/check.png') : require('./../assets/images/check.png')} style={{ width: 40, height: 40 }} />}
                >

                    <Text>{isUnlocked ? 'UNLOCKED' : 'slide to unlock'}</Text>

                </RNSwipeVerify>


                <TouchableOpacity style={styles.prescriptionButton}>
                    <Text style={styles.prescriptionButtonText}>See my prescription</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.timelineDot} />
        </View>
    )
}


const styles = StyleSheet.create({
    timeline: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    timelineBar: {
        position: "absolute",
        width: 2,
        backgroundColor: "#e9d18c",
        top: 40,
        bottom: 0,
        right: 20,
    },
    timelineItem: {
        marginBottom: 30,
        position: "relative",
    },
    timeText: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 10,
        color: "#333",
    },
    timelineDot: {
        position: "absolute",
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#e9a06c",
        right: 0,
        top: 40,
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
        width: 80,
        height: 40,
        resizeMode: "contain",
        marginBottom: 10,
    },
    medicationName: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 10,
        textAlign: "center",
        fontFamily: "Gambetta",
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
        width: "100%",
        alignItems: "center",
    },
    prescriptionButtonText: {
        color: "white",
        fontWeight: "500",
    },
})
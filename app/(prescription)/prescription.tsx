import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import {colors} from "@/component/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import {useRouter} from "expo-router";

export const Prescription = () => {
    const router = useRouter();
    return (
        <SafeAreaView style={styles.container}>

            <Ionicons
                name={"chevron-back-outline"}
                color={colors.space_cadet}
                size={30}
                onPress={() => {
                    router.back();
                }}
                style={{marginLeft : 20}}
            />

            <View style={styles.prescriptionContainer}>
                <Text style={styles.prescriptionTitle}>My Prescription</Text>
                <Text style={styles.prescriptionTime}>11:00 am, daily</Text>



                <View style={styles.card}>
                    <View style={styles.medicationHeader}>
                        <Text style={styles.medicationName}>Potassium K20</Text>
                        <Image
                            source={require("../../assets/images/comprime.png")}
                            style={styles.pillImage}
                        />
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Amount :</Text>
                        <Text style={styles.infoValue}>1 pill</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Interval :</Text>
                        <Text style={styles.infoValue}>daily</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Start date :</Text>
                        <Text style={styles.infoValue}>8 mars, 2025</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>End date :</Text>
                        <Text style={styles.infoValue}>17 mars, 2025</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Dosage :</Text>
                        <Text style={styles.infoValue}>5 mg per tablet</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Adress Pharmacy :</Text>
                        <Text style={styles.infoValue}>10 chemin de la Tour</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Prescription Date :</Text>
                        <Text style={styles.infoValue}>8 mars, 2025</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Prescription Renewal :</Text>
                        <Text style={styles.infoValue}>16 mars 2025</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Expiration date :</Text>
                        <Text style={styles.infoValue}>30 mars 2027</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',

    },
    prescriptionContainer: {
        padding : 20,
    },
    prescriptionTitle: {
        fontSize: 28,
        fontWeight: '600',
        color: '#3a3a5a',
        marginVertical: 25,
        fontFamily: 'DomineRegular',

    },
    prescriptionTime: {
        fontSize: 24,
        marginBottom: 10,
        fontFamily: 'Antic',
    },
    card: {
        borderWidth: 1,
        borderColor: colors.peach_yellow,
        borderRadius: 15,
        padding: 20,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    medicationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    medicationName: {
        fontSize: 20,
        fontWeight: 'bold',

    },
    pillImage: {
        width: 130,
        height: 60,
        resizeMode: 'contain',
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    infoLabel: {
        width: '40%',
        fontSize: 16,
        color: '#555',
    },
    infoValue: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'DomineBold',
    },
});

export default Prescription;
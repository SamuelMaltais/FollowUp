const { v4: uuidv4 } = require("uuid");

function validateDate(dateString: string) 
{
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        throw new Error(`Invalid date format: ${dateString}`);
    }

    return date;
}
class Medication {
    prescriptionDate: Date;
    expDate: Date;
    uuid: any;
    patientName: string;
    medicationName: string;
    consumptionDetails: string;
    interval: string;
    amount: number;
    dosage: number;
    lastTakenDate: Date;
    constructor(patientName: string, medicationName: string, consumptionDetails: string, prescriptionDate: string, expDate: string, interval: string, amount: number, dosage: number, lastTakenDate: string) {
        this.uuid = uuidv4();
        this.patientName = patientName;
        this.medicationName = medicationName;
        this.consumptionDetails = consumptionDetails;
        this.prescriptionDate = validateDate(prescriptionDate);
        this.expDate = validateDate(expDate);
        this.interval = interval;
        this.amount = amount;
        this.dosage = dosage;
        this.lastTakenDate = validateDate(lastTakenDate);
    }

    static validate(obj: any) {
        if (
            obj &&
            typeof obj.uuid === "string" &&
            typeof obj.patientName === "string" &&
            typeof obj.medicationName === "string" &&
            typeof obj.consumptionDetails === "string" &&
            typeof obj.prescriptionDate === "string" &&
            typeof obj.expDate === "string" &&
            typeof obj.interval === "string" &&
            typeof obj.amount === "number" &&
            typeof obj.dosage === "number" &&
            typeof obj.lastTakenDate === "string"
        ) {
            return true;
        }
        return false;
    }

    static fromObject(obj: any) {
        if (!Medication.validate(obj)) {
            throw new Error("Invalid medication object format.");
        }
        return new Medication(
            obj.patientName,
            obj.medicationName,
            obj.consumptionDetails,
            obj.prescriptionDate,
            obj.expDate,
            obj.interval,
            obj.amount,
            obj.dosage,
            obj.lastTakenDate
        );
    }
}
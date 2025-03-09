const { v4: uuidv4 } = require("uuid");

function validateDate(dateString: string) 
{
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        throw new Error(`Invalid date format: ${dateString}`);
    }

    return date;
}
export class Medication {
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
    allDosages : Date[] = [];
    hasTaken: boolean;
    constructor(uuid: string, patientName: string, medicationName: string, consumptionDetails: string, prescriptionDate: string, expDate: string, interval: string, amount: number, dosage: number, lastTakenDate: string, hasTaken: boolean) {
        this.uuid = uuid;
        this.patientName = patientName;
        this.medicationName = medicationName;
        this.consumptionDetails = consumptionDetails;
        this.prescriptionDate = validateDate(prescriptionDate);
        this.expDate = validateDate(expDate);
        this.interval = interval;
        this.amount = amount;
        this.dosage = dosage;
        this.lastTakenDate = validateDate(lastTakenDate);
        this.hasTaken = hasTaken;
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
            typeof obj.lastTakenDate === "string" &&
            typeof obj.hasTaken === "boolean"
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
            obj.uuid,
            obj.patientName,
            obj.medicationName,
            obj.consumptionDetails,
            obj.prescriptionDate,
            obj.expDate,
            obj.interval,
            obj.amount,
            obj.dosage,
            obj.lastTakenDate,
            obj.hasTaken
        );
    }

    calculateNextDosageDate(interval: string, lastDate: Date): Date {
        const nextDosageDate = new Date(lastDate);
        if (interval.includes("hours")) {
            const intervalHours = parseInt(interval, 10); // Assuming interval is in hours
            nextDosageDate.setHours(nextDosageDate.getHours() + intervalHours);
        } else {
            const intervalDays = parseInt(interval, 10); // Assuming interval is in days
            nextDosageDate.setDate(nextDosageDate.getDate() + intervalDays);
        }
        return nextDosageDate;
    }

    calcDosages() {
        let dates: Date[] = []; // array to store all the dates
        let currDate = new Date(this.prescriptionDate); // calc all dosage instances between now and when the prescription ends

        while (currDate < this.expDate) {
            currDate = this.calculateNextDosageDate(this.interval, currDate); // Assign the new date directly
            dates.push(new Date(currDate)); // Push a new Date object to avoid mutating currDate
        }
        console.log(dates);
        this.allDosages = dates;
    }
}
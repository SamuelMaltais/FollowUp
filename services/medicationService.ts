import { Medication } from "./schemas/Medication";
import { User } from "./schemas/User";

const backendAdress = "b75b-132-204-243-250.ngrok-free.app"
const backendPort = 3000


interface UpdateMedicationResponse {
  success: boolean;
  message: string;
  updatedMedication: {
    uuid: string;
    lastTakenDate: string;
  };
}

interface UpdateMedicationError {
  error: string;
}

export class MedicationService {
    static async getPrescriptions(name: string){
        console.log("WDAWEAE")
        var res = await fetch(`https://${backendAdress}/data/prescriptions?name=${name}`, {
            method: "GET",
            headers: new Headers({
              "ngrok-skip-browser-warning": "69420",
              "Content-type": "application/json; charset=UTF-8"
            }),
          });

        var obj : any = await res.json()
        var response : Array<Medication> = []
        console.log(response)
        obj.forEach((med: any) => {
            const medication = Medication.fromObject(med);
            medication.calcDosages(); // all dosages are calculated on the fly
            response.push(medication);
        });

        return response
    }

  static updateMedication = async (uuid: string, newDate: string): Promise<void> => {
  
    try {
      const response = await fetch(`https://${backendAdress}:${backendPort}/data/prescriptions`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uuid, newDate }),
      });
  
      if (!response.ok) {
        const errorData: UpdateMedicationError = await response.json();
        console.error('Error:', errorData.error);
        return;
      }
  
      const responseData: UpdateMedicationResponse = await response.json();
      console.log('Medication updated successfully:', responseData.updatedMedication);
    } catch (error) {
      // Handle network or other errors
      console.error('An error occurred:', error);
    }
  };

}

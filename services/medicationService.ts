import { Medication } from "./schemas/Medication";
import { User } from "./schemas/User";

const backendAdress = "localhost"
const backendPort = 3000

export class MedicationService {
    static async getPrescriptions(name: string){
        console.log("WDAWEAE")
        var res = await fetch(`http://${backendAdress}:${backendPort}/data/prescriptions?name=${name}`, {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          });

        var obj : any = await res.json()
        var response : Array<Medication> = []
        console.log(response)
        obj.forEach((med: any) => {
            response.push(Medication.fromObject(med))
        });

        return response
    }
}

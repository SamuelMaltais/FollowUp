import { User } from "./schemas/User";

const backendAdress = "localhost"
const backendPort = 3000

export class UserService {
    static async getUser(name: string){
        var res = await fetch(`http://${backendAdress}:${backendPort}/data/users?name=${name}`, {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          });
        return User.fromObject(await res.json())
    }
}


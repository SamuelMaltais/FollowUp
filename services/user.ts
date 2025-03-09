import { User } from "./schemas/User";

const backendAdress = "b75b-132-204-243-250.ngrok-free.app"
const backendPort = 3000

export class UserService {
    static async getUser(name: string){
        var res = await fetch(`https://${backendAdress}/data/users?name=${name}`, {
            method: "GET",
            headers: new Headers({
              "ngrok-skip-browser-warning": "69420",
              "Content-type": "application/json; charset=UTF-8"
            }),
          });
        return User.fromObject(await res.json())
    }
}


const backendAdress = "192.168.20.66"
const backendPort = 3000

class UserService {
    static async getUser(name: string){
        var res = await fetch(`http://${backendAdress}:${backendPort}/data/users`, {
            method: "POST",
            body: JSON.stringify({
              name: name
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          });

        return await res.json()
    }
}
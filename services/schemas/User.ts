const { v4: uuidv4 } = require("uuid");

export class User {
    branchName: string;
    name: string;
    age: string;
    branchAddress: string;
    phoneNumber: string;
    ailments: string;
    uuid: any;
    constructor(uuid: string, name: string, branchName: string, branchAddress: string, ailments: string, phoneNumber: string, age : string) {
        this.uuid = uuid;
        this.name = name;
        this.age = age;
        this.branchName = branchName;
        this.branchAddress = branchAddress;
        this.ailments = ailments;
        this.phoneNumber = phoneNumber;
    }

    static validate(obj: any) {
        return (
            obj &&
            typeof obj.uuid === "string" &&
            typeof obj.name === "string" &&
            typeof obj.age === "string" &&
            typeof obj.branchName === "string" &&
            typeof obj.branchAddress === "string" &&
            typeof obj.ailments === "string" &&
            typeof obj.phoneNumber === "string"
        );
    }

    static fromObject(obj: any) {
        if (!User.validate(obj)) {
            // throw new Error("Invalid user object format.");
            console.log(obj);
            console.log(typeof obj.uuid === "string");
            console.log(typeof obj.name === "string");
            console.log(typeof obj.age === "string");
            console.log(typeof obj.branchAddress === "string");
            console.log(typeof obj.ailments === "string");
            console.log(typeof obj.phoneNumber === "string");


            return null;
        }
        return new User(
            obj.uuid,
            obj.name,
            obj.age,
            obj.branchName,
            obj.branchAddress,
            obj.ailments,
            obj.phoneNumber
        );
    }
}
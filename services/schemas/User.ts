const { v4: uuidv4 } = require("uuid");

export class User {
    branchName: string;
    name: string;
    branchAddress: string;
    phoneNumber: string;
    ailments: string[];
    uuid: any;
    constructor(name: string, branchName: string, branchAddress: string, ailments: string[], phoneNumber: string) {
        this.uuid = uuidv4();
        this.name = name;
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
            typeof obj.branchName === "string" &&
            typeof obj.branchAddress === "string" &&
            typeof obj.ailments === "object" &&
            typeof obj.phoneNumber === "string"
        );
    }

    static fromObject(obj: any) {
        if (!User.validate(obj)) {
            throw new Error("Invalid user object format.");
        }
        return new User(
            obj.name,
            obj.branchName,
            obj.branchAddress,
            obj.ailments,
            obj.phoneNumber
        );
    }
}
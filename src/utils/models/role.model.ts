import Permission from "./permission.model";



export default interface Role {
    roledatecreation?: Date;
    roledescription?:  string;
    roleenable?:       boolean;
    rolefield1?:       string;
    roleid?:           number;
    rolename?:         string;
    rolestatut?:       string;
    roletype?:         string;
}

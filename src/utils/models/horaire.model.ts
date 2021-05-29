import { Jour } from "./jour.model";
import Utilisateur from "./utilisateur.model";

export interface Horaire {
    horairedatecreation?: Date;
    horairedebut?:        Date;
    horairedescription?:  string;
    horaireenable?:       boolean;
    horairefin?:          Date;
    horaireid?:           number;
    horairestatus?:       string;
    jour?:                Jour;
    utilisateur?:         Utilisateur;
}
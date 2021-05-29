import Utilisateur from "./utilisateur.model";

export interface Connexion {
    connexiondatecreation: Date;
    connexionid:           number;
    connexiontype:         string;
    utilisateur:           Utilisateur;
}

import Utilisateur from "./utilisateur.model";

export default interface Note {
    id?:               ID;
    notedatecreation?: Date;
    notedescription?:  string;
    noteenable?:       boolean;
    notevalue?:        number;
    utilisateur1?:     Utilisateur;
    utilisateur2?:     Utilisateur;
}


export interface ID {
    utiUtilisateurid?: number;
    utilisateurid?:    number;
}
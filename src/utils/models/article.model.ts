import { Categoriearticle } from "./categoriearticle.model";
import Utilisateur from "./utilisateur.model";

export interface Article {
    articledatecreation?: Date;
    articledescription?:  string;
    articleenable?:       boolean;
    articleid?:           number;
    articleimage?:        string;
    articlelibelle?:      string;
    articleslug?:         string;
    articlestatus?:       string;
    articletexte?:        string;
    categoriearticle?:    Categoriearticle;
    utilisateur?:         Utilisateur;
}

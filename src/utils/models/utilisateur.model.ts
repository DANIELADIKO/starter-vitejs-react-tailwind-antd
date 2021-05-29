import Banniere from "./banniere.model";
import Typeauth from "./typeauth.model";

export default interface Utilisateur {
    banniere?:                  Banniere;
    modeauthentification?:      Typeauth;
    utilisateuraccesstoken?:    string;
    utilisateurcontact1?:       string;
    utilisateurcontact2?:       string;
    utilisateurdatecreation?:   string;
    utilisateurdatenaissance?:  string;
    utilisateuremail?:          string;
    utilisateurenable?:         boolean;
    utilisateurgenre?:          string;
    utilisateurid?:             number;
    utilisateurisconfigured?:   boolean;
    utilisateuriscontingency?:  boolean;
    utilisateurisowner?:        boolean;
    utilisateurispreapproved?:  boolean;
    utilisateurlangue?:         string;
    utilisateurlastconnection?: string;
    utilisateurmoyenne?:        number;
    utilisateurnom?:            string;
    utilisateurpassword?:       string;
    utilisateurpicture1?:       string;
    utilisateurprenom?:         string;
    utilisateurpresentation?:   string;
    utilisateursecurekey?:      string;
    utilisateurstatus?:         string;
}

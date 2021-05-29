import Utilisateur from "./utilisateur.model";

export interface Notification {
    notificationdatecreation?: Date;
    notificationdateread?:     Date;
    notificationid?:           number;
    notificationisread?:       boolean;
    notificationlibelle?:      string;
    notificationstatus?:       string;
    notificationtext?:         string;
    utilisateur?:              Utilisateur;
}
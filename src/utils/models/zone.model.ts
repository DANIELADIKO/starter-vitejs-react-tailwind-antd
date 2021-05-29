import Typezone from "./typezone.model";

export default interface Zone {
    timezone?:         string;
    zoneattribut?:     Typezone;
    zonedatecreation?: Date;
    zonedescription?:  string;
    zoneenable?:       boolean;
    zoneid?:           number;
    zonelibelle?:      string;
}

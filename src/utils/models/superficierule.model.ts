import Superficie from "./superficie.model";
import Typepropriete from "./typepropriete.model";

export interface SuperficieRule {
    evaluerenable?:   boolean;
    id?:              number;
    superficie?:      Superficie;
    superficieduree?: number;
    superficieprix?:  number;
    typepropriete?:   Typepropriete;
}
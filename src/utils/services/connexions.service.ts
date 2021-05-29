import configData from "../../assets/config/production.json";
import Caller from "../../core/objects/Caller";
import {Connexion} from "../models/connexions.model";


export default class ConnexionService {
    // private apiCaller:Caller
    api:any= {}
    constructor() {
        // Caller = new Caller()
        this.api = configData.API_ENDPOINTS.CONNEXION
    }

    get(param?:any){
        return (url:string) => Caller.get(url, param)
    }

    


}

import configData from "../../assets/config/production.json";
import Caller from "../../core/objects/Caller";
import Caracteristique from "../models/caracteristique.model";


export default class CaracteristiqueService {
    // private apiCaller:Caller
    api:any= {}
    constructor() {
        // Caller = new Caller()
        this.api = configData.API_ENDPOINTS.CARACTERISTIQUE
    }

    get(param?:any){
        return (url:string) => Caller.get(url, param)
    }

    post(data:Caracteristique,param?:any){
        return Caller.post(this.api.ADD, data ,param)
    }

    update(data:Caracteristique,param?:any){ // SPECIAL API ONLY FOR ROOT
        return Caller.put(this.api.UPD+"/"+data.caracteristiqueid, data ,param)
    }


    delete(data:Caracteristique){
        return Caller.delete(this.api.DEL+"/"+data.caracteristiqueid )
    }

}

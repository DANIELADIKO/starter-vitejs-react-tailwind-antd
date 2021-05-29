import configData from "../../assets/config/production.json";
import Caller from "../../core/objects/Caller";
import Typeauth from "../models/typeauth.model";


export default class TypeauthService {
    // private apiCaller:Caller
    api:any= {}
    constructor() {
        // Caller = new Caller()
        this.api = configData.API_ENDPOINTS.MODEAUTH
    }

    get(param?:any){
        return (url:string) => Caller.get(url, param)
    }

    post(data:Typeauth,param?:any){
        return Caller.post(this.api.ADD, data ,param)
    }

    update(data:Typeauth,param?:any){ // SPECIAL API ONLY FOR ROOT
        let dt = {status : data.modeauthentificationstatus}
        return Caller.get(this.api.UPD+"/"+data.modeauthentificationid, dt )
    }


    delete(data:Typeauth){
        return Caller.delete(this.api.DEL+"/"+data.modeauthentificationid )
    }

}

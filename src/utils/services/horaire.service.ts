import configData from "../../assets/config/production.json";
import Caller from "../../core/objects/Caller";
import Permission from "../models/permission.model";


export default class PermissionService {
    // private apiCaller:Caller
    api:any= {}
    constructor() {
        // Caller = new Caller()
        this.api = configData.API_ENDPOINTS.PERMISSION
    }

    get(param?:any){
        return (url:string) => Caller.get(url, param)
    }

    post(data:Permission,param?:any){
        return Caller.post(this.api.POST, data ,param)
    }


}

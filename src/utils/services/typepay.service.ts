import configData from "../../assets/config/production.json";
import Caller from "../../core/objects/Caller";
import Typepay from "../models/typepay.model";


export default class TypepayService {
    // private apiCaller:Caller
    api:any= {}
    constructor() {
        // Caller = new Caller()
        this.api = configData.API_ENDPOINTS.MODEPAIEMENT
    }

    get(param?:any){
        return (url:string) => Caller.get(url, param)
    }

    post(data:Typepay,param?:any){
        let formdata = new FormData()
        formdata.append("modepaiement",JSON.stringify(data))
        return Caller.post(this.api.ADD, formdata ,param)
    }


    update(data:Typepay,param?:any){
        let formdata = new FormData()
        formdata.append("modepaiement",JSON.stringify(data))
        return Caller.put(this.api.UPD+"/"+data.modepaiementid, formdata ,param)
    }


    delete(data:Typepay){
        return Caller.delete(this.api.DEL+"/"+data.modepaiementid )
    }

}

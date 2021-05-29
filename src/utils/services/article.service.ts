import configData from "../../assets/config/production.json";
import Caller from "../../core/objects/Caller";
import { Article } from "../models/article.model";

export default class ArticleService {
    // private apiCaller:Caller
    api:any= {}
    constructor() {
        // Caller = new Caller()
        this.api = configData.API_ENDPOINTS.ARTICLE
    }

    get(url:string, ...rest:any[]){
        let parms:any = {}
        // if(rest && rest[0]) parms["type"] =  rest[0]
        return Caller.get(url,parms)
    }
    post(data:Article,param?:any){
        return Caller.post(this.api.ADD, data ,param)
    }

    update(data:Article,param?:any){
        return Caller.put(this.api.UPD+"/"+data.articleid, data ,param)
    }


    delete(data:Article){
        return Caller.delete(this.api.DEL+"/"+data.articleid )
    }

}

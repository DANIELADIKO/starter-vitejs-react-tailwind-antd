import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import configData from "../../assets/config/production.json";
import useSWR, { SWRConfig } from "swr";

class Caller {
  private api_token: string | undefined = undefined;
  private api_url: string | undefined = undefined;
  private client: AxiosInstance | undefined;

  constructor() {
    this.api_token = undefined;
    this.api_url = configData.HOST_API;
  }

  private init = () => {
    this.api_token = configData.TOKEN;

    let headers: AxiosRequestConfig["headers"] = {
      Accept: "application/json",
    
    };

    if (this.api_token != "") {
      headers.Authorization = `Bearer ${this.api_token}`;
    }

    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 31000,
      headers: headers,
    });

    return this.client;
  };

  get(url: string, params?: any) {
    return this.init().get(url, {
      params: params,
    });
  }

  post(url: string, data: any, params?: any) {
    return this.init().post(url, data, {
      params: params,
    });
  }

  put(url: string, data: any, params?: any) {
    return this.init().put(url, data, {
      params: params,
    });
  }

  delete(url: string, params?: any) {
    return this.init().delete(url, {
        params: params,
      });
  }
}

export default new Caller();
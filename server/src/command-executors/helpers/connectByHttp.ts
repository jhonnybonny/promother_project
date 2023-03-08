import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";

export const connectByHttp = (ip: string): Promise<AxiosResponse<any, any>> => {
    const config: AxiosRequestConfig = {
        baseURL: `http://${ip}:8080/config`,
    }
    const defaultInstance: AxiosInstance = axios.create(config)
    return defaultInstance.get(``)
}
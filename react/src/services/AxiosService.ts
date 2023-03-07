import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";


export default class AxiosService {
    // Get functionality is inside PHP page scripts
    // This file only Create Delete Update from frontend.
    private readonly api: AxiosInstance;
    public token;
    private readonly baseUrl: any;
    constructor() {
        this.token = localStorage.getItem('ACCESS_TOKEN');
        this.baseUrl = import.meta.env.VITE_API_BASE_URL;

        this.api = axios.create({
            headers: {
                'baseURL': `${import.meta.env.VITE_API_BASE_URL}/api`,
                'content-type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        });


    }
    requestInterceptor (config:AxiosRequestConfig):AxiosRequestConfig{

        // @ts-ignore
        this.api.interceptors.request.use((config)=>{

           // config.headers.Authorization = `Bearer ${token}`
        })
        return config

    }
    responseInterceptor (){

         const response = this.api.interceptors.response.use((response:AxiosResponse) => {

            return response

        }, (error)=>{
            const{response} = error;
            if (response.status === 401){

                localStorage.removeItem("ACCESS_TOKEN")
            } else {
                // handle other errors
                throw error;
            }

        })
        return response
    }
    async deleteSingle(id:string|number){
        const response = await this.api.delete(`/wp-json/wp/v2//${id}`)
        return response;
    }

    async createSingle(data:any){

        let result =  await this.api.post(`${this.baseUrl}/signup`,data)
        console.log(result)
    }

    async updateSingle(id:string, data:any){
        try {
            const result = await this.api.post(`/wp-json/wp/v2/${id}`,data);
            return result
        }catch (error){
            return error;
        }
    }

}



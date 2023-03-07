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
    async deleteSingle(id:string|number){
        const response = await this.api.delete(`/wp-json/wp/v2//${id}`)
        return response;
    }

    async createSingle(data:any){

        return await this.api.post(`${this.baseUrl}/signup`,data)

    }
    async login(data:any){

        return await this.api.post(`${this.baseUrl}/login`,data)

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



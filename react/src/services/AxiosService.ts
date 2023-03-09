import axios, {AxiosInstance} from "axios";


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
                'Authorization': `Bearer ${this.token}`,

            }
        });

    }


    async createUser(data:any){

        return await this.api.post(`${this.baseUrl}/signup`,data)

    }
    async login(data:any){

        return await this.api.post(`${this.baseUrl}/login`,data)

    }
    async getUser(){

        return await this.api.get(`${this.baseUrl}/user`)

    }
    async getUsers(){

        return  await this.api.get(`${this.baseUrl}/users`)

    }
    async removeUser(id:number){

       return await this.api.delete(`${this.baseUrl}/users/${id}`)

    }
    async logout() {
        return await this.api.post(`${this.baseUrl}/logout`);
    }
}
export const singletonAxios = new AxiosService();




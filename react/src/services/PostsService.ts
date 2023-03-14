import axios, {AxiosInstance} from "axios";


export default class PostsService {
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


    async createPost(data:any){

        return await this.api.post(`${this.baseUrl}/posts`,data)

    }

    async getPostById(id:number|string) {
        return await this.api.get(`${this.baseUrl}/posts/${id}`)
    }

    async getPosts(){

        return  await this.api.get(`${this.baseUrl}/posts`)

    }
    async removePost(id:number | string){

       return await this.api.delete(`${this.baseUrl}/posts/${id}`)

    }
    async updatePost(id:number | string, data: any){

        return await this.api.put(`${this.baseUrl}/posts/${id}`,data)

    }

}





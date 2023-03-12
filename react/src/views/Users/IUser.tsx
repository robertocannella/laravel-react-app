export interface IUser {
    id: number | string
    first_name: string
    last_name: string
    email: string
    password?: string;
    password_confirmation?: string;
}

export class User implements IUser{
    email: string;
    first_name: string;
    id: number | string;
    last_name: string;
    password?: string;
    password_confirmation?: string;

    constructor() {
        this.id = '';
        this.first_name = '';
        this.last_name = '';
        this.email = '';
    }

}

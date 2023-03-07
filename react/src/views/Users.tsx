
import React, {BaseSyntheticEvent, Component, ReactNode} from "react";
import {User} from "../contexts/ContextProvider";
import {singletonAxios} from "../services/AxiosService";
import {AxiosResponse} from "axios";


type UsersProps = {

}
type UsersState = {
    loading: boolean
    users: []
}

class Users extends Component<UsersProps,UsersState> {


    constructor(props:UsersProps) {
        super(props);
        this.state = {
            loading: false,
            users: []
        }
        this.getUsers = this.getUsers.bind(this);


    }

    componentDidMount() {
        this.getUsers();
    }
    getUsers() {
        singletonAxios.getUsers().then((users)=>{

            this.setState({loading: false})
        }).catch(()=>{
            this.setState({loading:false})
        });
    }

    render() {
        return (
            <div>Users</div>
        );
    }
}
export default Users

/**
 *
 *  MOBILE VIEW USER VIEW
 *
 *
 *
 */



import React, {Component} from "react";
import AxiosService from "../../services/AxiosService";
import ButtonHTML from "../../components/html-components/ButtonHTML";
import TableHTML from "../../components/html-components/TableHTML";


type UsersProps = {

}
type UsersState = {
    loading: boolean
    users: []
}

class Users extends Component<UsersProps,UsersState> {
    private axiosService: AxiosService;


    constructor(props:UsersProps) {
        super(props);
        this.state = {
            loading: false,
            users: []
        }
        this.axiosService = new AxiosService();

        this.getUsers = this.getUsers.bind(this);


    }

    componentDidMount() {
        this.getUsers();
    }
    getUsers() {
        this.axiosService.getUsers().then((users)=>{

            this.setState({
                loading: false,
                users: users.data.data
            })
            console.log(this.state.users)
        }).catch(()=>{
            this.setState({loading:false})
        });
    }

    render() {
        return (
            <div>
                <div style={{display:'flex', justifyContent: "space-between", alignItems: "center"}}>
                    <h1>User</h1>
                    <ButtonHTML text={"Add New"} id={"add-new"} linkTo={"/users/new"}/>
                </div>
                <TableHTML content={this.state.users} fields={['email','id']} headings={["Email","Actions"]}/>
            </div>
        );
    }
}
export default Users

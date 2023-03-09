
import React, {BaseSyntheticEvent, Component} from "react";
import AxiosService from "../services/AxiosService";
import ButtonHTML from "../components/html-components/ButtonHTML";
import TableHTML from "../components/html-components/TableHTML";
import laravel from "laravel-vite-plugin";


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
            loading: true,
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
    onDeleteClicked(user:any){
        this.setState({loading:true})
        // TODO: FILTER THE DELETED USER OUT OF THIS STATE.

        this.axiosService.removeUser(user.id)
            .then((res)=>{
                this.setState({
                    loading: false
                })
                this.getUsers();   // TODO: IMPLEMENT ABOVE

                alert("user deleted")
            })
            .catch((err)=>{
                this.setState({loading: false})
            })

    }
    render() {
        return (
            <div>
                <div style={{display:'flex', justifyContent: "space-between", alignItems: "center"}}>
                    <h1>User</h1>
                    {this.state.loading ? "Loading...": ""}
                    <ButtonHTML text={"Add New"} id={"add-new"} linkTo={"/users/new"}/>

                </div>
                <TableHTML onDelete={(ev)=>this.onDeleteClicked(ev)} slug={'/users/'} fields={['id','first_name','last_name','email']} content={this.state.users} headings={["First Name","Last Name","Email","Actions"]}/>
            </div>
        );
    }
}
export default Users

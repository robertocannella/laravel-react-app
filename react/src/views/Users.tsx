
import React, {BaseSyntheticEvent, Component} from "react";
import AxiosService from "../services/AxiosService";
import ButtonHTML from "../components/html-components/ButtonHTML";
import TableHTML from "../components/html-components/TableHTML";
import Modal from "../components/alerts/Modal/Modal";


type UsersProps = {

}
type UsersState = {
    selectedUser: any
    loading: boolean
    users: []
    clickDelete: boolean
}

class Users extends Component<UsersProps,UsersState> {
    private axiosService: AxiosService;


    constructor(props:UsersProps) {
        super(props);
        this.state = {
            selectedUser: null,
            loading: true,
            users: [],
            clickDelete: false
        }
        this.axiosService = new AxiosService();

        this.getUsers = this.getUsers.bind(this);
        this.cancelDelete = this.cancelDelete.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
        this.onDeleteClicked = this.onDeleteClicked.bind(this);

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

        }).catch(()=>{
            this.setState({loading:false})
        });
    }
    confirmDelete(user:any){

        this.setState({
            clickDelete:true,
            selectedUser: user
        })


    }
    cancelDelete(){

        this.setState({
            clickDelete:false,
            selectedUser: null
        })
    }
    onDeleteClicked(){
        console.log("clicked")
        this.setState({
            loading:true,
            clickDelete:false
        })
        let selectedUser = this.state.selectedUser;
            // TODO: FILTER THE DELETED USER OUT OF THIS STATE.

        this.axiosService.removeUser(selectedUser.id)
            .then((res)=>{
                this.setState({
                    loading: false
                })
                this.getUsers();   // TODO: IMPLEMENT ABOVE

            })
            .catch((err)=>{
                this.setState({loading: false})
            })

    }
    render() {

        return (
            <div>
                <Modal onConfirm={this.onDeleteClicked} onCancel={this.cancelDelete} type="danger" title={"Confirm delete."} visibility={this.state.clickDelete}>
                    <p className={"text-base leading-relaxed"}>Are you sure you want to delete this entry?</p>
                    <p className={"text-base loading-relaxed"}> {this.state.selectedUser?.email} </p>
                </Modal>
                <div style={{display:'flex', justifyContent: "space-between", alignItems: "center"}}>
                    <h1>User</h1>
                    {this.state.loading ? "Loading...": ""}
                    <ButtonHTML text={"Add New"} id={"add-new"} linkTo={"/users/new"}/>

                </div>
                <TableHTML onDelete={(ev)=>this.confirmDelete(ev)} slug={'/users/'} fields={['id','first_name','last_name','email']} content={this.state.users} headings={["First Name","Last Name","Email","Actions"]}/>
            </div>
        );
    }
}
export default Users

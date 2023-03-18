
import React, {useEffect, useState} from "react";
import AxiosService, {singletonAxios} from "../../services/AxiosService";
import ButtonHTML from "../../components/html-components/ButtonHTML";
import TableHTML from "../../components/html-components/TableHTML";
import Modal from "../../components/alerts/Modal/Modal";
import {IUser} from "./IUser";



 export default function UsersList () {
     let axiosService = new AxiosService();
     const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
     const [isLoading, setIsLoading] = useState(false);
     const [users, setUsers] = useState<IUser[]>([]);
     const [isConfirmDeleteModalVisible, setConfirmDeleteModalVisibility] = useState(false);
     const [isSuccessDeleteModalVisible, setSuccessDeleteModalVisibility] = useState(false);

     useEffect(()=>{
        getUsers();

     },[])

     const getUsers = () => {
         setIsLoading(true);

         axiosService.getUsers()
             .then((resp)=>{
                 setUsers(resp.data.data);
                 setIsLoading(false);
         }).catch(()=>{
             setIsLoading(false);
         });

     }
     const confirmDelete = (user:IUser | any) =>  {

         setConfirmDeleteModalVisibility(true);
         setSelectedUser(user)

     }
     const cancelDelete = () => {

         setConfirmDeleteModalVisibility(false);
         setSelectedUser(null);
     }
     const handleDismiss = () => {
         setSuccessDeleteModalVisibility(false);
         setSelectedUser(null);
     }

     const handleDelete = () => {
         setIsLoading(true);
         setConfirmDeleteModalVisibility(false);

         axiosService.removeUser(selectedUser!.id)
             .then((res)=>{

                 setIsLoading(false);
                 /*
                 *  To maintain pagination, we need to get the updated list from the server
                 *  Here we can't just filter out the deleted user and remove it from the DOM
                 *
                 */
                 // setUsers(users.filter(user => user.id !== selectedUser!.id));
                 getUsers();
                 setSuccessDeleteModalVisibility(true);
             })
             .catch((err)=>{
                 setIsLoading(false)
                 console.log(err)
             })

     }
     return (
         <div>
             <Modal onConfirm={handleDelete} onCancel={cancelDelete} type="danger" title={"Confirm delete."} visibility={isConfirmDeleteModalVisible}>
                 <p className={"text-base leading-relaxed"}>Are you sure you want to delete this entry?</p>
                 <p className={"text-base loading-relaxed"}> {selectedUser?.email} </p>
             </Modal>
             <Modal onConfirm={handleDismiss}  type="success" title={"Delete successful."} visibility={isSuccessDeleteModalVisible}>
                 <p className={"text-base leading-relaxed"}>The user has been removed</p>
                 <p className={"text-base loading-relaxed"}> {selectedUser?.email} </p>
             </Modal>
             <div style={{display:'flex', justifyContent: "space-between", alignItems: "center"}}>
             <h1>User</h1>
                 {isLoading ? "Loading...": ""}
                 <ButtonHTML text={"Add New"} id={"add-new"} linkTo={"/users/new"}/>
             </div>
             <TableHTML onDelete={(ev)=>confirmDelete(ev)} slug={'/users/'} fields={['id','first_name','last_name','email']} content={users} headings={["First Name","Last Name","Email","Actions"]}/>
         </div>
    );
}



import {useNavigate, useParams} from "react-router-dom";
import {BaseSyntheticEvent, useContext, useEffect, useState} from "react";
import {IUser, User} from "./IUser";
import AxiosService from "../../services/AxiosService";
import FormWindow from "../../components/form-components/FormWindow";
import {ThemeContext} from "../../contexts/ThemeContext";


export default function UserView () {
    const axiosService = new AxiosService();
    const {theme} = useContext(ThemeContext);
    const {id} = useParams();
    const [selectedUser, setSelectedUser] = useState<IUser>(new User());
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(null);     /* State to manage errors               */
    const [password, setPassword] = useState('');
    const [password_confirmed, setPassword_confirmed] = useState('');
    const navigate = useNavigate();

    const getUser = (id:string) =>{
        setIsLoading(true);
        axiosService.getUserById(id).then(resp=>{
            setSelectedUser(resp.data)
            setIsLoading(false)
        }).catch(()=>{
            setIsLoading(false);
        });

    }

    if (id){
        useEffect(()=>{
            getUser(id)
        },[])

    }
    const updateForm = (event:any) =>{
        if (event.target.name === "password_confirm"){
            setPassword_confirmed(event.target.value)
        }else if (event.target.name === "password"){
            setPassword(event.target.value)
        } else {

            setSelectedUser({
                ...selectedUser as IUser, [event.target.name]: event.target.value
            })
        }
    }

    const onSubmit = (ev:BaseSyntheticEvent)=>{
        ev.preventDefault();        /* prevent page refresh */


        if (selectedUser.id) {

            let payload = selectedUser;
            if (password){
                payload = {
                    ...selectedUser,
                    password: password,
                    password_confirmation: password_confirmed /* Laravel is looking for foo_confirmation in the payload */
                }
            }

            axiosService.updateUser(selectedUser.id, payload)
                .then((resp)=>{
                    navigate('/users')
                    // TODO: SHOW NOTIFICATION
                }).catch((error)=>{
                const response = error.response;
                if (response && response.status === 422) { // Validation Error
                    setErrors(response.data.errors);
                }

            })
        }else {

            // These fields need to match Laravel Backend
            const payload ={
                first_name: selectedUser.first_name,
                last_name: selectedUser.last_name,
                email: selectedUser.email,
                password: password,
                password_confirmation: password_confirmed /* Laravel is looking for foo_confirmation in the payload */
            }
            axiosService.createUser(payload)
                .then((resp)=>{
                    navigate('/users')
                    // TODO: SHOW NOTIFICATION
                }).catch((error)=>{
                const response = error.response;
                if (response && response.status === 422) { // Validation Error
                    setErrors(response.data.errors);
                }
            })
        }
    }
    return (
        <>
            {isLoading ? "Loading...": ""}
            {!isLoading &&
                <FormWindow title={selectedUser.first_name + " " + selectedUser.last_name} rcClasses={'rc-form-window'}>
                    <div className={theme + " rc-grid-container grid grid-cols-3"}>
                            <div className={theme + " rc-label p-2 col-span-1"}>First Name: </div><div  className={theme + " rc-field p-2 col-span-2"}>{selectedUser.first_name}</div>
                            <div className={theme + " rc-label p-2 col-span-1"}>Last Name: </div><div  className={theme + " rc-field p-2 col-span-2"}>{selectedUser.last_name}</div>
                            <div className={theme + " rc-label p-2 col-span-1"}>Email: </div><div  className={theme + " rc-field p-2 col-span-2"}>{selectedUser.email}</div>
                    </div>
                </FormWindow>
            }

        </>
    );
}

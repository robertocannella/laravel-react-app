import {Link, useNavigate, useParams} from "react-router-dom";
import {BaseSyntheticEvent, useContext, useEffect, useState} from "react";
import {IUser, User} from "./IUser";
import AxiosService, {singletonAxios} from "../../services/AxiosService";
import {FormTextInput} from "../../components/form-components/FormTextInput";
import {FormEmailInput} from "../../components/form-components/FormEmailInput";
import {FormPasswordInput} from "../../components/form-components/FormPasswordInput";
import {FormPasswordConfirmationInput} from "../../components/form-components/FormPasswordConfirmInput";
import FormSubmitButton from "../../components/form-components/FormSubmitButton";
import FormWindow from "../../components/form-components/FormWindow";
import {ThemeContext} from "../../contexts/ThemeContext";


export default function UserForm () {
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
                <FormWindow title={selectedUser.id ? `Update user ${selectedUser.email}` : 'Create new user.'}>
                    {errors &&

                        <div role="alert  rounded-lg">
                            {Object.keys(errors).map(key => (
                                <div className="px-3 bg-red-100 py-1 text-red-700">
                                    <p> {errors[key][0]}</p>
                                </div>
                            ))}
                        </div>
                    }

                    <form onSubmit={onSubmit} className={theme + ' p-6 rounded-b-lg'}>
                        <div className="w-full md:w-2/3 px-0 mb-6 md:mb-0">

                            <FormTextInput name={"first_name"} updateForm={(e: BaseSyntheticEvent) => updateForm(e)}
                                           id="first_name" text="First Name" inputValue={selectedUser.first_name}/>
                            <FormTextInput name={"last_name"} updateForm={(e: BaseSyntheticEvent) => updateForm(e)}
                                           id="last_name" text="Last Name" inputValue={selectedUser.last_name}/>

                        </div>
                        <FormEmailInput inputValue={selectedUser.email} text={"Email Address"} id={"email"}
                                        updateForm={(e: BaseSyntheticEvent) => updateForm(e)}/>
                        <FormPasswordInput inputValue={password} text={"Password"} id={"password"}
                                           updateForm={(e: BaseSyntheticEvent) => updateForm(e)}/>
                        <FormPasswordConfirmationInput inputValue={password_confirmed} text={"Confirm Password"}
                                                       id={"password_confirm"}
                                                       updateForm={(e: BaseSyntheticEvent) => updateForm(e)}/>
                        <FormSubmitButton text={"Save"} id={"save"}/>
                    </form>
                </FormWindow>
            }

        </>
    );
}

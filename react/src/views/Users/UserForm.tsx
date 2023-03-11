import {Link, useParams} from "react-router-dom";
import {BaseSyntheticEvent, useContext, useEffect, useState} from "react";
import {IUser} from "./IUser";
import AxiosService, {singletonAxios} from "../../services/AxiosService";
import FormTextInput from "../../components/form-components/FormTextInput";
import {FormEmailInput} from "../../components/form-components/FormEmailInput";
import FormPasswordInput from "../../components/form-components/FormPasswordInput";
import FormPasswordConfirmInput from "../../components/form-components/FormPasswordConfirmInput";
import FormSubmitButton from "../../components/form-components/FormSubmitButton";
import FormWindow from "../../components/form-components/FormWindow";
import {ThemeContext} from "../../contexts/ThemeContext";


export default function UserForm () {
    const axiosService = new AxiosService();
    const {theme} = useContext(ThemeContext);
    const {id} = useParams();
    const [selectedUser, setSelectedUser] = useState<IUser|null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(null);     /* State to manage errors               */


    const getUser = (id:string) =>{
        setIsLoading(true);
        axiosService.getUserById(id).then(resp=>{
            setSelectedUser(resp.data.data)
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
            setSelectedUser(
                {...selectedUser as IUser, password_confirm: event.target.value}
            )
        }else {
            setSelectedUser({
                ...selectedUser as IUser, [event.target.name]: event.target.value
            })
        }
    }

    const onSubmit = (ev:BaseSyntheticEvent)=>{
        ev.preventDefault();        /* prevent page refresh */


        // These fields need to match Laravel Backend
        const payload ={
            first_name: selectedUser?.first_name,
            last_name: selectedUser?.last_name,
            email: selectedUser?.email,
            password: selectedUser?.password,
            password_confirmation: selectedUser?.password_confirm /* Laravel is looking for foo_confirmation in the payload */
        }


        singletonAxios.createUser(payload)
            .then(({data})=>{
                console.log(data)
            // if (setUser)
            //     setUser(data.user)
            // if (setToken)
            //     setToken(data.token)

        }).catch((error)=>{
            const response = error.response;
            if (response && response.status === 422) { // Validation Error
                setErrors(response.data.errors);
            }
        })

    }
    return (
        <>
            {isLoading ? "Loading...": ""}
            {selectedUser &&
                <FormWindow title={selectedUser ? `Update user ${selectedUser.email}` : 'Create new user.'}>
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

                            <FormTextInput name={"firstName"} updateForm={(e: BaseSyntheticEvent) => updateForm(e)}
                                           id="firstName" text="First Name"/>
                            <FormTextInput name={"lastName"} updateForm={(e: BaseSyntheticEvent) => updateForm(e)}
                                           id="lastName" text="Last Name"/>

                        </div>
                        <FormEmailInput inputValue={selectedUser.email} text={"Email Address"} id={"email"}
                                        updateForm={(e: BaseSyntheticEvent) => updateForm(e)}/>
                        {/*<FormPasswordInput inputValue={selectedUser?.password} text={"Password"} id={"password"}*/}
                        {/*                   updateForm={(e: BaseSyntheticEvent) => updateForm(e)}/>*/}
                        {/*<FormPasswordConfirmInput inputValue={selectedUser?.password_confirm} text={"Confirm Password"}*/}
                        {/*                          id={"passwordConfirm"}*/}
                        {/*                          updateForm={(e: BaseSyntheticEvent) => updateForm(e)}/>*/}
                        <FormSubmitButton text={"Sign Up!"} id={"signup"}/>
                        <p className="mt-6 text-center">
                            Already registered?
                            <Link to={'/login'}> Log In </Link>
                        </p>
                    </form>
                </FormWindow>
            }

        </>
    );
}

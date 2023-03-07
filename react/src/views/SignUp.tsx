import FormWindow from "../components/form-components/FormWindow";
import {Link} from "react-router-dom";
import {BaseSyntheticEvent, useContext, useRef, useState} from "react";
import {ThemeContext} from "../contexts/ThemeContext";
import FormTextInput from "../components/form-components/FormTextInput";
import FormEmailInput from "../components/form-components/FormEmailInput";
import FormPasswordInput from "../components/form-components/FormPasswordInput";
import FormSubmitButton from "../components/form-components/FormSubmitButton";
import FormPasswordConfirmInput from "../components/form-components/FormPasswordConfirmInput";
import AxiosService from "../services/AxiosService";
import {useStateContext} from "../contexts/ContextProvider";





export default function SignUp () {
    /* manage theme */
    const {theme } = useContext(ThemeContext)


    /*
    * This sets up the state for the form.
    * Should be implemented via ref method as we don't need two-way binding
    */
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });


    const [errors, setErrors] = useState(null);     /* State to manage errors               */
    const {setUser, setToken} = useStateContext();            /* State to manage user after signup    */

    /**
     * @name onSubmit
     * @summary This function handle the submit event. It
     * @param ev BaseSyntheticEvent
     * @returns void
     */

    const onSubmit = (ev:BaseSyntheticEvent)=>{
        ev.preventDefault();        /* prevent page refresh */


        // These fields need to match Laravel Backend
        const payload ={
            first_name: state.firstName,
            last_name: state.lastName,
            email: state.email,
            password: state.password,
            password_confirmation: state.passwordConfirm /* Laravel is looking for foo_confirmation in the payload */
        }

        const axiosService = new AxiosService();

        axiosService.createSingle(payload).then(({data})=>{
            setUser(data.user)
            setToken(data.token)

        }).catch((error)=>{
            const response = error.response;
            if (response && response.status === 422) { // Validation Error
                setErrors(response.data.errors);
            }
        })

    }

    /**
     * @name updateFrom
     * @summary Handles any changes in any of the elements inside the form. Will filter though properties dymically.
     * It is important that the event.target.name is identical to the state value.
     * @param event
     */
    const updateForm = (event:BaseSyntheticEvent) =>{
        if (event.target.name === "passwordConfirm"){
            setState((state)=>({
                ...state, passwordConfirm: event.target.value
            }))
        }else {
            setState(state => ({
                ...state,
                [event.target.name]: event.target.value
            }))
        }
    }

    return (

        <FormWindow title={"Sign up!"}>
            {errors &&

                <div role="alert  rounded-lg">
                    {/*<div className="bg-red-300 text-white font-bold rounded-t-lg px-4 py-2">*/}
                    {/*    Danger*/}
                    {/*</div>*/}
                {Object.keys(errors).map(key => (

                        <div className="px-3 bg-red-100 py-1 text-red-700">
                            <p> {errors[key][0]}</p>
                        </div>

                ))}
                </div>
            }
            <form onSubmit={onSubmit} className={theme + ' p-6 rounded-b-lg'} >
                <div className="w-full md:w-2/3 px-0 mb-6 md:mb-0">

                    <FormTextInput name={"firstName"} updateForm={(e:BaseSyntheticEvent)=>updateForm(e)} id="firstName" text="First Name" />
                    <FormTextInput name={"lastName"} updateForm={(e:BaseSyntheticEvent)=>updateForm(e)} id="lastName" text="Last Name" />

                </div>
                    <FormEmailInput inputValue={state.email} text={"Email Address"} id={"email"} updateForm={(e:BaseSyntheticEvent)=>updateForm(e)}/>
                    <FormPasswordInput  inputValue={state.password} text={"Password"} id={"password"} updateForm={(e:BaseSyntheticEvent)=>updateForm(e)}/>
                    <FormPasswordConfirmInput inputValue={state.passwordConfirm}  text={"Confirm Password"} id={"passwordConfirm"} updateForm={(e:BaseSyntheticEvent)=>updateForm(e)}/>
                    <FormSubmitButton text={"Sign Up!"} id={"signup"}/>
                <p className="mt-6 text-center">
                    Already registered?
                    <Link to={'/login'}> Log In </Link>
                </p>
            </form>
        </FormWindow>
    );
}

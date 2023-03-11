import {Link} from "react-router-dom";
import {BaseSyntheticEvent, useContext, useState} from "react";
import {ThemeContext} from "../contexts/ThemeContext";
import FormWindow from "../components/form-components/FormWindow";
import FormSubmitButton from "../components/form-components/FormSubmitButton";
import FormPasswordInput from "../components/form-components/FormPasswordInput";
import AxiosService from "../services/AxiosService";
import {useStateContext} from "../contexts/ContextProvider";
import FormErrors from "../components/alerts/FormErrors";
import {FormEmailInput} from "../components/form-components/FormEmailInput";


export default function Login () {

    const {theme } = useContext(ThemeContext)                                       /* manage theme                         */
    const [errors, setErrors] = useState(null);                           /* State to manage errors               */
    const {setUser, setToken} = useStateContext();                                  /* State to manage user after signup    */

    /*
    * This sets up the state for the form.
    * Should be implemented via ref method as we don't need two-way binding
    */
    const [state, setState] = useState({
        email: '',
        password: '',
    });


    /*********************************************************************************
     * @name onSubmit
     * @summary This function handle the submit event. It
     * @param ev BaseSyntheticEvent
     * @returns void
     */

    const onSubmit = (ev:BaseSyntheticEvent)=>{
        ev.preventDefault();        /* prevent page refresh */


        // These fields need to match Laravel Backend
        const payload ={
            email: state.email,
            password: state.password,
        }
        setErrors(null); /* Clear existing errors */
        const axiosService = new AxiosService();

        axiosService.login(payload).then(({data})=>{
            if(setUser)
                setUser(data.user)
            if(setToken)
                setToken(data.token)

        }).catch((error)=>{
            const response = error.response;

            if (response && response.status === 422) { // Validation Error

                if (response.data.message){

                    setErrors({
                        // @ts-ignore
                        errors: [response.data.message]
                    })
                }else{
                    setErrors(response.data.errors);
                }
            }
        })

    }

    /*********************************************************************************
     * @name updateFrom
     * @summary Handles any changes in any of the elements inside the form. Will filter though properties dymically.
     * It is important that the event.target.name is identical to the state value.
     * @param event
     */
    const updateForm = (event:BaseSyntheticEvent) =>{

            setState(state => ({
                ...state,
                [event.target.name]: event.target.value
            }))

    }

    return (
            <FormWindow title={"Login"}>
                {errors &&
                    <FormErrors errors={errors} />
                }
                <form onSubmit={onSubmit} className={theme + ' p-6 rounded-b-lg'} >
                    <FormEmailInput text={"Email"} id={"email"} inputValue={state.email} updateForm={(e:BaseSyntheticEvent)=>updateForm(e)}/>
                    <FormPasswordInput text={"Password"} id={"password"} inputValue={state.password} updateForm={(e:BaseSyntheticEvent)=>updateForm(e)}/>
                    <FormSubmitButton text={"Login"} id={"signup"}/>
                    <p className="mt-6 text-center">
                        Not a member?
                        <Link to={'/signup'}> Sign Up </Link>
                    </p>
                </form>
            </FormWindow>
    );
}

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
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });

    const {setUser, setToken} = useStateContext();
    const {theme } = useContext(ThemeContext)


    const onSubmit = (ev:BaseSyntheticEvent)=>{
        ev.preventDefault();
        const payload ={
            first_name: state.firstName,
            last_name: state.lastName,
            email: state.email,
            password: state.password,
            password_confirm: state.passwordConfirm
        }

        const axiosService = new AxiosService();

        axiosService.createSingle(payload).then(({data})=>{
            setToken(data.token);
            setUser(data.user);
            console.log(data)
        }).catch((error)=>{
            const response = error.response;
            if (response && response.status === 422) { // Validation Error
                console.log(response.data.errors)

            }
        })
        console.log(payload)
    }
    const updateForm = (event:BaseSyntheticEvent) =>{
        console.log(event.target.name)
        console.log(event.target.value)
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

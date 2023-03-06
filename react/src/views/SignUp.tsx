import FormWindow from "../components/form-components/FormWindow";
import {Link} from "react-router-dom";
import {BaseSyntheticEvent, useContext} from "react";
import {ThemeContext} from "../contexts/ThemeContext";
import FormTextInput from "../components/form-components/FormTextInput";
import FormEmailInput from "../components/form-components/FormEmailInput";
import FormPasswordInput from "../components/form-components/FormPasswordInput";
import FormSubmitButton from "../components/form-components/FormSubmitButton";



export default function SignUp () {
    const {theme } = useContext(ThemeContext)
    const onSubmit = (ev:BaseSyntheticEvent)=>{
        ev.preventDefault();

    }
    return (

        <FormWindow title={"Sign up!"}>
            <form onSubmit={onSubmit} className={theme + ' p-6 rounded-b-lg'} >
                <div className="w-full md:w-2/3 px-0 mb-6 md:mb-0">

                    <FormTextInput id="firstName" text="First Name" />
                    <FormTextInput id="lastName" text="Last Name" />

                </div>
                    <FormEmailInput text={"Email Address"} id={"email"}/>
                    <FormPasswordInput text={"Password"} id={"password"}/>
                    <FormPasswordInput text={"Confirm Password"} id={"passwordConfirm"}/>
                    <FormSubmitButton text={"Sign Up!"} id={"signup"}/>
                <p className="mt-6 text-center">
                    Already registered?
                    <Link to={'/login'}> Log In </Link>
                </p>
            </form>
        </FormWindow>
    );
}

import {Link} from "react-router-dom";
import {BaseSyntheticEvent, useContext} from "react";
import {ThemeContext} from "../contexts/ThemeContext";
import FormWindow from "../components/form-components/FormWindow";
import FormSubmitButton from "../components/form-components/FormSubmitButton";
import FormPasswordInput from "../components/form-components/FormPasswordInput";
import FormEmailInput from "../components/form-components/FormEmailInput";

export default function Login () {
    const {theme } = useContext(ThemeContext)
    const onSubmit = (ev:BaseSyntheticEvent)=>{
        ev.preventDefault();

    }
    return (
            <FormWindow title={"Login"}>
                <form onSubmit={onSubmit} className={theme + ' p-6 rounded-b-lg'} >
                    <FormEmailInput text={"Email"} id={"email"}/>
                    <FormPasswordInput text={"Password"} id={"password"}/>
                    <FormSubmitButton text={"Login"} id={"signup"}/>
                    <p className="mt-6 text-center">
                        Not a member?
                        <Link to={'/signup'}> Sign Up </Link>
                    </p>
                </form>
            </FormWindow>
    );
}

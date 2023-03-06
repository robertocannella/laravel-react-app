import {Link} from "react-router-dom";
import {BaseSyntheticEvent, useContext} from "react";
import {ThemeContext} from "../contexts/ThemeContext";
import FormWindow from "../components/form-components/FormWindow";

export default function Login () {
    const {theme } = useContext(ThemeContext)
    const onSubmit = (ev:BaseSyntheticEvent)=>{
        ev.preventDefault();


    }
    return (


                <FormWindow title={"Login"}>
                <form onSubmit={onSubmit} className={theme + ' p-6 rounded-b-lg'} >
                    <div className="relative mb-6" data-te-input-wrapper-init>
                        <input
                            type="email"
                            className={theme + " peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"}
                            id="exampleInputEmail2"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"/>
                        <label
                            htmlFor="exampleInputEmail2"
                            className={theme + " pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8]  peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"}
                        >Email address</label
                        >
                    </div>
                    <div className="relative mb-6" data-te-input-wrapper-init>
                        <input
                            type="password"
                            className={theme + " peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"}
                            id="exampleInputPassword2"
                            placeholder="Password"/>
                        <label
                            htmlFor="exampleInputPassword2"
                                className={theme + " pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8]  peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"}
                        >Password</label
                        >
                    </div>
                    <button

                        type="submit"
                        className={theme + " inline-block  rounded  px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal  transition duration-150 ease-in-out  focus:outline-none"}
                        data-te-ripple-init
                        data-te-ripple-color={theme}>
                        Sign in
                    </button>
                    <p className="mt-6 text-center">
                        Not a member?
                        <Link to={'/signup'}> Sign Up </Link>
                    </p>
                </form>
                </FormWindow>
    );
}

import {Link, Navigate, Outlet} from "react-router-dom";
import {User, useStateContext} from "../contexts/ContextProvider";
import React, {BaseSyntheticEvent, useContext, useEffect, useState} from "react";
import {ThemeContext} from "../contexts/ThemeContext";
import AxiosService from "../services/AxiosService";
import FormButton from "./form-components/FormButton";



export default function DefaultLayout () {
    const {theme, toggleTheme} = useContext(ThemeContext);
    const {user, token, setUser, setToken} = useStateContext()
    const [visibility, setVisibility] = useState(false);
    const axiosService = new AxiosService();
    const toggleVisibility = ()=>{

        setVisibility(!visibility)

    }
    useEffect(()=>{ /* Runs like Component Did Mount (be sure to put an empty array as second argument) */
        axiosService.getUser().then(({data})=>{
            const  user = {
                firstName: data.first_name,
                lastName: data.last_name,
                email: data.email
            }
            if (setUser)
                setUser( (user as User));

        })

    },[])  /* be sure to put an empty array as second argument */


    /**
     * @name onLogout
     * @summary Handles the logout event. Creates
     *
     */
    const onLogout = (ev:BaseSyntheticEvent)=>{
        ev.preventDefault();

        axiosService.logout().then(()=>{
            if (setUser) {
                setUser(null)
            }
            if (setToken){
                setToken(null)
            }
        });
    }

    // If user is not logged in, send to login page
    if(!token) {
        return (
            <Navigate to={'/login'}/>
        )

    }
    return (

        <>
            <div id="defaultLayout"  className={theme}>

                    <aside  hidden={visibility} className={theme + ' menuFlyout'}>
                        <Link to={'/dashboard'}  className={theme}>Dashboard</Link>
                        <Link to={'/users'} className={theme}>Users</Link>
                    </aside>
                    <div id="menuExpander" className={theme} onClick={toggleVisibility}>

                       <span> {visibility ? ">>": '<<'}</span>
                    </div>

                <div className="content">
                    <header >
                        <div className={theme + ' header'}>
                            <button  onClick={toggleTheme}>{theme === "light" ? "🌙" : "🌞"}</button>
                            <div>Header text</div>
                            <div>
                                {user?.firstName} &nbsp; &nbsp;
                                <FormButton id={'logout-button'} onPress={onLogout} text={'Logout'}> Logout</FormButton>

                            </div>

                        </div>
                    </header>
                    <main  className={theme}>
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    );
}

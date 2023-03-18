import {Link, Navigate, Outlet} from "react-router-dom";
import {User, useStateContext} from "../contexts/ContextProvider";
import React, {BaseSyntheticEvent, useContext, useEffect, useState} from "react";
import {ThemeContext} from "../contexts/ThemeContext";
import AxiosService from "../services/AxiosService";
import FormButton from "./form-components/FormButton";
import {FontAwesomeIcon,} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import { faUsers,faDashboard,faEnvelope } from '@fortawesome/free-solid-svg-icons';


export default function DefaultLayout () {
    const {theme, toggleTheme} = useContext(ThemeContext);
    const {user, token, setUser, setToken} = useStateContext()
    const [visibility, setVisibility] = useState(false);
    const axiosService = new AxiosService();
    const toggleVisibility = ()=>{
        setVisibility(!visibility)

        const gridMenu = document.getElementById('pageRoot');
        const links = Array.from(document.getElementsByClassName('menuLink') as HTMLCollectionOf<HTMLElement>);


        if (gridMenu && !visibility)
            gridMenu.style.gridTemplateColumns = '75px auto'
        if (gridMenu && visibility)
            gridMenu.style.gridTemplateColumns = '20% auto'

    }


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

    // If user is not logged in, send to login page
    if(!token) {
        return (
            <Navigate to={'/login'}/>
        )

    }

    // @ts-ignore
    return (

        <div id={"pageRoot"}  style={{display: 'grid', gridTemplateColumns: '20% auto', transition:  '300ms'}}>
            <aside id="gridMenu" className={theme + ' menuFlyout'}>
                <div onClick={toggleVisibility} className={"hamburgerToggle"}><FontAwesomeIcon  icon={faBars}/></div>
                <Link to={'/dashboard'} id="dashboardLink"  className={theme + ' menuLink'}>{visibility ? <FontAwesomeIcon icon={faDashboard} /> : "Dashboard"}</Link>
                <Link to={'/users'} id="usersLink" className={theme + ' menuLink'}>{visibility ? <FontAwesomeIcon icon={faUsers} /> : "Users"}</Link>
                <Link to={'/posts'} id="postsLink" className={theme + ' menuLink'}>{visibility ? <FontAwesomeIcon icon={faEnvelope} /> : "Posts"}</Link>
            </aside>
            <div id="defaultLayout"  className={theme} style={{}}>


                <div className="content">
                    <header >
                        <div className={theme + ' header'}>
                            <button  onClick={toggleTheme}>{theme === "light" ? (<i className="fa-solid fa-xl fa-moon"></i>) : (<i className="fa-solid fa-xl fa-sun"></i>)}</button>
                            <h3 className="mt-0 mb-2 text-3xl font-medium leading-tight text-primary">Web Ticket</h3>
                            <div>
                                <i className="fa-solid fa-lg fa-user"></i>
                                &nbsp; {user?.firstName} &nbsp; &nbsp;
                                <FormButton id={'logout-button'} onPress={onLogout} text={'Logout'}>Logout</FormButton>
                            </div>

                        </div>
                    </header>
                    <main  className={theme}>
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}

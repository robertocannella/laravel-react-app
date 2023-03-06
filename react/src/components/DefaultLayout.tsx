import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider";
import React, {useContext, useState} from "react";
import {ThemeContext} from "../contexts/ThemeContext";


export default function DefaultLayout () {
    const {theme, toggleTheme} = useContext(ThemeContext);
    const {user, token} = useStateContext()
    const [visibility, setVisibility] = useState(false);

    const toggleVisibility = ()=>{
        console.log("Clicked")
        setVisibility(!visibility)
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
                    <div id="menuExpander" className={theme} onClick={toggleVisibility}></div>

                <div className="content">
                    <header >
                        <div className={theme + ' header'}>
                            <button  onClick={toggleTheme}>{theme === "light" ? "🌙" : "🌞"}</button>
                            <div>Header text</div>
                            <div>User Info</div>
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

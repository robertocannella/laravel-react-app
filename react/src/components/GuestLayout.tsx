import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider";
import React, {useContext, useState} from "react";
import {ThemeContext} from "../contexts/ThemeContext";

export default function GuestLayout () {
    const {theme, toggleTheme} = useContext(ThemeContext);
    const [visibility, setVisibility] = useState(false);
    const {token} = useStateContext();

    // If user is already logged in, send back to '/'
    if (token) {
        return (
            <Navigate to={'/'}/>
        )
    }
    return (
        <>
            <div id="defaultLayout"  className={theme}>

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

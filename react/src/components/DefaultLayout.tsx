import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider";
import {useContext, useState} from "react";
import {ThemeContext} from "../contexts/ThemeContext";

export default function DefaultLayout () {
    const {theme, toggleTheme} = useContext(ThemeContext);
    const {user, token} = useStateContext()

    // If user is not logged in, send to login page
    if(!token) {
        return (
            <Navigate to={'/login'}/>
        )

    }
    return (
        <>
            <div id="defaultLayout" className={theme}>
                <aside id="sideBar" className={theme}>
                <button onClick={toggleTheme}></button>
                    <Link to={'/dashboard'} className={theme}>Dashboard</Link>
                    <Link to={'/users'} className={theme}>Users</Link>
                </aside>
                <div className="content">
                    <header >
                        <div className={theme + ' header'}>
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

import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider";
import {useState} from "react";

export default function GuestLayout () {
    const {token} = useStateContext();

    // If user is already logged in, send back to '/'
    if (token) {
        return (
            <Navigate to={'/'}/>
        )
    }
    return (
        <>
            <div >
                For Guest users only
                <Outlet/>
            </div>
        </>
    );
}

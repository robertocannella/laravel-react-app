import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider";

export default function DefaultLayout () {

    const {user, token} = useStateContext()

    // If user is not logged in, send to login page
    if(!token) {
        return (
            <Navigate to={'/login'}/>
        )

    }
    return (
        <>
            <div id="defaultLayout">
                <aside>
                    <Link to={'/dashboard'}>Dashboard</Link>
                    <Link to={'/users'}>Users</Link>
                </aside>
                <div className="content">
                    <header>
                        <div>Header</div>
                        <div>User Info</div>
                    </header>
                    <main>
                        <Outlet />
                    </main>
                </div>

            </div>
        </>
    );
}

import {useContext} from "react";
import {ThemeContext} from "../contexts/ThemeContext";

export default function Dashboard () {

    const {theme} = useContext(ThemeContext)

    return (
        <div className={theme}>
             Dashboard
        </div>
    );
}

import {MouseEventHandler, useContext} from "react";
import {ThemeContext, ThemeProvider} from "../contexts/ThemeContext";

export default function ToggleDarkMode() {

    const {theme, toggleTheme } = useContext(ThemeContext)

    const handleOnClick = (e: any) =>{

        if (toggleTheme) {
            toggleTheme();
        }
    }
    return (
        <>
            <h1>{theme ? "🌙" : "🌞"}</h1>
            <button onClick={handleOnClick}>Toggle dark mode</button>
        </>
    );
}

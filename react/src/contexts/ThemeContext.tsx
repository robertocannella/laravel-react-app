import {createContext, FC, useState} from "react";
import * as React from "react";
import { PropsWithChildren } from 'react';


export interface IThemeContext {
    theme?: string,
    toggleTheme?: () => void
}
const defaultState = {
    theme: "light",
    toggleTheme: ()=>{}
}

export const ThemeContext = createContext<IThemeContext>(defaultState);


export const  ThemeProvider: FC<PropsWithChildren> = ({children}) =>{

    const [theme, setTheme] = useState("dark")

    const toggleTheme = () => {
        setTheme((curr) => (curr === "light" ? "dark" : "light"));
    }


    return (
        <ThemeContext.Provider value={{theme,toggleTheme}}>
                {children}
        </ThemeContext.Provider>
    )

}



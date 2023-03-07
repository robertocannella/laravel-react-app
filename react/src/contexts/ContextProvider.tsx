import {createContext, useState, useContext, Dispatch, SetStateAction} from "react";
import * as React from "react";

export type User = {
    firstName: string;
    lastName: string;
    email: string;

}

export type AuthenticationContextType =  {
    user: User | null;
    token: string | null;
    setUser: Dispatch<SetStateAction<User|null>> | null;
    setToken: Dispatch<SetStateAction<string|null>> | null;
}

export const StateContext = createContext<AuthenticationContextType>({
    user: null,
    token: null,
    setToken: ()=> {},
    setUser: () => {}
});

export const ContextProvider:React.FC<any> = ({children}) =>{

    const [user, setUser] = useState<User | null>(null );
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    const setToken = (token:any)=>{
        _setToken(token);
        if (token){
            localStorage.setItem('ACCESS_TOKEN',token)
        }else{
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            setToken,
            setUser
        }}>
            {children}
        </StateContext.Provider>
    )

}
export const useStateContext = () => useContext(StateContext);

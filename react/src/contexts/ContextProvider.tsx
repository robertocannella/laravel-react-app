import {createContext, useState, useContext, Dispatch, SetStateAction} from "react";
import * as React from "react";


export type AuthenticationContextType =  {
    user: string | null;
    token: string | null;
    setUser: Dispatch<SetStateAction<null>> ;
    setToken: Dispatch<SetStateAction<null>>;
}

const StateContext = createContext<AuthenticationContextType>({
    user: null,
    token: null,
    setToken: () => {},
    setUser: () => {}
});

export const ContextProvider:React.FC<any> = ({children}) =>{

    const [user, setUser] = useState(null );
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

import React, {BaseSyntheticEvent, ReactNode, useContext} from 'react';
import {ThemeContext} from "../../contexts/ThemeContext";

interface Props {
    text: string;
    id: string;
    children?: ReactNode
    inputValue: string
    updateForm: (e:BaseSyntheticEvent)=>void
}
export const FormPasswordInput = (props:Props) => {
    const {theme} = useContext(ThemeContext);

    return (

        <div className="relative z-0 pb-5">
            <input type="password" id={props.id}
                   className={theme + "  block p-2 w-full rounded  text-md border-0 border-b-2 border-gray-300 appearance-none focus:outline-none peer"}
                   placeholder=" "
                   name={props.id}
                   value={props.inputValue}
                   onChange={(e)=>props.updateForm(e)}
            />
            <label htmlFor={props.id}
                   className={theme + " absolute duration-300 transform -translate-y-6 scale-75 top-1 left-2 z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"}>
                {props.text}
            </label>
        </div>
    );
}



import {BaseSyntheticEvent, useContext, useState} from "react";
import {ThemeContext} from "../../contexts/ThemeContext";


interface Props {
    name: string;
    defaultValue: string;
    updateForm: (e:BaseSyntheticEvent) => void;
}


export default function FormTextArea (props: Props) {
    const {theme} = useContext(ThemeContext);


    return (
        <>

            <label htmlFor={props.name}>Post Details</label>

            <textarea
                contentEditable={false}
                name={props.name}
                defaultValue={ props.defaultValue}
                onChange={props.updateForm}
                rows={6}
                className={theme + ' block p-2 w-full w-full rounded  border-0 border-b-2 border-gray-300 appearance-none focus:outline-none peer'}
            />

        </>
    );
}

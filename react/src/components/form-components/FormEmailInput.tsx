import React, {Component, ReactNode} from 'react';
import {ThemeContext} from "../../contexts/ThemeContext";


type FormEmailInputProps = {
    text: string;
    id: string;
    children?: ReactNode
}

class FormEmailInput extends Component<FormEmailInputProps> {
    static contextType = ThemeContext;
    declare context: React.ContextType<typeof ThemeContext>;
    constructor(props: FormEmailInputProps) {
        super(props);

    }
    componentDidMount() {
        this.setState((state)=>({
            title: "Fill In this field"
        }))
    }

    render() {
        return (

            <div className="relative z-0 pb-5">
                <input type="email" id={this.props.id}
                       className={this.context.theme + "  block p-2 w-full rounded  text-md border-0 border-b-2 border-gray-300 appearance-none focus:outline-none peer"}
                       placeholder=" "/>
                <label htmlFor={this.props.id}
                       className={this.context.theme + " absolute duration-300 transform -translate-y-6 scale-75 top-1 left-2 z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"}>
                    {this.props.text}
                </label>
            </div>
        );
    }
}

export default FormEmailInput;

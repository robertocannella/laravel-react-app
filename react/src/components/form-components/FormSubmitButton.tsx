
import {ThemeContext} from "../../contexts/ThemeContext";
import React, {Component, ReactNode} from "react";


type FormSubmitProps = {
    text: string;
    id: string;
    children?: ReactNode
}

class FormSubmitButton extends Component<FormSubmitProps> {
    static contextType = ThemeContext;
    declare context: React.ContextType<typeof ThemeContext>;
    constructor(props: FormSubmitProps) {
        super(props);

    }
    componentDidMount() {
        this.setState((state)=>({
            title: "Fill In this field"
        }))
    }

    render() {
        return (

            <button
                type="submit"
                className={this.context.theme + " inline-block  rounded  px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal  transition duration-150 ease-in-out  focus:outline-none"}
                data-te-ripple-init
                data-te-ripple-color={this.context.theme}>
                {this.props.text}
            </button>
        );
    }
}

export default FormSubmitButton;

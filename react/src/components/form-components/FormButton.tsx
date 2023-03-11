
import {ThemeContext} from "../../contexts/ThemeContext";
import React, {BaseSyntheticEvent, Component, ReactNode} from "react";


type FormButtonProps = {
    text: string;
    id: string;
    onPress: (ev: BaseSyntheticEvent) => void
    outline?: boolean
    children?: ReactNode
}

type FormButtonState = {
    text: string;
    id: string;
    children?: ReactNode
}
class FormButton extends Component<FormButtonProps, FormButtonState> {
    static contextType = ThemeContext;
    declare context: React.ContextType<typeof ThemeContext>;

    constructor(props: FormButtonProps) {
        super(props);

    }
    componentDidMount() {
        this.setState((state)=>({
            text: "button"
        }))
    }

    render() {
        return (

            <button
                onClick={this.props.onPress}
                type="button"
                className={this.context.theme + ((this.props.outline) ? " border-gray-500 ":"") +  " inline-block  rounded  px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal  transition duration-150 ease-in-out  focus:outline-none"}

                data-te-ripple-init
                data-te-ripple-color={this.context.theme}>
                {this.props.text}
            </button>
        );
    }
}

export default FormButton;


import {ThemeContext} from "../../contexts/ThemeContext";
import React, {BaseSyntheticEvent, Component, ReactNode} from "react";
import {Link} from "react-router-dom";


type ButtonHTMLProps = {
    text: string;
    id: string;
    linkTo: string;
    children?: ReactNode
}

type ButtonHTMLState = {
    text: string;
    id: string;
    children?: ReactNode
}
class ButtonHTML extends Component<ButtonHTMLProps, ButtonHTMLState> {
    static contextType = ThemeContext;
    declare context: React.ContextType<typeof ThemeContext>;

    constructor(props: ButtonHTMLProps) {
        super(props);

    }
    componentDidMount() {
        this.setState((state)=>({
            text: "button"
        }))
    }

    render() {
        return (
            <Link to={this.props.linkTo}>
                <button
                    type="button"
                    className={this.context.theme + " inline-block  rounded  px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal  transition duration-150 ease-in-out  focus:outline-none"}
                    data-te-ripple-init
                    data-te-ripple-color={this.context.theme}>
                    {this.props.text}
                </button>
            </Link>
        );
    }
}

export default ButtonHTML;

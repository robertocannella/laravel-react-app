import React, {Component, ReactNode} from 'react';
import {ThemeContext} from "../../contexts/ThemeContext";


type FormWindowProps = {
    title: string;
    children?: ReactNode
}

class FormWindow extends Component<FormWindowProps> {
    static contextType = ThemeContext;
    declare context: React.ContextType<typeof ThemeContext>;
    constructor(props: FormWindowProps) {
        super(props);

    }
    componentDidMount() {
        this.setState((state)=>({
            title: "Welcome"
        }))
    }

    render() {
        return (

            <div
                className={this.context.theme + " title-bar block max-w-sm mx-auto rounded-lg pt-3"}>
                <span className={this.context.theme + " title-bar pl-2"}>{this.props.title}</span>
                {this.props.children}
            </div>
        );
    }
}

export default FormWindow;

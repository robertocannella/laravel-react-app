import React, {Component, ReactNode} from 'react';
import {ThemeContext} from "../../contexts/ThemeContext";


type FormWindowProps = {
    title: string;
    children?: ReactNode
    containsTextArea?: boolean
    rcClasses?: string
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
                className={this.context.theme +  ' max-w-lg '+ this.props.rcClasses + " title-bar  block mx-auto rounded-lg pt-3"}>
                <div className={this.context.theme + " title-bar pl-2 mb-2"}>{this.props.title}</div>
                {this.props.children}
            </div>
        );
    }
}

export default FormWindow;

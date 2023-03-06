import React, {BaseSyntheticEvent, Component, ReactNode} from 'react';
import {ThemeContext} from "../../contexts/ThemeContext";


type FormTextInputProps = {
    text: string;
    id: string;
    children?: ReactNode
    name: string
    updateForm: (e:BaseSyntheticEvent) => void
}
interface IFormInputState {
    name: string
}

class FormTextInput extends Component<FormTextInputProps, IFormInputState> {
    static contextType = ThemeContext;
    declare context: React.ContextType<typeof ThemeContext>;
    constructor(props: FormTextInputProps) {
        super(props);

        // @ts-ignore
        this.state = {
            [this.props.name]: ''
        };
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(evt:BaseSyntheticEvent){

        this.props.updateForm(evt);
        this.setState(
            // @ts-ignore
            {[this.props.name]: evt.target.value}
        )
    }


    render() {
        return (

            <div className="relative z-0 pb-5">
                <input type="text" id={this.props.id}
                       className={this.context.theme + "  block p-2 w-full w-full rounded  border-0 border-b-2 border-gray-300 appearance-none focus:outline-none peer"}
                       placeholder=" "
                       name={this.props.name}
                       value={this.state.name}
                       onChange={this.handleChange}
                />
                <label htmlFor={this.props.id}
                       className={this.context.theme + " absolute duration-300 transform -translate-y-6 scale-75 top-1 left-2 z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"}>
                    {this.props.text}
                </label>
            </div>
        );
    }
}

export default FormTextInput;

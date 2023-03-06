import React, {BaseSyntheticEvent, Component, ReactNode} from 'react';
import {ThemeContext} from "../../contexts/ThemeContext";


type FormEmailInputProps = {
    text: string;
    id: string;
    children?: ReactNode
    inputValue: string
    updateForm: (e:BaseSyntheticEvent)=>void
}
interface IFormPasswordState {
    passwordConfirm: string
}

class FormPasswordConfirmationInput extends Component<FormEmailInputProps, IFormPasswordState> {
    static contextType = ThemeContext;
    declare context: React.ContextType<typeof ThemeContext>;
    constructor(props: FormEmailInputProps) {
        super(props);


        this.state = {
            passwordConfirm: ''
        };
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(evt:BaseSyntheticEvent){
        this.props.updateForm(evt);
        // @ts-ignore
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }
    componentDidMount() {
        // @ts-ignore
        this.setState((state)=>({
            title: "Fill In this field"
        }))
    }

    render() {
        return (

            <div className="relative z-0 pb-5">
                <input type="password" id={this.props.id}
                       className={this.context.theme + "  block p-2 w-full rounded  text-md border-0 border-b-2 border-gray-300 appearance-none focus:outline-none peer"}
                       placeholder=" "
                       name={this.props.id}
                       value={this.state.passwordConfirm}
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

export default FormPasswordConfirmationInput;

import React, {Component} from 'react';

type FormErrorsProps = {
    errors: []
}
type FormErrorsState = {
    displayAsModal: boolean

}

class FormErrors extends Component<FormErrorsProps,FormErrorsState> {
    constructor(props:FormErrorsProps) {
        super(props);
        this.state = {
            displayAsModal: false
        }
        /* Bind any method here
        *
        *   this.method = this.method.bind(this);
        * */
    }

    render() {
        const {errors} = this.props;
        const {displayAsModal} = this.state;
        return (
            <div role="alert  rounded-lg">
                {/*<div className="bg-red-300 text-white font-bold rounded-t-lg px-4 py-2">*/}
                {/*    Danger*/}
                {/*</div>*/}
                {Object.keys(errors).map((key:any,index:number) => ( /* TODO: FIND THIS KEY-TYPE */

                    <div key={index} className="px-3 bg-red-100 py-1 text-red-700">
                        <p > {errors[key][0]}</p>
                    </div>

                ))}
            </div>
        );
    }
}

export default FormErrors;

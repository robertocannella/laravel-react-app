/**
 * React Functional Component
 * @name Modal
 * @author Roberto Cannella
 * @remarks A generic popup that serves as confirmation, information,
 * warning or other similar purposes. It is based on the implementation
 * of react-model seen here: https://reactcommunity.org/react-modal/
 *
 * @param isOpen  Boolean State
 * @param onAfterOpen   Callback function after modal opens
 * @param onAfterClose  Callback function after modal closes
 * @param onRequestClose  Function that will be run when the modal is requested
 *      to be closed (either by clicking on overlay or pressing ESC).
 *      Note: It is not called if isOpen is changed by other means.
 * @param closeTimeoutMS Number indicating the milliseconds to wait before closing
 *      the modal.
 * @param contentLabel={
 *     "Example Modal"  String indicating how the content container should be announced
 *      to screen readers.
 * @param shouldCloseOnEsc Boolean indicating if pressing the esc key should close the modal
 *
 *
 *
 */

import {ReactNode, useContext, useState} from "react";
import FormButton from "../../form-components/FormButton";
import {ThemeContext} from "../../../contexts/ThemeContext";
import styled from 'styled-components';

interface ModalProps {
    children: ReactNode
    visibility: boolean
    title: string
    type: 'danger' | 'warn' | 'info' | 'success'
    onCancel?: () => void
    onConfirm: ()=> void
}

/**
 *
 * Configure Warn, Info, Confirm Colors Here
 */
interface TitleProps {
    type: 'danger' | 'warn' | 'info' | 'success'
}
const Title = styled.div<TitleProps>`
    color: ${props =>
    (props.type === 'danger') ? '#721c24' :
        (props.type === 'warn') ? '#856404' :
            (props.type === 'info') ? '#0c5460' : '#155724'};
    background: ${props =>
    (props.type === 'danger') ? '#f8d7da' :
        (props.type === 'warn') ? '#fff3cd' :
            (props.type === 'info') ? '#d1ecf1' : '#d4edda'};
    `;


export default function Modal (props:ModalProps ) {


    const context = useContext(ThemeContext);
    const {visibility,type, onCancel,onConfirm,children} = props;
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div id="defaultModal" tabIndex={-1} aria-hidden="true" className={((visibility ? '': 'hidden')) + " bg-black/50 fixed top-0 left-0 right-0 z-40 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"}>
            <div className={"relative rounded mx-auto top-20 index w-full h-full max-w-2xl md:h-auto z-50 "}>
                <div className={context.theme + " modal-container " + "relative rounded-lg shadow"}>
                    {/* Modal Header */}
                    <Title type={props.type} className="rounded-t-md">
                    <div className="flex items-start justify-between p-2 border-b rounded-t dark:border-gray-600">

                        <h2
                            className="text-xl font-semibold">
                            {props.title}
                        </h2>
                        {onCancel &&
                            <button
                                onClick={() => onCancel()}
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="defaultModal">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                          clipRule="evenodd"></path>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        }
                    </div>
                    </Title>
                    {/* Modal Body */}
                    <div className={context.theme + " modal-body p-6 space-y-6"}>
                        {children}
                    </div>
                    {/* Modal Footer */}
                    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <FormButton outline={true} text={"Okay"} id={"okay"} onPress={()=>onConfirm()}/>
                        {onCancel &&
                            <FormButton outline={true} text={"Cancel"} id={"cancel"} onPress={() => onCancel()}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

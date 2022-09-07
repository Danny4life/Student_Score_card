import React, { FC, FormEvent, ChangeEvent, MouseEvent } from 'react';
import styles from './CreateStackModal.module.css';
import { ModalForm } from '../component';
import ReactDOM from 'react-dom'


//Main JSX component to render
type closeModalProps = {
    onOffModalHandler: (e?: ChangeEvent<HTMLButtonElement>) => void

}

const CreateStackModal: (props: closeModalProps) => JSX.Element = function(props: closeModalProps){
    const { onOffModalHandler } = props;
    const submitHandler= function(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        console.log(e.currentTarget.elements)
    }

    const offModal = function(event: MouseEvent<HTMLButtonElement> ){
        onOffModalHandler();
    }


    return(
            <>
                <div className={styles["backdrop"]}> </div>
                { ReactDOM.createPortal(
                    <ModalForm offModal = { offModal } submitHandler={submitHandler} />,
                    document.getElementById('create-stack-modal-root')!
                )}
            </>
    )
}


export default CreateStackModal;


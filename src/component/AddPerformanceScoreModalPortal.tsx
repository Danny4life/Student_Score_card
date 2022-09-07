import React, { MouseEvent } from 'react';
import ReactDOM from 'react-dom';
import{AddPerformanceScoreModal} from './';
import styles from './CreateStackModal.module.css'


type AddPerformanceScoreModalPortalProps = {
    offModal: () => void;
    id: string;
    firstName: string;
    lastName: string;
}

const AddPerformanceScoreModalPortal: (props: AddPerformanceScoreModalPortalProps)=> JSX.Element = function (props: AddPerformanceScoreModalPortalProps){
    return(
        <>
            <div className={styles["backdrop"]}> </div>
            {ReactDOM.createPortal(
                <AddPerformanceScoreModal offModal={props.offModal} id={props.id} firstName={props.firstName} lastName={props.lastName} />,
                document.getElementById('create-stack-modal-root')!
            )}
        </>
    )
}

export default AddPerformanceScoreModalPortal;
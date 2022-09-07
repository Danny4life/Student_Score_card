import React, { MouseEvent } from 'react';
import ReactDOM from 'react-dom';
import {AdminEditModal} from './';

type AdminEditModalPortalProps = {
    offModal: (e: MouseEvent<HTMLButtonElement>) => void;
    id: string
}

const AdminEditModalPortal: (props: AdminEditModalPortalProps)=> JSX.Element = function(props: AdminEditModalPortalProps){
    return(
    ReactDOM.createPortal(
        <AdminEditModal offModal={ props.offModal } id={props.id}/>,
        document.getElementById('create-stack-modal-root')!
    )
    )
}


export default AdminEditModalPortal;
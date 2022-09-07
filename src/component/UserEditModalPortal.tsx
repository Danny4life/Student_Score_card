
import React, { MouseEvent } from 'react';
import ReactDOM from 'react-dom';
// import { EditUserModal } from './EditUserModal';
import EditUserModal from "./EditUserModal"

type UserEditModalPortalProps = {
    offModal: () => void;
    id: string
}
const UserEditModalPortal: (props: UserEditModalPortalProps) => JSX.Element = function (props: UserEditModalPortalProps) {
    return (
        ReactDOM.createPortal(
            <EditUserModal offModal={props.offModal} id={props.id} />,
            document.getElementById('create-stack-modal-root')!
        )
    )
}
export default UserEditModalPortal;


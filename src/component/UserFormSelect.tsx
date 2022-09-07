import { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import UserEditModalPortal from './UserEditModalPortal'
import styled from 'styled-components';
import axios from 'axios'
import swal from 'sweetalert';

type PageProps = {
    id: string;
}
const BASEURL = process.env.REACT_APP_BASEURL;

const ModalButton = styled.button`
    border: unset;
    background-color: white;
    font-size: 1rem;
    color: #21334F;
    padding: 1rem 2rem;
    text-align: start;
    &:hover {
        cursor: pointer;
        text-shadow: 0px 0px 5px #aaa;
        letter-spacing: 0.4px;
    }
`
const UserFormSelect = (props: PageProps) => {
    const { id } = props;
    const [modal, showModal] = useState(false);

    const axiosHeader = {
        headers: {
            'authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }


    const deleteUser = async (url: string) => {
        const response = await axios.delete(url, axiosHeader);
        if (response.data.status === 'success') {
            swal('Success', response.data.message, 'success');
            showModal(false);
        }
    }
    const deactiv8User = async (url: string) => {
        const response = await axios.patch(url, {}, axiosHeader);
        if (response.data.status === 'success') {
            swal('Success', response.data.message, 'success');
            showModal(false);
        }
    }
    const activ8User = async (url: string) => {
        const response = await axios.post(url, {}, axiosHeader);
        if (response.data.status === 'success') {
            swal('Success', response.data.message, 'success');
            showModal(false);
        }
    }


    const handleClick = (e: any) => {
        if (e.target.dataset) {
            const [url, method] = e.target.dataset.action.split(',');
            switch (method) {
                case 'delete':
                    deleteUser(url);
                    break;
                case 'patch':
                    deactiv8User(url)
                    break;
                case 'post':
                    activ8User(url)
                    break;
                default:
                    break;
            }
        }
    }

    const [editUserModal, setEditUserModal] = useState(false)

    const addModal: () => void = function () {
        setEditUserModal(true)
    }
    const offModal: () => void = function () {
        setEditUserModal(false)
    }



    return (
    <>
        { editUserModal && <UserEditModalPortal offModal={offModal} id={id} /> }
        <div style={{ width: '100%', marginBottom: '0.8rem', position: 'relative' }}>
            <span onClick={() => { showModal(!modal) }} style={{ cursor: 'pointer' }}>...</span>
            <div onMouseLeave={() => { showModal(!modal) }} style={{
                position: 'absolute',
                display: (modal ? 'inline-flex' : 'none'),
                boxShadow: '0px 0px 10px grey',
                flexDirection: 'column',
                top: '2rem',
                left: '-14rem',
                background: 'white',
                zIndex: '1000',
                minWidth: '15rem',
                minHeight: '13rem',
                justifyContent: 'space-around',
                padding: '0.8rem 0'
            }}>

                <ModalButton onClick={addModal}>Edit</ModalButton>
                <ModalButton data-action={[`${BASEURL}/admin/activate_decadev/${id}`, 'post']} onClick={handleClick}>Activate</ModalButton>
                <ModalButton data-action={[`${BASEURL}/admin/deactivate_decadev/${id}`, 'patch']} onClick={handleClick}>Deactivate</ModalButton>
                <ModalButton data-action={[`${BASEURL}/admin/delete_decadev/${id}`, 'delete']} onClick={handleClick}>Delete</ModalButton>
            </div>
        </div>
    </>)
}
export default UserFormSelect;
import { useState, useEffect, ChangeEvent, MouseEvent} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import swal from 'sweetalert';
import {AddPerformanceScoreModalPortal, Card} from '../component';

type PageProps2 = {
    id: string;
  firstName: string;
  lastName: string;
}

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

const FormSelect2 = (props: PageProps2) => {
    const {id} = props;
    const [modal, showModal] = useState(false);
    const axiosHeader = {
        headers: {
            'authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }

    const [addScoreModal, setAddScoreModal] = useState(false);

    const addModal: () => void = () => {
        setAddScoreModal(true);
    }

    const offModal: () => void = () => {
        setAddScoreModal(false);
    }

    return (
        <>
            {addScoreModal && <AddPerformanceScoreModalPortal offModal={offModal} id={id} firstName={props.firstName} lastName={props.lastName}/>}
            <div style={{width: '100%', position: 'relative'}}>
                <span onClick={addModal} style={{cursor: 'pointer'}} className='action'>...</span>
            </div>
        </>
    )
}

export default FormSelect2;
import React, { FC, FormEvent, ChangeEvent, MouseEvent, useState, useRef, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import styles from './CreateStackModal.module.css';
import Button from '../UI/Button';
import { CgClose } from 'react-icons/cg';
import axios from 'axios';


const BASEURL = process.env.REACT_APP_BASEURL;
//Implemented Portals here
type ModalFormProps ={
    offModal: (event: MouseEvent<HTMLButtonElement>) => void;
    submitHandler: (event: FormEvent<HTMLFormElement>) => void
}

const ModalForm: (props: ModalFormProps) => JSX.Element = function(props: ModalFormProps) {

    const {offModal, submitHandler} = props;
    const [name, setName] = useState('');
    const [imageFile, setImageFile] = useState<any>(null);
    const image = useRef<HTMLInputElement>(null)
    const navigate = useNavigate();
    // if( file.size > 3072){
    //     onFileSelectError({error: "File size cannot exceed 3mb"})
    // }else{
    //     onFileSelectSuccess(file)
    // }
    
    const imageUploadHandler: (e: ChangeEvent<HTMLInputElement>) => void = function(e: ChangeEvent<HTMLInputElement>){
        if(e.target.files){
            const file = e.target.files[0];
            
            if(file !== undefined){
                setImageFile(file);
            }
        }
    }
    let closeModal:(event: MouseEvent<HTMLButtonElement>) => void;
    const nameHandler: (e: ChangeEvent<HTMLInputElement>) => void = function(e: ChangeEvent<HTMLInputElement>){
        setName(e.target.value);
    }

    const token =  localStorage.getItem('token');
    const formSubmitHandler: (e: FormEvent<HTMLFormElement>) => void = function(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        const formData = new FormData();
        // { name: e.currentTarget.elements.namedItem('name'),
        //     image: image.current?.files !== null ? image.current?.files[0] : void 0
        // }
        console.log(e.currentTarget.elements);
        if(name !== undefined && imageFile !== undefined){
            formData.append('name', name);
            formData.append('image', imageFile);
            console.log('Just before anything: ',formData);
            axios.post(`${BASEURL}/admin/create_stack`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                setTimeout(() => {
                    // navigate('/stack');
                    window.location.reload();
                }, 500);
                console.log('Anticipated Response: ', res)
            })
            .catch((error) => {
                console.error(error)
            })
        }
        
        
    }


    closeModal  = function (event: MouseEvent<HTMLButtonElement>){
        setTimeout(() => {
            offModal(event)
        }, 500)
    }
    


    return(
        <div className={styles["modal-container"]} > 
            <div className={styles["close"]} >
                <h2> Create a Stack</h2>
                <button onClick={offModal} > <CgClose/> </button> 
            </div>
            <div style={{ padding: '1rem 4rem 4rem 4rem'}}>
                <form onSubmit={formSubmitHandler} >
                    <div className="custom_form_input"
                    // {styles["stack-name"]}
                    >
                        <label htmlFor='stack-name'>Stack Name</label>
                        <input 
                        type="text" value={name}  id="stack-name"
                        placeholder='Enter name of Stack'
                        name='name'
                        onChange={nameHandler}
                        />
                    </div>
                    <div className="custom_form_input">
                        <label htmlFor='stack-image'>Stack Image</label>
                        <input 
                        accept=".jpeg"
                        type="file" 
                        id="stack-image"
                        name='image'
                        style={{ cursor: 'pointer' }}
                        ref={image}  
                        placeholder='Stack Image'
                        onChange={imageUploadHandler} 
                        />
                    </div>
                    <button type="submit" onClick={closeModal} className={`${styles["submit"]}`} >Done</button>
                </form>
            </div>
        </div>)
}

export default ModalForm;
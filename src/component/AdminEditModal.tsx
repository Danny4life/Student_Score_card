import React, { FC, FormEvent, ChangeEvent, MouseEvent, useState, useRef, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import styles from './CreateStackModal.module.css';
import { Select2 } from '../styling/css';
import { CgClose } from 'react-icons/cg';
import axios from 'axios';
import swal from 'sweetalert';


const BASEURL = process.env.REACT_APP_BASEURL;
//Implemented Portals here
type ModalFormProps ={
    offModal: (event: MouseEvent<HTMLButtonElement>) => void;
    submitHandler?: (event: FormEvent<HTMLFormElement>) => void;
    id: string
}

const AdminEditModal: (props: ModalFormProps) => JSX.Element = function(props: ModalFormProps) {
 
    const { offModal, submitHandler } = props;
    const [input, setInput] = useState({
        firstName: '',
        lastName: '',
        email: '',
        stack: '',
        role: '',
        squad: ''
    });
    const [stacks, setStacks] = useState([]);
    const navigate = useNavigate();

    let closeModal:(event: MouseEvent<HTMLButtonElement>) => void;
    
    const getFirstName: (e: ChangeEvent<HTMLInputElement>) => void = function(e: ChangeEvent<HTMLInputElement>){
      setInput((prevState) => {
        return {
          ...prevState,
          firstName: e.target.value
        }
      })
      
    }
    const getLastName: (e: ChangeEvent<HTMLInputElement>) => void = function(e: ChangeEvent<HTMLInputElement>){
      setInput((prevState) => {
        return {
          ...prevState,
          lastName: e.target.value
        }
      })
    }
    const getEmail: (e: ChangeEvent<HTMLInputElement>) => void = function(e: ChangeEvent<HTMLInputElement>){
      setInput((prevState) => {
        return {
          ...prevState,
          email: e.target.value
        }
      })
    }
    const getStack: (e: ChangeEvent<HTMLSelectElement>) => void = function(e: ChangeEvent<HTMLSelectElement>){
      setInput((prevState) => {
        return {
          ...prevState,
          stack: e.target.value
        }
      })
    }

    const getRole: (e: ChangeEvent<HTMLInputElement>) => void = function(e: ChangeEvent<HTMLInputElement>){
      setInput((prevState) => {
        return {
          ...prevState,
          role: e.target.value
        }
      })
    }

    const getSquad: (e: ChangeEvent<HTMLInputElement>) => void = function(e: ChangeEvent<HTMLInputElement>){
      setInput((prevState) => {
        return {
          ...prevState,
          squad: e.target.value
        }
      })
      
    }
    interface Idata {
      firstName?: string,
      lastName?: string, 
      email?: string, 
      stack?: string, 
      role?: string, 
      squad?: string
    } 
    const {firstName, lastName, email, stack, role, squad} = input;
    const token =  localStorage.getItem('token');
    const formSubmitHandler: (e: FormEvent<HTMLFormElement>) => void = function(e: FormEvent<HTMLFormElement>){
      e.preventDefault();
      const data: Idata = {};
        if(firstName !== '' && firstName !== undefined){
          data['firstName'] = firstName;
        }

        if(lastName !== '' && lastName !== undefined){
          data['lastName'] = lastName;
        }
        if(email !== '' && email !== undefined){
          data['email'] = email;
        }
        if(stack !== '' && stack !== undefined){
          data['stack'] = stack;
        }
        if(role !== '' && role !== undefined){
          data['role'] = role;
        }
        if(squad !== '' && squad !== undefined){
          data['squad'] = squad;
        }

        /***************** */
          axios.patch(`${BASEURL}/admin/edit/${props.id}`, data, {
              headers: {
                  "Authorization": `Bearer ${token}`,
              },
          })
          .then((res) => {
              setTimeout(() => {
                  // navigate('/stack');
                  window.location.reload();
                  console.log(data)
              }, 1000);   
              console.log('I am done my guy')            
          })
          .catch((error) => {
              console.log(error)
            swal('Error', error.response.error, 'error');
            
          })        
    }


    useEffect(() => {
      axios.get(`${BASEURL}/admin/view_all_stack`, {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then((data) => {
        setStacks(data.data.data);
      }).catch((err) => {
        /** replace with custom contextual error message */
        console.error(err);
      })
    }, [])

    closeModal  = function (event: MouseEvent<HTMLButtonElement>){
        setTimeout(() => {
            offModal(event)
        }, 500)
    }
    
    return(
      <div className={styles["modal-container"]} >
          <div className={styles["close"]} >
            <h2> Edit Admin Details </h2>
            <button onClick={offModal} > <CgClose/> </button> 
          </div>
        
        <div style={{ padding: '1rem 4rem 4rem 4rem'}}>
        <form onSubmit={formSubmitHandler}> 
        <div className="custom_form_input">
            <label htmlFor='firstName'>First Name</label>
            <input 
            type="text" value={input.firstName}  
            placeholder='Enter First Name'
            onChange={getFirstName}
            />
        </div>
        <div className="custom_form_input">
            <label htmlFor='last-name'>Last Name</label>
            <input 
            type="text" value={input.lastName}  
            placeholder='Enter Last Name'
            onChange={getLastName}
            />
        </div>
        <div className="custom_form_input">
            <label htmlFor='email'>Email</label>
            <input 
            type="text" value={input.email}  
            placeholder='Enter Email'
            onChange={getEmail}
            />
        </div>
        {/* <div className="custom_form_input">
            <label htmlFor='role'>Stack</label>
            <input 
            type="text" value={input.stack}  
            placeholder='Enter name of Stack'
            onChange={getStack}
            />
        </div> */}

          { stacks.length > 0 && <div className="custom_form_input">
                  <label style={{ 
                    fontWeight: '400',
                    marginBottom: '0.7rem',
                    color: '#21334F',
                    display: 'block' }}>Stack</label>
                  <Select2 name="stack" id="stack" onChange={getStack}>
                      <option value="">Select...</option>
                      { stacks.length > 0 && stacks.map((e: any) => (
                        <option key={e._id} value={e.name}>{e.name}</option>
                      )) }
                  </Select2>
          </div>}
        <div className="custom_form_input">
            <label htmlFor='role'>Role</label>
            <input 
            type="text" value={input.role}  
            placeholder='Enter Role'
            onChange={getRole}
            />
        </div>
        <div className="custom_form_input">
            <label htmlFor='squad'> Squad </label>
            <input 
            type="text" value={input.squad}  
            placeholder='Enter Squad'
            onChange={getSquad}
            />
        </div>
        <button type={"submit"} onClick={closeModal} className={`${styles["submit"]}`} ><p> Done </p></button>
    </form>
  </div>          
</div>
    )
}

export default AdminEditModal;
import React, { FC, FormEvent, ChangeEvent, MouseEvent, useState, useRef, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import styles from './CreateStackModal.module.css';
import { CgClose } from 'react-icons/cg';
import { Select2 } from '../styling/css';
import axios from 'axios';
import swal from 'sweetalert';

const BASEURL = process.env.REACT_APP_BASEURL;
//Implemented Portals here
type ModalFormProps ={
    offModal: () => void;
    submitHandler?: (event: FormEvent<HTMLFormElement>) => void;
    id: string
}

interface Idata {
  firstName?: string,
  lastName?: string, 
  email?: string, 
  stack?: string, 
  role?: string, 
  squad?: string
} 
const EditUserModal: (props: ModalFormProps) => JSX.Element = function(props: ModalFormProps) {
    const { offModal, submitHandler } = props;
    const [input, setInput] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        stack: '',
        // squad: ''
    });
    // const navigate = useNavigate();
    // const formData = new FormData();

    function getFirstName(e: ChangeEvent<HTMLInputElement>){
      setInput((prevState) => {
        return {
          ...prevState,
          firstName: e.target.value
        }
      })
    }
    function getLastName(e: ChangeEvent<HTMLInputElement>){
      setInput((prevState) => {
        return {
          ...prevState,
          lastName: e.target.value
        }
      })
    }
    function getEmail(e: ChangeEvent<HTMLInputElement>){
      setInput((prevState) => {
        return {
          ...prevState,
          email: e.target.value
        }
      })
    }
    // function getPassword(e: ChangeEvent<HTMLInputElement>){
    //   setInput((prevState) => {
    //     return {
    //       ...prevState,
    //       password: e.target.value
    //     }
    //   })
    // }
    function getStack(e: ChangeEvent<HTMLSelectElement>){
      setInput((prevState) => {
        return {
          ...prevState,
          stack: e.target.value
        }
      })
    }
    function getSquad(e: ChangeEvent<HTMLInputElement>){
      setInput((prevState) => {
        return {
          ...prevState,
          squad: e.target.value
        }
      })
    }
    const {firstName, lastName, email, stack} = input;
    const token =  localStorage.getItem('token');
    
    const formSubmitHandler: (e: FormEvent<HTMLFormElement>) => void = function (e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        const data: Idata = {};
        if(firstName !== '' && firstName !== undefined){
          // console.log('I am here in this place')
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
        // if(role !== '' && role !== undefined){
        //   data['role'] = role;
        // }
        // if(squad !== '' && squad !== undefined){
        //   data['squad'] = squad;
        // }
        // console.log('I am here ooo',formData)
        // if(firstName !== '' && firstName !== undefined){
        //   console.log('I am here in this place')
        //   formData.append('firstName', firstName)
        //   console.log('Get',formData.get('firstName'))
        // }
        // if(lastName !== '' && lastName !== undefined){
        //   formData.append('lastName', lastName)
        // }
        // if(email !== '' && email !== undefined){
        //   formData.append('email', email)
        // }
        // if(stack !== '' && stack !== undefined){
        //   formData.append('stack', stack)
        // }
        // if(password !== '' && password !== undefined){
        //   formData.append('password', password)
        // }
        console.log('FormData',data);
        axios.patch(`${BASEURL}/admin/edit_decadev/${props.id}`, data, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })
        .then((res) => {
          console.log('Response',res)
          if (res.data.status === 'success') {
            swal('Success', res.data.message, 'success');
          }
            setTimeout(() => {
                window.location.reload();
            }, 1000);               
        })
        .catch((error) => {
            console.log(error)
        })        
    }

    const [stacks, setStacks] = useState([]);

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

    const closeModal  = function (){
      setTimeout(() => {
        offModal()
    }, 500)
    }

    return(
    <div className={styles["modal-container"]} >
        <div className={styles["close"]} >
            <h2> Edit User Details </h2>
            <button onClick={offModal} > <CgClose/> </button> 
        </div>
      <div  style={{ padding: '1rem 4rem 4rem 4rem'}}>
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
            <label htmlFor='password'>password</label>
            <input 
            type="text" value={input.password}  
            placeholder='Enter password'
            onChange={getPassword}
            />
        </div> */}
        {/* <div className="custom_form_input">
            <label htmlFor='stack'>Stack</label>
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
        <button type={"submit"} onClick={closeModal} className={`${styles["submit"]}`} > Done </button>
      </form>
    </div>
    </div>
    )
}
export default EditUserModal;
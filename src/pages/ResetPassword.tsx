import React, { FC, useState, useEffect, FormEventHandler } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AuthInput from '../component/AuthInput'
import AuthButton from '../component/AuthButton'
import WrapperPage from './WrapperPage'
import swal from 'sweetalert'
import axios from 'axios'

type ResetPasswordProps = {}

const ResetPassword: FC = (props: ResetPasswordProps) => {
  const [newPass, setNewPass] = useState("");
  const [confPass, setConfPass] = useState("");
  const [id, setId] = useState('')
  
  const {token} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if(token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if(payload instanceof Object) {
          setId(payload?.id)
        }
      } catch (error) {
        return;
      }
    } 
  }, [id, token])

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/recover/reset_password', { 
        id, 
        newPassword: newPass, 
        confirmPassword: confPass
      });
      if(response.data?.status === 'success') {
        swal('Sent', response.data.message, "success").then(() => {
          setTimeout(()=>{
            navigate('/login');
          }, 900)
        })
      } 
    } catch (error: any) {
      if(error?.response.data.error) {
        const message = error?.response.data.error;
        swal('Failed', message, "error");
      }
    }
  }

  return (
    <WrapperPage backToLogin={true}>
      {id ? 
      <>
        <div className='authPage_title' style={{color: '#21334F'}}>
          <h1>Reset Password</h1>
          <span style={{ fontWeight: '400', color: '#21334FC9' }}>Please choose your new password</span>
        </div>
        <div style={{padding: '2rem 0 0 0'}} className='authPage_form'>
          <form onSubmit={handleSubmit} method='post'>
            <AuthInput type='password' 
              name='newPassword' 
              label='New password' 
              placeholder='New Password' 
              errorMsg='Password must be at least 5 characters'
              setSharedState={setNewPass}
            />
            <AuthInput type='password' 
              name='confirmPassword' 
              label='Confirm password' 
              placeholder='password again' 
              errorMsg='Does not match password'
              match={newPass}
              setSharedState={setConfPass}
            />
            <AuthButton text='Change Password' />
          </form>
        </div>
      </>
      : 
      <> 
        <h1 style={{ fontWeight: '600', color: '#21334FC9', textAlign: 'center', padding: '3rem 0' }}>
          Oops!! Please login to your account...
        </h1>
      </>}
    </WrapperPage>
  )
}

export default ResetPassword;
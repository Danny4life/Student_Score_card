import React, { FC, FormEventHandler, useState } from 'react'
import AuthInput from '../component/AuthInput'
import AuthButton from '../component/AuthButton'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
// import { FormButton, FormInput } from '../component'
import WrapperPage from './WrapperPage'

type ForgotPasswordProps = {}

const ForgotPassword: FC = (props: ForgotPasswordProps) => {

  const [data, setData] = useState("");
  let navigate = useNavigate();

  const handleSubmit: FormEventHandler<HTMLFormElement>  = async (event)=> {
    event.preventDefault();
    try {
      const response = await axios.post('/recover/forgot_password', { email: data })
      if(response.data?.status === 'success') {
        swal('Sent', response.data.message, "success").then(() => {
          setTimeout(()=>{
            navigate('/login');
          }, 900)
        })
      }
    } catch (error: any) {
      if(error?.response.data.error) {
        const message = error?.response.data.error.includes('email')
        ? error?.response.data.error.replace('"email"', `${data} - `) 
        : error?.response.data.error;
        swal('Failed', message, "error")
      }
    }
  }

    // make axios post request
    // const response = await axios();

  return (
    <WrapperPage backToLogin={true}>
      <div style={{ color: '#21334F'}} className='authPage_title'>
        <h1>Forgot Password ?</h1>
        <span style={{ fontWeight: '400', color: '#21334FC9' }}>Send a link to your email address to reset your password</span>
      </div>
      <div  style={{padding: '2rem 0 0 0'}} className='authPage_form'>
        <form onSubmit={handleSubmit} method='post'>
          <AuthInput type='email' 
            name='email' 
            label='Email address' 
            placeholder='Email address' 
            errorMsg='Please enter a valid email address'
            setSharedState={setData}
          />
          <AuthButton text='Send Reset Link' />
        </form>
      </div>
    </WrapperPage>
  )
}

export default ForgotPassword;
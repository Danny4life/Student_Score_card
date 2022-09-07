import axios from 'axios';
import React, { useState, useEffect, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
// import validator from 'validator';
// import { AuthenticationInput, AuthenticationButton } from '.';
import {AuthInput, AuthButton} from '.'
type IAuthenticationLeftProps = {
}

const BASEURL = process.env.REACT_APP_BASEURL;

const AuthenticationLeft = (props: IAuthenticationLeftProps) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [mail, setMail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    
    useEffect(() => {
        if(mail || pass) {
            setFormData({ email: mail, password: pass});
        }
        return;
    }, [mail,pass])
    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const response = await axios.post(`${BASEURL}/users/login`, formData);
            response.data.message === 'Success' ? swal("Success","Login Successful", "success") : void 0;
            for(let item in response.data.data) {
                localStorage.setItem(item, response.data.data[item]);
                if(item === 'admin') {
                    Object.entries(response.data.data[item]).forEach(([key, value]) => {
                        localStorage.setItem(key, `${value}`);
                    });
                    // setTimeout(()=>{
                        navigate('/admin-dashboard/stack');

                    // }, 900)
                }
                if(item === 'decadevDetails'){
                    Object.entries(response.data.data[item]).forEach(([key, value]) => {
                        localStorage.setItem(key, `${value}`);
                    });
                    // setTimeout(()=>{
                        navigate('/decadev-dashboard/overview');
                    // }, 900)
                }
            }
            // localStorage.setItem
        }catch(err: any) {
            if(err?.response.data.error) {
                const message = err?.response.data.error;
                swal("Error",message, "error")
            }
        }
    }
    return (
        <>
            <form onSubmit={(e)=> handleSubmit(e)}>
                <AuthInput name='email' placeholder='Email Address' label='Email Address'
                type='email' errorMsg='Please enter a valid email address' setSharedState={setMail} />
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '3rem' }}>
                    <AuthInput
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        errorMsg='Please input a password with letters, numbers and symbols @_:;'
                        setSharedState={setPass}
                    />
                    <Link to="/forgot-password" style={{
                        textDecoration: "none", 
                        color: "#34A853",
                        alignSelf: 'flex-end',
                        marginTop: '-1.2rem'}}>Forgot Password?</Link>
                </div>
                <AuthButton text="Login" />
            </form>
        </>
    );
};
export default AuthenticationLeft;
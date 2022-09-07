
import { FC, useState, ChangeEvent, FormEvent, useEffect } from "react";
import { FormInput, Card, FormButton, Form, FormInput2 } from "../component";
import { Heading, Paragraph } from "../styling/css";
import axios from "axios";
import swal from "sweetalert"

type ChangePasswordProps = {
  children?: JSX.Element[]
};

const BASEURL = process.env.REACT_APP_BASEURL

const ChangePassword: (props: ChangePasswordProps) => JSX.Element = (
  props: ChangePasswordProps
) => {

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errMsg, setErrMsg] = useState<string>('')
  const [errMsgColor, setErrMsgColor] = useState<string>('')
  const [errBorderColor, setErrBorderColor] = useState<string>('')
  const [passwordVisible, setPasswordVisible] = useState(true)


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (formData.newPassword === '' && errMsgColor === '' && errBorderColor === '') {
      setErrMsgColor('#FF0000')
      setErrBorderColor('#FF0000')
      setErrMsg('Password cannot be empty')
    }
    else if (formData.newPassword !== formData.confirmPassword) {
      setErrMsgColor('#FF0000')
      setErrBorderColor('#FF0000')
      setErrMsg('Passwords do not match')
    }
    else if (formData.newPassword.length < 8 && formData.confirmPassword.length < 8) {
      setErrMsgColor('#FFA500')
      setErrBorderColor('#FFA500')
      setErrMsg('Password or Confirm Password must not be less than 8 characters')
    } else if (formData.newPassword === formData.confirmPassword) {
      setErrMsgColor('#249800')
      setErrBorderColor('#249800')
      setErrMsg('Passwords Match')
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (formData.newPassword === '' && errMsgColor === '' && errBorderColor === '') {
        setErrMsgColor('#FF0000')
        setErrBorderColor('#FF0000')
        setErrMsg('Password cannot be empty')
      } else {
        const result = await axios.put(`${BASEURL}/admin/update_password/${localStorage.getItem('id')}`, formData, {
          headers: {
            "authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        swal("Success", "You have successfully signed in", "success")
      }
    } catch (error: any) {
      if (error?.response.data.error) {
        const message = error?.response.data.error.includes('jwt') ? "You must be logged in" : error?.response.data.error
        swal("Error", message, "error")
      }
    }
  }

  useEffect(() => {
    if (formData.newPassword !== formData.confirmPassword) {
      setErrMsgColor('#FF0000')
      setErrBorderColor('#FF0000')
      setErrMsg('Passwords do not match')
    }
    else if (formData.newPassword && formData.newPassword.length < 8 && formData.confirmPassword.length < 8) {
      setErrMsgColor('#FFA500')
      setErrBorderColor('#FFA500')
      setErrMsg('Password or Confirm Password must not be less than 8 characters')
    } else if (formData.newPassword && formData.confirmPassword && formData.newPassword === formData.confirmPassword) {
      setErrMsgColor('#249800')
      setErrBorderColor('#249800')
      setErrMsg('Passwords Match')
    }
  }, [errMsg])

  return (
    <div style={{ width: '1200px' }}>
      <Heading>Change Password</Heading>
      <Card>
        <div>
          <Paragraph>
            YOUR NEW PASSWORD MUST BE DIFFERENT FROM YOUR USED PREVIOUS
            PASSWORDS.
          </Paragraph>
        </div>

        <div style={{ padding: "2rem 2.5rem" }}>
          <Form
            onSubmit={(e) => handleSubmit(e)}
          >
            <FormInput
              label="New Password"
              type="Password"
              value={formData.newPassword}
              onChange={(e) => handleChange(e)}
              onBlur={(e) => handleChange(e)}
              name="newPassword"
              errBorderColor={`${errBorderColor}`}
              errMsg={errMsg}
              errMsgColor={errMsgColor}
            />

            <FormInput
              label="Confirm Password"
              type="Password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange(e)}
              onBlur={(e) => handleChange(e)}
              errBorderColor={`${errBorderColor}`}
              name="confirmPassword"
              errMsg={errMsg}
              errMsgColor={errMsgColor}
            />

            <FormButton text="Save" />
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default ChangePassword;

import React, { useState, ChangeEvent } from 'react'
import { Label, Input } from "../styling/css"

type FormInputProps3 = {
 label: string
 type: string
 value: string
 name: string
 errBorderColor?: string
 errMsgColor?: string
 errMsg?: string
 // border: string | number | undefined
 onChange: (e: ChangeEvent<HTMLInputElement>) => void
 onBlur: (e: ChangeEvent<HTMLInputElement>) => void
}


const FormInput3: (props: FormInputProps3) => JSX.Element = (props: FormInputProps3) => {
 const { label, type, value, name, onChange, onBlur, errBorderColor, errMsg, errMsgColor} = props

 return (
  <div style={{ marginBottom: '1.2rem', width: '100%' }}>
   <Label>{label}</Label>
   <Input
    type={type}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    name={name}
    style={{border: `0.05rem solid ${errBorderColor}`}}
    disabled
   />
   <small style={{color: `${errMsgColor}`}}>{errMsg}</small>
  </div>
 )
}

export default FormInput3
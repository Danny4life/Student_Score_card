// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, ChangeEvent } from 'react'
import { Label, Input } from "../styling/css"

type FormInputProps = {
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


const FormInput: (props: FormInputProps) => JSX.Element = (props: FormInputProps) => {
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
    required
   />
   <small style={{color: `${errMsgColor}`}}>{errMsg}</small>
  </div>
 )
}

export default FormInput
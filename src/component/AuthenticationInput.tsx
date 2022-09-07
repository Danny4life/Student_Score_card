import React, { useState, ChangeEvent } from 'react'
import { Label, Input } from "../styling/css"

type AuthenticationInputProps = {
    label: string
    type: string
    value: string
    name: string
    placeholder: string
    onInput: (e: ChangeEvent<HTMLInputElement>) => void
}



const AuthenticationInput: (props: AuthenticationInputProps) => JSX.Element = (props: AuthenticationInputProps) => {
    const { label, type, value, name, onInput, placeholder } = props


    // const [value, setValue] = useState<string>('')
    return (
        <div style={{ marginBottom: '0.4rem', width: '100%' }}>
            <Label>{label}</Label>
            <Input
                type={type}
                value={value}
                onInput={onInput}
                name={name}
                placeholder={placeholder}
            />
        </div>
    )
}

export default AuthenticationInput
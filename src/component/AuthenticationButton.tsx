import React, { FC } from 'react';
import { LoginButtonBody } from "../styling/css"

type LoginButtonProps = {
    text: string
}

const AuthenticationButton: (props: LoginButtonProps) => JSX.Element = (props: LoginButtonProps) => {
    const { text } = props

    return (
        <LoginButtonBody>
            {text}
        </LoginButtonBody>
    )
}

export default AuthenticationButton;
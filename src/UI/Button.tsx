import React, { FC, MouseEvent, ChangeEvent, ReactNode } from 'react';

type ButtonProps = {
    type: "button" | "submit" | "reset"; 
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    onBlur?: (e: ChangeEvent<HTMLInputElement>) => {};
    children?: ReactNode;
    disabled?: boolean;
    color?: "primary" | "secondary";
    className?: string 
    // onSubmit?: () => {}
}

const Button =  function(props: ButtonProps){
    const {type, onClick, children, className} = props;
    return(
        <>
            < button type={ `${type}` || "button" } onClick={ onClick } className={`${className}`} >{children}</button>
        </>
    )
}

export default Button;


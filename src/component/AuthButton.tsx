import React from 'react'
import styled from "styled-components"

type ButtonProps = {
  text: string
}

const ButtonBody = styled.input`
&:hover {
letter-spacing: 0.4px;
}
padding: 0.8rem 1.5rem;
width: 100%;
font-weight: 700;
cursor: pointer;
border: unset;
font-size: 1rem;
line-height: 1.5rem;
margin: 0.4rem 0;
background: linear-gradient(96.67deg, #34A853 0%, #B8D344 100%);
color: #fff;
@media screen and (max-width: 396px) {
   padding: 0.7rem 0.5rem;
   font-size: 0.8rem;
   line-height: 1rem;
}
`

const AuthButton = (props: ButtonProps) => {
  const { text } = props
  return (
    <ButtonBody type='submit' value={text} />
  )
}
export default AuthButton;
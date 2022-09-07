import React, { FormEvent } from 'react'
import styled from "styled-components"

type FormProps = {
  children: any
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

// const Form = styled.form`

// `

const Form = (props: FormProps) => {
  const { onSubmit } = props
  return (
    <form onSubmit={onSubmit}>
      {props.children}
    </form>
  )
}

export default Form
import { ButtonBody } from "../styling/css"


type ButtonProps = {
  text: string
}


const FormButton = (props: ButtonProps) => {
  const { text } = props
  return (
    <ButtonBody type='submit'>
      {text}
    </ButtonBody>
  )
}

export default FormButton;
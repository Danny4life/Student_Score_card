import { CardBody } from "../styling/css"

type CardProps = {
 children: any
}
// padding: 2rem 2.5rem;



const Card = (props: CardProps) => {
 return (
  <CardBody>
   {props.children}
  </CardBody>
 )
} 

export default Card
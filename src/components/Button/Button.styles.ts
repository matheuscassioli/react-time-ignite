import styled from 'styled-components'

export type ButtonVariant =  "primary" | "secondary" | "danger" | "success" | "warning";

interface ButtonContainerProps{
    variant : ButtonVariant;
}
const buttonVariants = {
    primary: "purple",
    secondary: "orange",
    danger:'red', 
    success:'green', 
    warning: 'yellow'
  };

export const ButtonContainer = styled.button<ButtonContainerProps>`
 
   cursor: pointer;

    background-color: ${props => props.theme['green-500']};

 /* ${props => {
    return `background-color :  ${buttonVariants[props.variant]}`
 }}  */
`
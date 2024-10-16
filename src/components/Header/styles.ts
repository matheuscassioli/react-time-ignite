import styled from "styled-components";

export const HeaderContainer = styled.header`

    display: flex;
    justify-content: space-between;
    align-items: center;

    img{
        width: 44px;
        height: 44px;
    }
    
    nav{
        display: flex;
        gap:0.5rem;
    }

    a{
        height: 3rem;
        width: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;

        color: ${props =>props.theme["gray-100"]};
        border-top: solid transparent;
        border-bottom: solid transparent;

        &:hover{  
            border-bottom: 3px solid ${(props) => props.theme['purple-500']};
        }

        &.active{  
           color:${(props) => props.theme['purple-500']} ;
        }
    }

  

`
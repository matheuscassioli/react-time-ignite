import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    width: 44px;
    height: 44px;
  }

  .is-rotate {
    animation: rotate 10s linear infinite;
    transform-origin: center;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  nav {
    display: flex;
    gap: 0.5rem;
  }

  a {
    height: 3rem;
    width: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;

    color: ${(props) => props.theme["gray-100"]};
    border-top: solid transparent;
    border-bottom: solid transparent;

    &:hover {
      border-bottom: 3px solid ${(props) => props.theme["purple-500"]};
    }

    &.active {
      color: ${(props) => props.theme["purple-500"]};
    }
  }
`;

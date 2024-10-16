import { HeaderContainer } from "./styles";
import logo from "../../assets/CassiDEV.png";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <HeaderContainer>
      <img src={logo} />
      <nav>
        <NavLink to="/react-time-ignite">Home</NavLink>
        <NavLink to="/history">teste2</NavLink>
      </nav>
    </HeaderContainer>
  );
};

export default Header;

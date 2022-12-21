import { Link } from "react-router-dom";
import styled from "styled-components";
import colors from "../../utils/style/color";
import DarkLogo from "../../assets/dark-logo.png";
import { StyledLink } from "../../utils/style/Atoms";

const HomeLogo = styled.img`
  height: 70px;
`;

const NavContainer = styled.nav`
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function Header() {
  return (
    <NavContainer>
      <StyledLink to="/">
        <HomeLogo className="start" src={DarkLogo} />
      </StyledLink>
      <div>
        <StyledLink className="end" to="/">
          Accueil
        </StyledLink>
        <StyledLink className="end" to="/survey/1" $isFullLink>
          Faire le test
        </StyledLink>
        <StyledLink className="end" to="/freelances">
          Profils
        </StyledLink>
      </div>
    </NavContainer>
  );
}

export default Header;

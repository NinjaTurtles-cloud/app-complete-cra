import { useContext } from "react";
import { createGlobalStyle } from "styled-components";
import { ThemeContext } from "../Context";

const StyledGlobalStyle = createGlobalStyle`
    * {
        font-family: 'Trebuchet MS', Helvetica, sans-serif;
    }
   .basic {
      text-decoration: none;
    }
    body {
        background-color: ${({ isDarkMode }) =>
          isDarkMode ? "#2F2E41" : "white"};
      margin: 0;
    }
`;

function GlobalStyle() {
  const { theme } = useContext(ThemeContext);

  return <StyledGlobalStyle isDarkMode={theme === "dark"} />;
}

export default GlobalStyle;

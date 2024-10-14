import { ThemeProvider } from "styled-components"; 
import Button from "./components/Button/Button";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyles } from "./styles/themes/global";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button variant="primary" />
      <Button variant="secondary" />
      <Button variant="danger" />
      <Button variant="success" />
      <Button variant="warning" />
      <Button /> 
      <GlobalStyles />
    </ThemeProvider>
  );
}

export default App;

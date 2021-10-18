import { red } from "@material-ui/core/colors";
import { createTheme } from "@material-ui/core/styles";
//initialisation ta33 css taa3 bodyyy
// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fafafa",
    },
  },
});

export default theme;

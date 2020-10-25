import React, { useState } from "react";
import ReactDOM from "react-dom";
import NotesPanel from "./components/NotesPanel";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import WbSunny from "@material-ui/icons/WbSunny"
import Brightness3Icon from "@material-ui/icons/Brightness3"
import { IconButton } from "@material-ui/core";
import Navbar from './components/Navbar'

function App() {
  const light = {
    palette: {
      type: "light",
    },
  };

  const dark = {
    palette: {
      type: "dark",
    },
  };

  const [theme, setTheme] = useState(true);

  const icon = theme ? <WbSunny /> : <Brightness3Icon style={{ transform: "rotate(-180deg)"}}/>;
  // Icons imported from `@material-ui/icons`

  const appliedTheme = createMuiTheme(theme ? dark : light);

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      {/* <Navbar /> */}
      <IconButton
      onClick={() => setTheme(!theme)}
      >
        {icon}
      </IconButton>
      <NotesPanel />
    </ThemeProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

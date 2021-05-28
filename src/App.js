import Home from "./pages/Home";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./themes/theme";

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<Home />
		</MuiThemeProvider>
	);
}

export default App;

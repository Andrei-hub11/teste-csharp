import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { routes } from "./utils/variables/array_routes";
import { ThemeProvider } from "styled-components";
import { theme } from "./Theme/Theme";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </Router>
      </>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;


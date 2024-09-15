import "./App.scss";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router } from "react-router-dom";
import { useRouter } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { login, logout, token, userId, isReady } = useAuth();
  const isLoggedIn = !!token;
  const routes = useRouter(isLoggedIn);

  return (
    <AuthContext.Provider
      value={{ login, logout, token, userId, isReady, isLoggedIn }}
    >
      <div className="app">
        <Router>
          <NavBar />
          {routes}
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;

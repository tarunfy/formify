import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Form from "./pages/Form.jsx";
import { AuthContext } from "./contexts/AuthContext.jsx";
import { ThemeContext } from "./contexts/ThemeContext.jsx";

const App = () => {
  const { currentUser } = useContext(AuthContext);
  const { isDark } = useContext(ThemeContext);

  return (
    <>
      <div className={isDark ? `dark` : ``}>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/signin"
            render={(props) =>
              !currentUser ? (
                <SignIn {...props} isDark={isDark} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />
          <Route
            exact
            path="/signup"
            render={(props) =>
              !currentUser ? (
                <SignUp {...props} isDark={isDark} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />
          <Route
            exact
            path="/dashboard"
            render={(props) =>
              currentUser ? (
                <Dashboard {...props} isDark={isDark} />
              ) : (
                <Redirect to="/signin" />
              )
            }
          />
          <Route
            exact
            path="/forgot-password"
            render={(props) => <ForgotPassword {...props} isDark={isDark} />}
          />
          <Route
            exact
            path="/reset-password"
            render={(props) => <ResetPassword {...props} isDark={isDark} />}
          />
          <Route
            exact
            path="/form/:id"
            render={(props) => <Form {...props} isDark={isDark} />}
          />
        </Switch>
      </div>
    </>
  );
};

export default App;

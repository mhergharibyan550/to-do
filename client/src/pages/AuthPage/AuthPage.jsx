import React, { useState, useContext } from "react";
import "./AuthPage.scss";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const AuthPage = ({ isLogin }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerHandler = async () => {
    try {
      const response = await axios.post(
        "/api/auth/registration",
        { ...form },
        { headers: { "Content-Type": "application/json" } }
      );

      loginHandler();

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const loginHandler = async () => {
    try {
      const response = await axios.post(
        "/api/auth/login",
        { ...form },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response);
      login(response.data.token, response.data.userId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="auth-page">
          <h3>{isLogin ? "Authorization" : "Registration"}</h3>
          <form
            className="form form-login"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="row">
              <div className="input-field col s12">
                <input
                  type="email"
                  name="email"
                  className="validate"
                  onChange={changeHandler}
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <input
                  type="password"
                  name="password"
                  className="validate"
                  onChange={changeHandler}
                  required
                  minLength={6}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="row">
              <button
                className="waves-effect waves-light btn blue"
                onClick={isLogin ? loginHandler : registerHandler}
              >
                {isLogin ? "Log In" : "Register"}
              </button>
              <Link
                to={isLogin ? "/registration" : "/login"}
                className="btn-outline btn-reg"
              >
                {isLogin ? "Not registered?" : "Have an account?"}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

import React from "react";
import { useNavigate, Link } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // After login, go to Owner role page
    navigate("/cardmaker");
  };

  return (
    <div className="heading">
      <div className="title">LOGIN</div>

      <div className="sign_up_form">
        <div className="email1">
          <label>E-MAIL : </label>
          <input type="email" placeholder="E-MAIL" />
        </div>
        <div className="password1">
          <label>PASSWORD : </label>
          <input type="password" placeholder="PASSWORD" />
        </div>
      </div>

      <div className="buttons">
        <button onClick={handleLogin}>LOG-IN</button>
        <Link to="/signup" className="signup_link">
          <button>SIGN-UP</button>
        </Link>
      </div>

      <div className="forgot_password">
        Forgot password?_
        <span>click here</span>
      </div>
    </div>
  );
}

export default LoginForm;

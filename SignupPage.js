import React from "react";
import { useNavigate, Link } from "react-router-dom";

function SignupForm() {
  const navigate = useNavigate();

  const handleSignup = () => {
    // After signup, go to Tenant role page
    navigate("/tenantview");
  };

  return (
    <div className="heading">
      <div className="title">SIGN-UP</div>

      <div className="sign_up_htmlForm">
        <div className="username1">
          <label>USERNAME : </label>
          <input type="text" placeholder="USERNAME" />
        </div>
        <div className="email1">
          <label>E-MAIL : </label>
          <input type="email" placeholder="E-MAIL" />
        </div>
        <div className="password1">
          <label>PASSWORD : </label>
          <input type="password" placeholder="PASSWORD" />
        </div>

        <p>Enter your access level:</p>
        <div className="radio">
          <input type="radio" id="tenant" name="access" value="tenant" />
          <label htmlFor="tenant">Tenant</label>
          <br />
          <input type="radio" id="owner" name="access" value="owner" />
          <label htmlFor="owner">Owner</label>
          <br />
        </div>

        <div className="buttons">
          <Link to="/login" className="login_link">
            <button>LOG-IN</button>
          </Link>
          <button onClick={handleSignup}>SIGN-UP</button>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;

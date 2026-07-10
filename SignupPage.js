import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function SignupPage({ setRole }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setSelectedRole] = useState("tenant");

  const handleSignup = (e) =>
  {
    e.preventDefault();
    if ( !username.trim() || !email.trim() || !password.trim())
    {
      alert("Please fill in all fields.");
      return;
    }

    setRole(role);

    if (role === "owner")
    {
      navigate("/cardmaker");
    }
    else
    {
      navigate("/tenantview");
    }
  };

  return (
    <div className="heading">
      <h1 className="title">SIGN UP</h1>
      <form className="sign_up_form" onSubmit={handleSignup}>
        <div className="username1">
          <label>Username</label>
          <input type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className="email1">
          <label>Email</label>
          <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="password1">
          <label>Password</label>
          <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="radio">
          <p>Select access level:</p>
          <label>
            <input type="radio" name="role" value="tenant" checked={role === "tenant"} onChange={(e) => setSelectedRole(e.target.value)}/>
            Tenant
          </label>
          <br />
          <label>
            <input type="radio" name="role" value="owner" checked={role === "owner"} onChange={(e) => setSelectedRole(e.target.value)}/>
            Owner
          </label>
        </div>
        <div className="buttons">
          <Link to="/login">
            <button type="button">LOG IN</button>
          </Link>
          <button type="submit">SIGN UP</button>
        </div>
      </form>
    </div>
  );
}

export default SignupPage;

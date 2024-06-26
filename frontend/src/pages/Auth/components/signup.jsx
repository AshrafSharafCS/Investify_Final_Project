import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup({ onToggle }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      if (password == confirmPassword) {
        const data = {
          first_name: firstname,
          last_name: lastname,
          email: email,
          password: password,
          role_id: 3,
        };

        const res = await axios.post(
          "http://127.0.0.1:8000/api/register",
          data
        );
        if (res.status !== 200) {
          setError("Error, try again later!");
        } else {
          localStorage.setItem("token", res.data.authorisation.token);
          navigate("/user");
        }
      } else {
        setError("Passwords don't match.");
      }
    } catch (error) {
      setError("Error, try again later!");
    }
  };
  return (
    <div className="flex bg-secondary main-container">
      <div className="flex column center signup greeting-section">
        <div className="flex center column greeting around ">
          <h1>Welcome To Investify</h1>
          <p>Register with your personal details to use all of site featuers</p>
          <img src="/images/signup-img.png" className="login-img"></img>
          <button className="auth-button" onClick={() => onToggle()}>
            Login
          </button>
        </div>
      </div>
      <div className="flex column center auth-section">
        <div className="flex column between center  auth-form ">
          <h1>Sign Up</h1>
          <div className="flex full-w column center gap-10 auth-form-inputs">
            <input
              type="email"
              className="auth-inputs"
              placeholder="First Name"
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
              required
            ></input>
            <input
              type="email"
              className="auth-inputs"
              placeholder="Last Name"
              onChange={(e) => {
                setLastname(e.target.value);
              }}
              required
            ></input>
            <input
              className="auth-inputs"
              placeholder="E-mail"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
            <input
              type="password"
              className="auth-inputs"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
            <input
              type="password"
              className="auth-inputs"
              placeholder="Confirm Password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            ></input>
          </div>
          <div>
          <button
            className="auth-button"
            onClick={() => {
              registerUser();
            }}
          >
            Sign Up
          </button>
          </div>
        </div>
      </div>
      {error && (
        <div className="error-message flex center column gap-20">
          {error}
          <button
            className="error-messge-button"
            onClick={() => {
              setError(null);
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default Signup;

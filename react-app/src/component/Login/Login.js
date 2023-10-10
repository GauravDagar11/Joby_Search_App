import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Login = (props) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const jwtToken = sessionStorage.getItem("jwt");
    if (jwtToken !== null) {
      const { history } = props;
      history.push("/");
    }
  }, []);

  const fetchData = async () => {
    // This is for the real-time login through the server.

    /*{const url = "http://localhost:5000/serverlogin";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    const result = await response.json();
    if (response.ok) {
      sessionStorage.setItem("jwt", result.jwt);
      const { history } = props;
      history.replace("/");
    } else {
      setPasswordError(result.error);
    }}*/

    // Whithout Server Login

    if (data.email === "gaurav@gmail.com" && data.password === "gaurav123") {
      sessionStorage.setItem("jwt", "JWT_TOKEN");
      const { history } = props;
      history.replace("/");
    } else {
      setPasswordError("Invalid Details");
    }
  };

  // Form Validation
  const validateForm = () => {
    if (data.email === "") {
      setEmailError("Required");
    } else {
      setEmailError("");
    }
    if (data.password === "") {
      setPasswordError("Required");
    } else {
      setPasswordError("");
    }
    if (data.email !== "" && data.password !== "") {
      fetchData();
    }
  };

  const formEl = (event) => {
    event.preventDefault();
    validateForm();
  };
  return (
    <div className="login-bg">
      <div>
        <h1 className="logo-name">Dream Jobs</h1>
        <p className="company-motto">
          Find the perfect job match according to your skills
        </p>
      </div>
      <form className="login-form" onSubmit={formEl}>
        <input
          type="email"
          placeholder="Email"
          className="input"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <p className="error-msg">{emailError}</p>
        <input
          type="password"
          placeholder="Password"
          className="input"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <p className="error-msg">{passwordError}</p>
        <button type="submit" className="login-btn">
          Log In
        </button>
        <p className="dont-ac-para">Don't have an account ?</p>
        <Link to="/signup" className="link-btn">
          <button type="button" className="signup-btn">
            Sign Up
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Login;

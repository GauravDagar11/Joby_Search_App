import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { PhoneNumberUtil } from "google-libphonenumber";
import "./index.css";
import { Link } from "react-router-dom";

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

const SignUp = (props) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [phone, setPhone] = useState("");
  const isValid = isPhoneValid(phone);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [numberError, setNumberError] = useState("");

  useEffect(() => {
    const jwtToken = sessionStorage.getItem("jwt");
    if (jwtToken !== null) {
      const { history } = props;
      history.push("/");
    }
  }, []);

  const uploadData = async () => {
    const url = "http://localhost:5000/serverregistration";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: uuidv4(),
        name: data.name,
        email: data.email,
        number: phone,
        password: data.password,
      }),
    };
    const response = await fetch(url, options);
    const result = await response.json();
    if (response.ok) {
      sessionStorage.setItem("jwt", result.jwt);
      const { history } = props;
      history.replace("/");
    } else {
      console.log(result);
    }
  };

  const validateForm = () => {
    if (data.name === "") {
      setNameError("Required");
    } else {
      setNameError("");
    }
    if (data.email === "") {
      setEmailError("Required");
    } else {
      setEmailError("");
    }
    if (isValid === false) {
      setNumberError("Required");
    } else {
      setNumberError("");
    }
    if (data.password === "") {
      setPasswordError("Required");
    } else {
      setPasswordError("");
    }

    if (
      data.name !== "" &&
      data.email !== "" &&
      data.password !== "" &&
      isValid === true
    ) {
      uploadData();
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
      <form className="login-form signup-form" onSubmit={formEl}>
        <input
          type="text"
          placeholder="Full Name"
          className="input"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <p className="error-msg">{nameError}</p>
        <input
          type="email"
          placeholder="Email"
          className="input"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <p className="error-msg">{emailError}</p>
        <PhoneInput
          inputClassName="phone-input"
          defaultCountry="in"
          value={phone}
          onChange={(phone) => setPhone(phone)}
        />
        <p className="error-msg">{numberError}</p>
        <input
          type="password"
          placeholder="Password"
          className="input"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <p className="error-msg">{passwordError}</p>
        <button type="submit" className="signup-btn">
          Sign Up
        </button>
        <p className="dont-ac-para">Already have an account ?</p>
        <Link to="/login" className="link-btn">
          <button type="button" className="login-btn">
            Log In
          </button>
        </Link>
      </form>
    </div>
  );
};

export default SignUp;

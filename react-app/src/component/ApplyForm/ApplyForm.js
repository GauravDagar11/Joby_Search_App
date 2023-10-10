import { useState, useEffect } from "react";
import "./index.css";

const ApplyForm = (props) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    coverLetter: "",
  });
  const [nameError, setNameError] = useState("");
  const [emailError, setEmalError] = useState("");

  useEffect(() => {
    const jwtToken = sessionStorage.getItem("position");
    if (jwtToken === null) {
      const { history } = props;
      history.replace("/");
    }
  }, []);

  const validateData = () => {
    if (userDetails.name === "") {
      setNameError("Required");
    } else {
      setNameError("");
    }
    if (userDetails.email === "") {
      setEmalError("Required");
    } else {
      setEmalError("");
    }
    if (userDetails.name !== "" && userDetails.email !== "") {
      const { history } = props;
      history.replace("/sucessfully-applied");
    }
    sessionStorage.setItem("details", JSON.stringify(userDetails));
  };

  const formEl = (event) => {
    event.preventDefault();
    validateData();
  };

  return (
    <div className="apply-bg">
      <form className="apply-now-form" onSubmit={formEl}>
        <h1 className="apply-now-heading">Apply Now</h1>
        <div>
          <input
            type="text"
            placeholder="Name"
            className="input apply-input"
            onChange={(e) =>
              setUserDetails({ ...userDetails, name: e.target.value })
            }
          />
          <p className="error-msg">{nameError}</p>
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            className="input apply-input"
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
          />
          <p className="error-msg">{emailError}</p>
        </div>
        <textarea
          rows={5}
          cols={45}
          className="text-area"
          placeholder="Cover Letter"
          onChange={(e) =>
            setUserDetails({ ...userDetails, coverLetter: e.target.value })
          }
        ></textarea>
        <div className="resume-div">
          <p>Upload Resume</p>
          <input type="file" />
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ApplyForm;

import { useState } from "react";
import "./index.css";
import { HiOutlineArrowRight } from "react-icons/hi";

const Home = (props) => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const searchButton = () => {
    if (search === "") {
      setError("Please search for your skill");
    } else {
      setError("");
    }

    if (search !== "") {
      sessionStorage.setItem("skill", search);
      const { history } = props;
      history.push("/jobs");
    }
  };

  return (
    <div className="home-bg">
      <h1 className="search-heading">Search For Your Skills Here</h1>
      <div>
        <div className="skils-input-div">
          <input
            type="text"
            placeholder="Search"
            className="skills-search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search-icon-btn" onClick={searchButton}>
            <HiOutlineArrowRight />
          </button>
        </div>
        <p className="error-msg">{error}</p>
      </div>
    </div>
  );
};

export default Home;

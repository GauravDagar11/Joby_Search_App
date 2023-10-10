import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BounceLoader from "react-spinners/BounceLoader";
import { MdLocationOn } from "react-icons/md";
import "./index.css";

const apiStatus = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  loading: "Loading",
};

const Jobs = () => {
  const [api, setApi] = useState(apiStatus.initial);
  const [data, setData] = useState([]);
  const fetchData = async () => {
    setApi(apiStatus.loading);
    const searchedInput = sessionStorage.getItem("skill");
    const url = `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=7f1998fc&app_key=8ded8d7103a9a9d14c43b4c3b9133efc&what_phrase=${searchedInput}`;

    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
    if (response.ok) {
      setApi(apiStatus.success);
      console.log(result.results);
      setData(result.results);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderLoadingView = () => (
    <div className="jobs-bg">
      <BounceLoader color="#ffffff" />
    </div>
  );

  const renderSuccessView = () => (
    <div className="jobs-bg">
      <ul className="jobs-ul">
        {data.map((eachItem) => {
          return (
            <Link to={`/job/${eachItem.id}`} className="jobs-link">
              <li className="jobs-li">
                <div>
                  <h1 className="jobs-title">{eachItem.title}</h1>
                  <p className="jobs-company-name">
                    {eachItem.company.display_name}
                  </p>
                </div>
                <div className="jobs-location-div">
                  <MdLocationOn color="blue" />
                  <p className="jobs-location">
                    {eachItem.location.display_name}
                  </p>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );

  const renderSwitchView = () => {
    switch (api) {
      case apiStatus.loading:
        return renderLoadingView();
      case apiStatus.success:
        return renderSuccessView();
    }
  };

  return (
    <div className="jobs-upper-bg">
      <h1 className="jobs-heading">Jobs that matches your skills</h1>
      {renderSwitchView()}
    </div>
  );
};

export default Jobs;

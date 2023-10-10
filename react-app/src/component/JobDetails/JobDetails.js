import { useEffect, useState } from "react";
import BounceLoader from "react-spinners/BounceLoader";
import "./index.css";

const apiStatus = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  loading: "Loading",
};

const JobDetails = (props) => {
  const [api, setApi] = useState(apiStatus.initial);
  const [data, setData] = useState({});
  const fetchData = async () => {
    setApi(apiStatus.loading);
    const { match } = props;
    const { params } = match;
    const { id } = params;
    const searchedInput = sessionStorage.getItem("skill");
    const url = `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=7f1998fc&app_key=8ded8d7103a9a9d14c43b4c3b9133efc&what_phrase=${searchedInput}`;

    const response = await fetch(url);
    const result = await response.json();
    if (response.ok) {
      const filteredResult = result.results.filter((eachItem) => {
        if (eachItem.id === id) {
          return eachItem;
        }
        return false;
      });
      console.log(filteredResult[0]);
      setData(filteredResult[0]);
      setApi(apiStatus.success);
      sessionStorage.setItem("position", filteredResult[0].title);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const applyButton = () => {
    const { history } = props;
    history.push("/apply-now");
  };

  const renderLoadingView = () => (
    <div className="jobs-bg">
      <BounceLoader color="#ffffff" />
    </div>
  );

  const renderSuccessView = () => (
    <div className="jobs-bg jobdetails-bg">
      <h1 className="job-details-title">{data.title}</h1>

      <div>
        <p>{`Company: ${data.company.display_name}`}</p>
        <p>{`${data.contract_time} : ${data.contract_type}`}</p>
        <p>{`Location : ${data.location.display_name}`}</p>
        <hr className="line" />
        <p>{data.description}</p>
      </div>
      <button className="apply-btn" onClick={applyButton}>
        Apply Now
      </button>
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
      <h1 className="jobs-heading">Job Details</h1>
      {renderSwitchView()}
    </div>
  );
};

export default JobDetails;

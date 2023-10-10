import "./index.css";

const Success = (props) => {
  let parsedValue = "";
  if (sessionStorage.getItem("details") === null) {
    const { history } = props;
    history.replace("/");
  } else {
    const userValue = sessionStorage.getItem("details");
    parsedValue = JSON.parse(userValue);
  }
  return (
    <div className="success-bg">
      <div>
        <img
          src="https://www.clearsteps.com/wordpress/wp-content/uploads/2017/12/Green-Check.png"
          className="success-img"
          alt="success"
        />
      </div>
      <h1 className="success-heading">{`You have been successfully applied for the ${sessionStorage.getItem(
        "position"
      )}.`}</h1>
      <form className="success-form">
        <input readOnly value={parsedValue.name} className="success-input" />
        <input readOnly value={parsedValue.email} className="success-input" />
        <textarea
          rows={4}
          cols={40}
          readOnly
          placeholder="Cover Letter"
          className="success-text-area"
        ></textarea>
      </form>
    </div>
  );
};

export default Success;

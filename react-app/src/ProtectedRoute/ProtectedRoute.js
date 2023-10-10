import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = (props) => {
  if (sessionStorage.getItem("jwt") === null) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} />;
};

export default ProtectedRoute;

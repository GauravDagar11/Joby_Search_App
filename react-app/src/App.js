import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./component/Login/Login";
import SignUp from "./component/SignUp/SignUp";
import Home from "./component/Home/Home";
import Jobs from "./component/Jobs/Jobs";
import JobDetails from "./component/JobDetails/JobDetails";
import ApplyForm from "./component/ApplyForm/ApplyForm";
import Success from "./component/Success/Success";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/job/:id" component={JobDetails} />
      <ProtectedRoute exact path="/apply-now" component={ApplyForm} />
      <ProtectedRoute exact path="/sucessfully-applied" component={Success} />
    </Switch>
  </BrowserRouter>
);

export default App;

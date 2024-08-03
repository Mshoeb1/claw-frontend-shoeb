import { Route, Switch, Redirect } from "react-router-dom";
import signUp from "./components/signUp";
import Login from "./components/Login";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

const App = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={signUp} />
      <ProtectedRoute exact path="/" component={Home} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  );
};

export default App;

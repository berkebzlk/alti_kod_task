import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./containers/Dashboard";
import Login from "./containers/Login";
import Register from "./containers/Register";
import PrivateRoute from "./containers/PrivateRoute";
import CSRFToken from "./components/CSRFToken";

function Berke() {
  return <div>BERKE BERKE BERKE BERKE BERKE</div>;
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/berke" element={<Berke />} />
        <Route exact path="/dashboard" element={<PrivateRoute />}>
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route exact path="/csrf" element={<CSRFToken />} />
      </Routes>
    </Router>
  );
};

export default App;

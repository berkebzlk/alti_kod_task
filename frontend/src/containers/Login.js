import React, { useState } from "react";
import CSRFToken from "../components/CSRFToken";
import { login } from "../actions";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(username, password);

      if (data.success === "User authenticated") {
        window.location.replace(`${process.env.REACT_APP_API_URL}/dashboard`);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleOnchange = (e) => {
    let name = e.target.name;

    if (name === "username") {
      setUsername(e.target.value);
    } else if (name === "password") {
      setPassword(e.target.value);
    }
  };

  return (
    <form className="w-25 ps-5 pt-5 pe-5 pb-2 border border-1 bg-light position-absolute top-50 start-50 translate-middle">
      <h2 className="text-center mb-5">Log In</h2>
      <CSRFToken />
      <div className="">
        <p>Username: </p>
        <input
          className="form-control mb-1"
          onChange={handleOnchange}
          type="text"
          name="username"
          id="username"
        />
      </div>
      <div className="">
        <p>Password: </p>
        <input
          className="form-control mb-3"
          onChange={handleOnchange}
          type="text"
          name="password"
          id="password"
        />
      </div>
      <div className="text-center mb-3">
        <button className="btn btn-primary" onClick={handleLogin}>
          Log in
        </button>
      </div>
      <div>
        <div className="text-end">
          <Link className="fs-6" to="/register">
            No account? Register now!
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Login;

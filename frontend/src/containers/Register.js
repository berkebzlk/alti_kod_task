import React, { useState } from "react";
import { register } from "../actions";
import CSRFToken from "../components/CSRFToken";
import { Link } from "react-router-dom";

const Register = ({ getCookie }) => {
  const [email, setEmail] = useState(null);
  const [password1, setPassword1] = useState(null);
  const [password2, setPassword2] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      if (password1 === password2) await register(email, password1, password2);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleOnchange = (e) => {
    let name = e.target.name;

    if (name === "email") {
      setEmail(e.target.value);
    } else if (name === "password1") {
      setPassword1(e.target.value);
    } else if (name === "password2") {
      setPassword2(e.target.value);
    }
  };

  return (
    <form className="w-25 ps-5 pt-5 pe-5 pb-2 border border-1 bg-light position-absolute top-50 start-50 translate-middle">
      <h2 className="text-center mb-5">Registration</h2>
      <CSRFToken />
      <div className="">
        <p>Username: </p>
        <input
          className="form-control mb-1"
          onChange={handleOnchange}
          type="text"
          name="email"
          id="email"
        />
      </div>
      <div className="">
        <p>Password: </p>
        <input
          className="form-control mb-1"
          onChange={handleOnchange}
          type="text"
          name="password1"
          id="password1"
        />
      </div>
      <div className="">
        <p>Password Again: </p>
        <input
          className="form-control mb-3"
          onChange={handleOnchange}
          type="text"
          name="password2"
          id="password2"
        />
      </div>
      <div className="text-center mb-3">
        <button className="btn btn-primary" onClick={handleRegister}>
          Register
        </button>
      </div>
      <div className="text-end ">
        <Link className="fs-6" to="/login">
          Have an account? Log In
        </Link>
      </div>
    </form>
  );
};

export default Register;

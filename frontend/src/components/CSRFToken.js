import React, { useState, useEffect } from "react";
import { fetchCSRFToken } from "../actions";
import Cookies from "js-cookie";

const CSRFToken = () => {
  const [csrftoken, setcsrftoken] = useState("");

  useEffect(() => {
    fetchCSRFToken()
      .then(() => setcsrftoken(Cookies.get("csrftoken")))
      .catch((e) => console.log(e));
  }, []);

  return <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />;
};

export default CSRFToken;

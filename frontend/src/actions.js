import Cookies from "js-cookie";

export const fetchCSRFToken = async () => {
  try {
    await fetch(`${process.env.REACT_APP_API_URL}/user/get_csrf/`);
    console.log("backend'den csrf token çekildi");
  } catch (e) {
    console.log(
      "Something went wrong when fetching CSRF token from backend 💣💣💣",
      e
    );
  }
};

export const register = async (email, password1, password2) => {
  try {
    const URI = `${process.env.REACT_APP_API_URL}/user/register/`;

    const body = {
      email,
      password1,
      password2,
    };

    const headers = {
      "Content-Type": "application/json",
      accept: "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    };

    const res = await fetch(URI, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    const data = await res.json();

    console.log("register");
    console.log(data);
  } catch (e) {
    console.log("something went wrong when registration", e);
  }
};

export const login = async (username, password) => {
  const URI = `${process.env.REACT_APP_API_URL}/user/login/`;

  const body = {
    username,
    password,
  };

  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
    "X-CSRFToken": Cookies.get("csrftoken"),
  };

  try {
    const res = await fetch(URI, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    const data = await res.json();
    console.log("login");
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

export const isAuthenticated = async () => {
  const URI = `${process.env.REACT_APP_API_URL}/user/authenticated/`;

  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
    "X-CSRFToken": Cookies.get("csrftoken"),
  };

  try {
    const res = await fetch(URI, {
      method: "GET",
      headers,
    });
    const data = await res.json();
    // console.log("isauth2");
    // console.log(data.isAuthenticated);
    console.log(data.isAuthenticated);
    return data.isAuthenticated;
  } catch (e) {
    console.log(e.message);
  }
};

export const getUserInfo = async () => {
  try {
    const URL = `${process.env.REACT_APP_API_URL}/user/`;

    const res = await fetch(URL);

    const data = await res.json();
    console.log(data);
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

export const logout = async () => {
  try {
    const URL = `${process.env.REACT_APP_API_URL}/user/logout/`;

    const headers = {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    };

    const res = await fetch(URL, {
      method: "POST",
      headers,
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

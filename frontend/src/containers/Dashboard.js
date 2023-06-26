import React, { useEffect, useState } from "react";
import { getUserInfo, logout } from "../actions";
import CSRFToken from "../components/CSRFToken";

const Dashboard = () => {
  const [data, setData] = useState(null);

  const init = async () => {
    const data_ = await getUserInfo();
    console.log(data_.logged_user, "datam budur işte");
    setData(data_.logged_user);
  };

  const handleOnClick = async () => {
    const data = await logout();
    if (data.success === "Logged out") {
      window.location.replace(`${process.env.REACT_APP_API_URL}/login`);
    }
  };

  useEffect(() => {
    init();
  }, []);

  if (data == null) return <div>Loading...</div>;
  else {
    return (
      <div>
        <CSRFToken />
        <div className="w-50 ps-5 pt-5 pe-5 pb-2 border border-1 bg-light position-absolute top-50 start-50 translate-middle">
          <div>
            <button onClick={handleOnClick} className="btn btn-primary mb-4">
              Log out
            </button>
          </div>
          <div className="">
            <p>ID: {data.id}</p>
            <p>Date joined: {data.date_joined}</p>
            <p>Email: {data.email}</p>
            <p>Username: {data.username}</p>
          </div>
        </div>
      </div>
    );
  }
};

export default Dashboard;

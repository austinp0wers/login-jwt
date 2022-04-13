import React from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  
  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.email}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substring(currentUser.accessToken.length - 20)}
      </p>
    </div>
  );
};

export default Profile;
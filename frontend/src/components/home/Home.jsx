import React, { useState, useEffect } from "react";

import UserService from "../../services/userService";

const Home = () => {
  const [content, setContent] = useState(new Array);

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        const users = new Array(response.data)
        setContent(users);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);
  console.log(content)
  return (
    <div className="container">
      <header className="jumbotron">
        <ul>
          {content.map(user => (
            <li key={user}>{user.name} & {user.email}</li>
          ))}
        </ul>
      </header>
    </div>
  );
};

export default Home;
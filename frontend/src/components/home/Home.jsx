import React, { useState, useEffect } from "react";

import UserService from "../../services/userService";

const Home = () => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        const users = [response.data.users]
        const userInfo = []
        // Backend 에서 user 들의 정보를 전달할때 더욱 풀어서 사용 하기 쉽게 보내야 겠다.
        users.map(user => {
          user.map(one => {
            userInfo.push({ email : one.email, name: one.name })
          })
        })
        setContent([...userInfo]);
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
  return (
    <div className="container">
      <header className="jumbotron">
        <ul>
          {content.map(user => (
            <li key={user.name}>name : {user.name} <br></br> email : {user.email}</li>
          ))}
        </ul>
      </header>
    </div>
  );
};

export default Home;
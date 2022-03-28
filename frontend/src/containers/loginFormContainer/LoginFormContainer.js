import React from "react";
import { useEffect } from "react";
import Home from "../../components/home/Home";

const LoginFormContainer = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        console.log(response.data.users);
        setContent(response.data.users);
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

  return <Home content={content} />;
};

export default React.memo(LoginFormContainer);

import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(userInfo);
    if (userInfo) setUser(userInfo.data);

    if (!userInfo) {
      navigate("/");
    }

    if (userInfo) navigate("/home");
  }, [navigate]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        notification,
        setNotification,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserState = () => {
  return useContext(UserContext);
};

export default ChatProvider;

import axios from "axios";
import { createContext } from "react";

const AxiosContext = createContext();

export default AxiosContext;

export const AxiosProvider = ({ children }) => {
  const Request = async (url, method, data) => {
    try {
      const res = await axios({
        url: process.env.REACT_APP_API + url,
        method: method,
        data: data,
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <AxiosContext.Provider
      value={{
        Request,
      }}
    >
      {children}
    </AxiosContext.Provider>
  );
};

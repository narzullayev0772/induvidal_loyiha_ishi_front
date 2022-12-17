import axios from "axios";
import { createContext, useState } from "react";

const AxiosContext = createContext();

export default AxiosContext;

export const AxiosProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const Request = async (url, method, data) => {
    setLoading(true);
    try {
      const res = await axios({
        url: process.env.REACT_APP_API + url,
        method: method,
        data: data,
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      setLoading(false);
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <AxiosContext.Provider
      value={{
        Request,
        loading,
      }}
    >
      {children}
    </AxiosContext.Provider>
  );
};

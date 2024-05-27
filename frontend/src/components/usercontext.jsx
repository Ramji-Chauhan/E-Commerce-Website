import React, { useState, createContext } from "react";
export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [userinfo, setuserinfo] = useState({ userid: null, cartid: null });
  return (
    <UserContext.Provider value={{ userinfo, setuserinfo }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;

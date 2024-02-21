"use client";
import axios from "axios";
import React, { PropsWithChildren, createContext, useState } from "react";

interface ICreateUserContext {
  getCustomers: () => void;
  customers: any;
}
export const userContext = createContext<ICreateUserContext>({
  getCustomers: () => {},
  customers: {},
});

const UserProvider = ({ children }: PropsWithChildren) => {
  const [customers, setCustomers] = useState([]);
  const getCustomers = async () => {
    try {
      const data = await axios
        .get("http://localhost:8080/users")
        .then((res) => res.data);
      setCustomers(data.users);
    } catch (error) {
      console.log("Error in getUsers FUNCTION!", error);
    }
  };
  return (
    <userContext.Provider value={{ getCustomers, customers }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;

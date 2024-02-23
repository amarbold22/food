"use client"

import React, { PropsWithChildren, useState,createContext } from 'react'
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from 'react-toastify'

interface IUser{
    name: string,
    email: string,
    address: string,
    password?: string
}

interface IUserContext {
    user: IUser;
    login: (name: string, password: string) => void;
    signup: (email: string, password: string, address: string, name: string) => void;
    verify: () => void;
    handleOpenDrawer: () => void;
    handleCloseDrawer: () => void;
}

export const UserContext = createContext<IUserContext>({
    user: {
        name: "",
        email: "",
        address: ""
    },
    login: () => {

    },
    signup: () => {

    },
    verify: () => {

    },
    handleOpenDrawer: () => {},
    handleCloseDrawer: () => {}, 
})

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [drawer, setDrawer] = useState(false);
    const handleOpenDrawer = () => setDrawer(true);
    const handleCloseDrawer = () => setDrawer(false);
  const router = useRouter();
    const [user, setUser] = useState<IUser>({
        name: "Text User",
        email: "",
        address: "",
        password: ""
    });

    const login = async (email: string, password: string) => {
      try {
        const { data } = await axios.post("http://localhost:8080/auth/login", {
        email: email,
        password: password
      });
      router.push("/");
      console.log(data);
      } catch (error) {
        console.log(error);
        toast.error("Login хийх үед алдаа гарлаа"); 
      }
    }

    const signup = async (email: string, password: string, address: string, name: string) => {
      try {
        const data = await axios.post("http://localhost:8080/auth/signup", {
          email: email,
          password: password,
          address: address,
          name: name
        });
        router.push("/verify");
        console.log(data);
      } catch (error) {
        console.log(error);
        toast.error("Signup хийх үед алдаа гарлаа");
      }
    }

    const verify = () => {
      try {
        console.log("Verify working");
      } catch (error) {
        toast.error("Verification is not working");
      }
    }

  return (
    <UserContext.Provider value={{ user, login, signup, verify, handleOpenDrawer, handleCloseDrawer, drawer, setDrawer }}>
      {children}
    </UserContext.Provider>
  )
};
"use client"

import React, { PropsWithChildren, useState,createContext, useEffect } from 'react'
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from 'react-toastify'

interface IUser{
    name: string,
    email: string,
    address: string,
    password?: string
}

interface ISignUpUserInfo{
    name: string;
    email: string;
    password: string;
    address: {
      duureg: string;
      horoo: string;
    };
}

interface IUserContext {
    user: any;
    userInfo: IUser;
    signUpInfo: ISignUpUserInfo;
    login: (name: string, password: string) => void;
    signup: (email: string, password: string, address: string, name: string) => void;
    logout: () => void;
    verify: () => void;
    savedToken: any;
}

export const UserContext = createContext<IUserContext>({} as IUserContext)

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<object | null>(null);
  const [savedToken, setSavedToken] = useState("");
  const router = useRouter();
    const [userInfo, setUserInfo] = useState<IUser>({
        name: "",
        email: "",
        address: "",
        password: ""
    });
    const [signUpInfo, setSignupInfo] = useState({
      name: "",
      email: "",
      password: "",
      address: {
        duureg: "",
        horoo: "",
      },
    });

    const login = async (email: string, password: string) => {
      try {
        const { data: {
          token, user
        } } = await axios.post("http://localhost:8080/auth/login", {
        email: email,
        pass: password
      });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setSavedToken(token);
      console.log("Nevterlee", user, token);
      router.replace("/");
     
      } catch (error) {
        console.log(error);
        toast.error("Login хийх үед алдаа гарлаа"); 
      }
    }

    const checkToken = () => {
      const tokenCheck = localStorage.getItem("token")!;
      const userCheck = JSON.parse(localStorage.getItem("user")!);
      if(tokenCheck){
        console.log("tokenfirst", tokenCheck);
        setUser(userCheck);
        setSavedToken(tokenCheck);
      }
    }
    
    useEffect(() => {
      checkToken();
    }, []);

    const signup = async (email: string, password: string, name: string) => {
      try {
        const data = await axios.post("http://localhost:8080/auth/signup", {
          email: email,
          password: password,
          name: name,
          address: signUpInfo.address
        });
        router.push("/");
        console.log(data);
      } catch (error) {
        console.log(error);
        toast.error("Signup хийх үед алдаа гарлаа");
      }
    }

    const logout = () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      setSavedToken("");
    }

    const verify = () => {
      try {
        console.log("Verify working");
      } catch (error) {
        toast.error("Verification is not working");
      }
    }

  return (
    <UserContext.Provider value={{ user, userInfo, signUpInfo, login, signup, logout, verify, savedToken }}>
      {children}
    </UserContext.Provider>
  )
};
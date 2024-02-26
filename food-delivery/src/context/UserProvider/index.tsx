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
    token: any;
}

export const UserContext = createContext<IUserContext>({} as IUserContext)

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<object | null>(null);
  const [token, setToken] = useState<object | null>(null);
  const [loading, setLoading] = useState(false);
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
        setLoading(true);
        const { data: {
          token, user
        } } = await axios.post("http://localhost:8080/auth/login", {
        email: email,
        pass: password
      });
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("user", JSON.stringify(user));

      console.log("Nevterlee", user, token);
      router.replace("/");
      } catch (error) {
        console.log(error);
        toast.error("Login хийх үед алдаа гарлаа"); 
      }
      finally {
        setLoading(false);
      }
    }
    const checkToken = () => {
      if(localStorage.getItem("token")){
        setUser(JSON.parse(localStorage.getItem("user")!));
        setToken(JSON.parse(localStorage.getItem("token")!));
      }
      console.log("checkToken worked");
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
      setToken(null);
    }

    const verify = () => {
      try {
        console.log("Verify working");
      } catch (error) {
        toast.error("Verification is not working");
      }
    }

  return (
    <UserContext.Provider value={{ user, userInfo, signUpInfo, login, signup, logout, verify, token }}>
      {children}
    </UserContext.Provider>
  )
};
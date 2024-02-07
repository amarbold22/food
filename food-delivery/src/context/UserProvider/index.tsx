"use client"

import React, { PropsWithChildren, useState,createContext } from 'react'
import router from "next/router"
import axios from "axios"


interface IUser{
    name: string,
    email: string,
    address: string,
    password?: string
}

interface IUserContext {
    user: IUser;
    login: (name: string, password: string) => void;
    signup: (email: string, password: string) => void;
}

export const UserContext = createContext<IUserContext>({
    user: {
        name: "",
        email: "",
        address: ""
    },
    login: function(){

    },
    signup: function(){

    }
})

export const UserProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<IUser>({
        name: "Text User",
        email: "",
        address: "",
        password: ""
    });

    const login = (email: string, password: string) => {

    }

    const signup = async (email: string, password: string,  ) => {
      try {
        const data = await axios.post("http://localhost:8000/auth/signup", {
          email: email,
          password: password,
        })
        router.push("/");
        console.log(data);
      } catch (error) {
        
      }
    }

  return (
    <UserContext.Provider value={{ user, login, signup }}>
      {children}
    </UserContext.Provider>
  )
};
"use client"

import React, { PropsWithChildren, useState,createContext } from 'react'


interface IUser{
    name: string,
    email: string,
    address: string,
    password?: string
}

interface IUserContext {
    user: IUser;
    login: (name: string, password: string) => void;
}

export const UserContext = createContext<IUserContext>({
    user: {
        name: "",
        email: "",
        address: ""
    },
    login: function(){

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

  return (
    <UserContext.Provider value={{ user, login }}>
      {children}
    </UserContext.Provider>
  )
};
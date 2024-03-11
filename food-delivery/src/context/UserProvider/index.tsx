"use client"

import React, { PropsWithChildren, useState,createContext, useEffect, useContext } from 'react'
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from 'react-toastify'
import { basketContext } from '../BasketProvider'

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
    order: (duureg: string, horoo: string, buildingNo: string, info: string, phoneNumber: string, method: string) => Promise<void>;
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
        const { data: {userInfo, token}} = await axios.post("http://localhost:8080/auth/signup", {
          email: email,
          password: password,
          name: name,
          address: signUpInfo.address
        });
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userInfo));
        setUser(userInfo);
        setSavedToken(token);
        router.replace("/");
        // console.log(data);
      } catch (error) {
        console.log(error);
        toast.error("Signup хийх үед алдаа гарлаа");
      }
    }

    const order = async (duureg: string, horoo: string, buildingNo: string, info: string, phoneNumber: string, method: string) => {
      const { basketFoods } = useContext(basketContext);
      console.log(basketFoods, "basketFoods");

      let orderInfo = {
        orderNo: "#" + Math.floor(Math.random() * 10000),
        foods: basketFoods,
        payment: {
          paymentAmount: basketFoods.totalPrice,
          method: "",
        },
        address: {
          khoroo: "",
          duureg: "",
          buildingNo: "",
          info: "",
        },
        phoneNumber: "",
      };
      orderInfo.address.duureg = duureg;
      orderInfo.address.khoroo = horoo;
      orderInfo.address.buildingNo = buildingNo;
      orderInfo.address.info = info;
      orderInfo.payment.method = method;
      orderInfo.phoneNumber = phoneNumber;
      try {
        const { data : { message }} = await axios.post(`http://localhost:8080/order`, {orderInfo: orderInfo} , {
          headers: {
            Authorization: `Bearer ${savedToken}`
          }
        });
          toast.error(message);
      } catch (error) {
        console.log(error, "error");
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
    <UserContext.Provider value={{ user, userInfo, signUpInfo, login, signup, logout, verify, order, savedToken }}>
      {children}
    </UserContext.Provider>
  )
};
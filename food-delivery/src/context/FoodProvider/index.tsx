"use client"

import React, { PropsWithChildren, useState,createContext } from 'react'
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from 'react-toastify'

interface ICreateFoodContext {
    getFoods: () => Promise<void>;
    foods: IFood[];
  }
  interface IFood {
    _id: string;
    price: string;
    name: string;
    description: string;
  }
  export const foodContext = createContext<ICreateFoodContext>(
    {} as ICreateFoodContext
  );

export const FoodProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
    const [ foods, setFoods ] = useState([]);
    const getFoods = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/foods");
            console.log(data);
            setFoods(data.foods);
        } catch (error) {
            console.log("Error in getFoods FUNC");
        }
    }
  return (
    <foodContext.Provider value={{ getFoods, foods }}>
      {children}
    </foodContext.Provider>
  )
};
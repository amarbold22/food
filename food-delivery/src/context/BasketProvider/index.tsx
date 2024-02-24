"use client"

import React, { PropsWithChildren, useState, createContext, useContext } from 'react'
import { useRouter } from "next/navigation"
import axios from "axios"
import { UserContext } from '../UserProvider';

interface ICreateBasketContext {
    getUserBasketFoods: () => Promise<void>;
    addBasketItem: (foodId: string, count: number) => void;
    deleteBasketItem: () => void;
    basketFoods: any;
  }

  export const basketContext = createContext<ICreateBasketContext>(
    {} as ICreateBasketContext
  );

export const BasketProvider = ({ children }: PropsWithChildren) => {
    const [basketFoods, setBasketFoods] = useState([]);
    const { user } = useContext(UserContext);

  const getUserBasketFoods = async () => {
    try {
        if(user){
            const data = await axios.get(`http://localhost:8080/basket/${user}`).then((res) => res.data);
            console.log(data);
        }
    } catch (error) {
        console.log("Error in getUserBasketFoods func");
    }
  }

  const addBasketItem = async () => {
    try {
        
    } catch (error) {
        
    }
  }

  const deleteBasketItem = async () => {
    try {
        
    } catch (error) {
        
    }
  }

  return (
    <basketContext.Provider value={{ getUserBasketFoods, basketFoods, addBasketItem, deleteBasketItem, }}>
      {children}
    </basketContext.Provider>
  )
};
"use client"

import React, { PropsWithChildren, useState, createContext, useContext, useEffect } from 'react'
import axios from "axios"
import { UserContext } from '../UserProvider';
import { toast } from 'react-toastify';

interface IBasketContext {
    getUserBasketFoods: () => Promise<void>;
    addBasketItem: (food: {}) => Promise<void>;
    deleteBasketItem: (value: string) => Promise<void>;
    updateBasketItem: (food: {}) => Promise<void>;
    basketFoods: any;
  }

  export const basketContext = createContext<IBasketContext>(
    {} as IBasketContext
  );

export const BasketProvider = ({ children }: PropsWithChildren) => {
    const { savedToken } = useContext(UserContext);
    const [basketFoods, setBasketFoods] = useState<{} | null>(null);;
    const [refresh, setRefresh] = useState(false);
    const { user } = useContext(UserContext);

  const getUserBasketFoods = async () => {
    try {
        if(user){
          const { data: {
            basket: {foods}
          } } = await axios.get(`http://localhost:8080/basket`, {
            headers: {
              Authorization: `Bearer ${savedToken}`
            }
          });
          console.log("DAATAA", foods);
          setBasketFoods(foods);
        }
    } catch (error: any) {
        toast.error(error.response.data.message);
    }
  }

  const addBasketItem = async (food: any) => {
    try {
      const { data: { basket: {foods}, message} } = await axios.post(`http://localhost:8080/basket`, food, {
            headers: {
              Authorization: `Bearer ${savedToken}`
            }
      });
      setBasketFoods(foods);
      toast.success(message);
    } catch (error) {
        console.log("Error in addBasketfunc", error);
    }
  }

  const updateBasketItem = async (food: any) => {
    try {
      const { data: {basket, message}} = await axios.post(`http://localhost:8080/basket`, food, {
        headers: {
          Authorization: `Bearer ${savedToken}`
        }
      });
      await setBasketFoods(basket);
      toast.success(message);
    } catch (error) {
      console.log("Eroooor in updateBasket", error);
    }
  }

  const deleteBasketItem = async (food: any) => {
    try {
        if(user){
          const { data: {
            basket: {foods}
          } } = await axios.delete(`http://localhost:8080/basket/` + food, {
            headers: { Authorization:`Bearer ${savedToken}`}
          });
          setBasketFoods(foods);
        }
    } catch (error) {
        console.log("Error in DeleteBasketFunc", error);
    }
  }
  useEffect(() => {
    if(user){
      getUserBasketFoods();
    }
  }, [user]);

  return (
    <basketContext.Provider value={{ getUserBasketFoods, basketFoods, addBasketItem, deleteBasketItem, updateBasketItem }}>
      {children}
    </basketContext.Provider>
  )
};
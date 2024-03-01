"use client"

import React, { PropsWithChildren, useState, createContext, useContext, useEffect } from 'react'
import axios from "axios"
import { UserContext } from '../UserProvider';
import { array } from 'yup';

interface IBasketContext {
    getUserBasketFoods: () => Promise<void>;
    addBasketItem: (food: {}) => Promise<void>;
    updateFoodBasket: (food: {}) => Promise<void>;
    deleteBasketItem: (value: string) => Promise<void>;
    basketFoods: any;
    loading: boolean;
    foodCount: number;
  }

  export const basketContext = createContext<IBasketContext>(
    {} as IBasketContext
  );

export const BasketProvider = ({ children }: PropsWithChildren) => {
    const [foodCount, setFoodCount] = useState(0);
    const { savedToken } = useContext(UserContext);
    const [refresh, setRefresh] = useState(false);
    const [basketFoods, setBasketFoods] = useState<{} | null>(null);;
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);

    console.log("TT", savedToken)

  const getUserBasketFoods = async () => {
    try {
            console.log("Basket token", savedToken);
            const { data: {basket} } = await axios.get(`http://localhost:8080/basket`, {
              headers: {
                Authorization: `Bearer ${savedToken}`
              }
            });
            console.log("DAATAA", basket.foods);
             setFoodCount(basket.foods.length);
            setBasketFoods(basket.foods);
            console.log("basketfoods =====>", basketFoods);
    } catch (error) {
        console.log("Error in getUserBasketFoods func", error);
    }
  }

  const addBasketItem = async (food: any) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`http://localhost:8080/basket`, food, {
            headers: {
              Authorization: `Bearer ${savedToken}`
            }
      })
      console.log("hehehhehe", data.foods);
      setBasketFoods(data.foods);
      console.log("aaaaa", basketFoods);
      setLoading(false);
      setRefresh(!refresh);
    } catch (error) {
        console.log("Error in addBasketfunc", error);
    }
  }
  const updateFoodBasket = async (food: any) => {
    try {
      const { data } = await axios.put(`http://localhost:8080/basket`, food);
      setBasketFoods(data.foods);
    } catch (error) {
      console.log("updateFoodBasket func error", error);
    }
  }

  const deleteBasketItem = async (value: any) => {
    try {
      setLoading(true);
        if(user){
          const data = await axios.delete(`http://localhost:8080/basket/` + value, {
            headers: { Authorization:`Bearer ${savedToken}`}
          });
        }
        setLoading(false);
        setRefresh(!refresh)
    } catch (error) {
        console.log("Error in DeleteBasketFunc", error);
    }
  }
  useEffect(() => {
    getUserBasketFoods();
  }, [savedToken]);

  return (
    <basketContext.Provider value={{ foodCount, loading, getUserBasketFoods, updateFoodBasket, basketFoods, addBasketItem, deleteBasketItem }}>
      {children}
    </basketContext.Provider>
  )
};
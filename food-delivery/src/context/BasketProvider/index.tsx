"use client"

import React, { PropsWithChildren, useState, createContext, useContext, useEffect } from 'react'
import axios from "axios"
import { UserContext } from '../UserProvider';
import { array } from 'yup';

interface IBasketContext {
    getUserBasketFoods: () => Promise<void>;
    addBasketItem: (foodId: string, count: number) => Promise<void>;
    deleteBasketItem: () => void;
    basketFoods: any;
    loading: boolean;
    foodCount: number;
  }

  export const basketContext = createContext<IBasketContext>(
    {} as IBasketContext
  );

export const BasketProvider = ({ children }: PropsWithChildren) => {
    const [foodCount, setFoodCount] = useState(0);
    const { token } = useContext(UserContext);
    const [basketFoods, setBasketFoods] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);

  const getUserBasketFoods = async () => {
    try {
        if(user){
            const data = await axios.get(`http://localhost:8080/basket/${user._id}`).then((res) => res.data);
            console.log(data.basket.foods);
            setFoodCount(data.basket.foods.length);
            setBasketFoods(data.basket.foods);
            console.log(basketFoods);
        }
    } catch (error) {
        console.log("Error in getUserBasketFoods func", error);
    }
  }

  const addBasketItem = async (food: any, count: number) => {
    try {
      setLoading(true);
        if(user){
          const data = await axios.put(`http://localhost:8080/basket`, {
            userId: user._id,
            foodId: food._id,
            count: count,
          })
          console.log(data);
          setLoading(false);
          setRefresh(!refresh);
        }
    } catch (error) {
        console.log("Error in addBasketfunc", error);
    }
  }

  const deleteBasketItem = async () => {
    try {
      setLoading(false);
        if(user){
          const data = await axios.delete(`http://localhost:8080/basket`)
          console.log(data);
        }
        setLoading(false);
        setRefresh(!refresh);
    } catch (error) {
        console.log("Error in DeleteBasketFunc", error);
    }
  }
  useEffect(() => {
    getUserBasketFoods();
  }, [refresh, token, user]);

  return (
    <basketContext.Provider value={{ foodCount, loading, getUserBasketFoods, basketFoods, addBasketItem, deleteBasketItem }}>
      {children}
    </basketContext.Provider>
  )
};
"use client";

import React, { PropsWithChildren, useState, createContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import myAxios from "@/utils/axios";

interface ICreateCatContext {
  getCategories: () => void;
  categories: ICategory[];
}
interface ICategory {
  _id: string;
  name: string;
  description: string;
}
export const categoryContext = createContext<ICreateCatContext>(
  {} as ICreateCatContext
);

export const CategoryProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    try {
      const { data } = await myAxios.get("/categories");
      setCategories(data.categories);
    } catch (error) {
      console.log("Error in getCategory FUNC");
    }
  };
  return (
    <categoryContext.Provider value={{ getCategories, categories }}>
      {children}
    </categoryContext.Provider>
  );
};

"use client";
import { SelectChangeEvent } from "@mui/material";
import axios from "axios";
import { array } from "prop-types";
import React, {
  ChangeEvent,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { authContext } from "../authProvider";

interface ICreateFoodContext {
  foods: any;
  getFoods: () => void;
  uploadFoodImage: () => void;
  handleLoading: () => void;
  deleteFood: (foodId: string) => void;
  handleFile: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFoodForm: (e: any) => void;
  foodForm: {
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
  };
  loading: boolean;
}
export const foodContext = createContext({
  foods: [],
  getFoods: () => {},
  uploadFoodImage: () => {},
  handleLoading: () => {},
  deleteFood: (foodId: string) => {},
  handleFoodForm: (e: any) => {},
  handleFile: (e: ChangeEvent<HTMLInputElement>) => {},
  foodForm: {
    name: "",
    price: 0,
    description: "",
    image: "",
    category: "",
  },
  loading: false,
});
const FoodProvider = ({ children }: PropsWithChildren) => {
  const { token } = useContext(authContext);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [foods, setFoods] = useState<any>();
  const [foodForm, setFoodForm] = useState<any>({
    name: "",
    price: 0,
    description: "",
    image: "",
    category: "",
  });

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.currentTarget.files![0]);
  };

  const handleFoodForm = (e: ChangeEvent<HTMLInputElement>) => {
    setFoodForm({ ...foodForm, [e.target.name]: e.target.value });
  };

  const getFoods = async () => {
    try {
      const { foods } = await axios
        .get("http://localhost:8080/foods")
        .then((res) => res.data);
      setFoods(foods);
      console.log(foods);
    } catch (error) {}
  };


  const handleLoading = () => {
    setLoading(true);
  };


  const createFood = async () => {
    try {
      const { data } = await axios
        .post("http://localhost:8080/foods", foodForm)
      setLoading(false);
      setFoods([...foods, data.food]);
    } catch (error) {
      console.log("error in create food function", error);
    }
  };

  const uploadFoodImage = async () => {
    try {
      const formData = new FormData();
      formData.set("image", file!);
      const { data } = await axios.post("http://localhost:8080/upload", formData);
      foodForm.image = data.image_url;
      createFood();
    } catch (error) {
      console.log("error in uploadFoodImage function", error);
    }
  };

  const deleteFoodFromArray = (id: string) => {
    setFoods((oldFoods: any) => {
      return oldFoods.filter((obj: any) => obj._id !== id);
    });
  };

  const deleteFood = async (foodId: string) => {
    try {
      const data = await axios.delete(`http://localhost:8080/foods/${foodId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      deleteFoodFromArray(foodId);
    } catch (error) {
      console.log("Error in deleteFood function", error);
    }
  };
  return (
    <foodContext.Provider
      value={{
        foods,
        getFoods,
        uploadFoodImage,
        handleFoodForm,
        handleFile,
        foodForm,
        deleteFood,
        loading,
        handleLoading,
      }}
    >
      {children}
    </foodContext.Provider>
  );
};

export default FoodProvider;

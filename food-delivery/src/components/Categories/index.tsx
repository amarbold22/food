"use client";
import { Container, Stack, Typography, Box } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import Grid from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FoodCard from "../Card";
import { foodContext } from "@/context/FoodProvider";

type CategoryProps = {
  name: string;
  getFoods: () => Promise<void>;
  foods: any;
  id: string;
};

const CategoryTag = ({ name, foods, getFoods, id }: CategoryProps) => {
  useEffect(() => {
    getFoods();
  }, [foods]);

  return (
    <Box sx={{}}>
      <Stack
        direction="row"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="row" display="flex" alignItems="center">
          <AutoAwesomeIcon sx={{ color: "#18b15a" }} /> 
          <Typography fontSize="24px" fontWeight="bold">
            {name}
          </Typography>
        </Stack>
        <Stack direction="row">
          <Typography color="#18ba51" sx={{ textDecoration: "underline" }}>
            Бүгдийг харах
          </Typography>
          <NavigateNextIcon sx={{ color: "#18ba51" }} />
        </Stack>
      </Stack>
      <Stack direction="row" spacing={10} my={5}>
        {foods
          ?.filter((food: any) => food.category._id == id)
          ?.map((food: any) => (
            <Box key={food._id}>
              <FoodCard food={food} />
            </Box>
          ))}
      </Stack>
    </Box>
  );
};

export default CategoryTag;

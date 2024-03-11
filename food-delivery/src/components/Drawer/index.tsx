"use client"
import { Box, Button as MuiButton, Divider, Drawer, Typography, Grid, Stack } from "@mui/material";
import Lottie from "lottie-react";
import { FaChevronLeft } from "react-icons/fa";
import Button from "../CORE/Button";
import emptyBasketData from "../../../public/emptyBasket.json"

import React, { useContext, useState } from "react";
import { DrawerCard } from "../DrawerCard";
import { basketContext } from "@/context/BasketProvider";
import { useRouter } from "next/navigation";

interface IDrawerProps {
  open: boolean;
  handleClose: () => void;
  basketFoods: [];
}

const MyDrawer = ({ handleClose, open, basketFoods }: IDrawerProps) => {
  const router = useRouter();
  // const { basketFoods } = useContext(basketContext);
  const handleNext = () => {
    router.push("/order");
  }
  console.log("basketFoooooooooods", basketFoods);
  return (
    <>
      <React.Fragment>
        <Drawer open={open} onClose={handleClose} anchor="right">
          <Box width={584} p={5}>
            <Box
              pb={5}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <FaChevronLeft />
              <Typography fontWeight={600}>Таны сагс</Typography>
              <Typography></Typography>
            </Box>
            <Divider />
            {
              basketFoods && (basketFoods?.map((food: any) => <DrawerCard key={food?.food?.id} food={food}/>))
            }
            {!basketFoods && (
            <Stack
              height={"90%"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box
                width={200}
                height={200}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Lottie animationData={emptyBasketData} loop />
              </Box>
              <Typography variant="h6" align="center">
                Хоосон байна
              </Typography>
            </Stack>
          )}
            <Divider />
            <Grid sx={{display:"flex",
              alignItems:"center",
              justifyContent:"space-between", px: "20px", pt: "20px" }} >
                <Grid>
                    <Typography>Нийт төлөх дүн</Typography>
                    <Typography sx={{fontWeight: "bold"}}>{
                      basketFoods?.map((food: any) => {
                          return food?.count * food?.food?.price;
                      })
                      .filter((el: any) => (typeof el === "number"))
                      ?.reduce((prev: any, next: any) => {
                          return prev + next;
                      }, 0)
                    }₮</Typography>
                </Grid>
                <Grid>
                  {
                    basketFoods ? 
                      <Button label="Захиалах" disabled={false} btnType="contained" onClick={handleNext}></Button>
                    : <Button label="Захиалах" disabled={true} btnType="contained" onClick={handleNext}></Button>
                  }
                </Grid>
            </Grid>
          </Box>
        </Drawer>
      </React.Fragment>
    </>
  );
};

export default MyDrawer;
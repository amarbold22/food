import { Box, Button as MuiButton, Divider, Drawer, Typography, Grid } from "@mui/material";
import { FaChevronLeft } from "react-icons/fa";
import Button from "../CORE/Button";

import React, { useContext, useState } from "react";
import { DrawerCard } from "../DrawerCard";
import { basketContext } from "@/context/BasketProvider";
import { useRouter } from "next/navigation";

interface IDrawerProps {
  open: boolean;
  handleClose: () => void;
}

const MyDrawer = ({ handleClose, open }: IDrawerProps) => {
  const router = useRouter();
  const { basketFoods } = useContext(basketContext);
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
              basketFoods?.map((food: any) => {
                return <DrawerCard food={food}/>
              })
            }
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
                  <Button label="Захиалах" disabled={false} btnType="contained" onClick={handleNext}></Button>
                </Grid>
            </Grid>
          </Box>
        </Drawer>
      </React.Fragment>
    </>
  );
};

export default MyDrawer;
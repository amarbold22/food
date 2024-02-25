import { Box, Button as MuiButton, Divider, Drawer, Typography, Grid } from "@mui/material";
import { FaChevronLeft } from "react-icons/fa";
import Button from "../CORE/Button";

import React, { useContext } from "react";
import { DrawerCard } from "../DrawerCard";
import { basketContext } from "@/context/BasketProvider";

interface IDrawerProps {
  open: boolean;
  handleClose: () => void;
}

const MyDrawer = ({ handleClose, open }: IDrawerProps) => {
  const { basketFoods } = useContext(basketContext);
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
            {/* {
              basketFoods?.map((food: any) => {
                <DrawerCard/>
              })
            } */}
            <DrawerCard/>
            <DrawerCard/>
            <Divider />
            <Grid sx={{display:"flex",
              alignItems:"center",
              justifyContent:"space-between", px: "20px", pt: "20px" }} >
                <Grid>
                    <Typography>Нийт төлөх дүн</Typography>
                    <Typography sx={{fontWeight: "bold"}}>35000₮</Typography>
                </Grid>
                <Grid>
                  <Button label="Захиалах" disabled={false} btnType="contained"></Button>
                </Grid>
            </Grid>
          </Box>
        </Drawer>
      </React.Fragment>
    </>
  );
};

export default MyDrawer;
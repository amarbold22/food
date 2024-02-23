import { Box, Button, Divider, Drawer, Typography } from "@mui/material";
import { FaChevronLeft } from "react-icons/fa";

import React from "react";
import { DrawerCard } from "../DrawerCard";

interface IDrawerProps {
  open: boolean;
  handleClose: () => void;
}

const MyDrawer = ({ handleClose, open }: IDrawerProps) => {
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
            <DrawerCard />
          </Box>
        </Drawer>
      </React.Fragment>
    </>
  );
};

export default MyDrawer;
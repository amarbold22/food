"use client";
import React, { useState, PropsWithChildren } from "react";

import Header from "@/layout/Header";
import { Box } from "@mui/material";
import Nav from "@/layout/nav";
import Main from "@/layout/main";

const Layout = ({ children }: PropsWithChildren) => {
  const [openNav, setOpenNav] = useState(false);
  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>{children}</Main>
      </Box>
    </>
  );
};

export default Layout;

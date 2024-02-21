"use client";

import { forwardRef } from "react";
import { Icon } from "@iconify/react";

import Box from "@mui/material/Box";

// ----------------------------------------------------------------------

// eslint-disable-next-line react/display-name
const Iconify = forwardRef(
  ({ icon, width = 20, sx, ...other }: any, ref: any) => (
    <Box
      ref={ref}
      component={Icon}
      className="component-iconify"
      icon={icon}
      sx={{ width, height: width, ...sx }}
      {...other}
    />
  )
);

export default Iconify;

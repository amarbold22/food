"use client";
import { useState } from "react";

import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { listClasses } from "@mui/material/List";
import Typography from "@mui/material/Typography";

import Iconify from "@/components/iconify";

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: "featured", label: "Онцлог" },
  { value: "newest", label: "Шинэ" },
  { value: "priceDesc", label: "Үнэ: Эхээс нь бага руу" },
  { value: "priceAsc", label: "Үнэ: Багаас нь их рүү" },
];

export default function ShopFoodSort() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        onClick={handleOpen}
        endIcon={
          <Iconify
            icon={open ? "eva:chevron-up-fill" : "eva:chevron-down-fill"}
          />
        }
      >
        Эрэмблэх:&nbsp;
        <Typography
          component="span"
          variant="subtitle2"
          sx={{ color: "text.secondary" }}
        >
          Шинээс нь
        </Typography>
      </Button>

      <Menu
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              [`& .${listClasses.root}`]: {
                p: 0,
              },
            },
          },
        }}
      >
        {SORT_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === "newest"}
            onClick={handleClose}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

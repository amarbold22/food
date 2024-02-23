"use client"

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Popover from "@mui/material/Popover";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { fDate } from "@/utils/format-time";
import { MenuItem } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useContext, useState } from "react";
import CatProvider, { catContext } from "@/context/catProvider";
import { MoreVert } from "@mui/icons-material";

// ----------------------------------------------------------------------
export default function CategoryCard({ category }: any) {
  const { image, name, createdAt, description } = category;
  const { deleteCategory } = useContext(catContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderTitle = (
    <Link
      color="inherit"
      variant="subtitle2"
      underline="hover"
      sx={{
        overflow: "hidden",
        WebkitLineClamp: 2,
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        fontSize: "25px",
      }}
    >
      {name}
    </Link>
  );
  const renderDesc = (
    <Typography
      color="inherit"
      variant="body2"
      sx={{
        height: 44,
        overflow: "hidden",
        WebkitLineClamp: 2,
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
      }}
    >
      {description}
    </Typography>
  );

  const renderCover = (
    <Box
      component="img"
      alt={name}
      src={image}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: "cover",
        position: "absolute",
      }}
    />
  );

  const renderDate = (
    <Typography
      variant="caption"
      component="div"
      sx={{
        mb: 2,
        color: "text.disabled",
      }}
    >
      {fDate(createdAt)}
    </Typography>
  );

  return (
    <Grid xs={12} sm={6} md={3}>
      <Card>
        <Box
          sx={{
            position: "relative",
            pt: "calc(100% * 3 / 4)",
          }}
        >
          {renderCover}
        </Box>
        <Box
          sx={{
            p: (theme) => theme.spacing(4, 3, 3, 3),
          }}
        >
          {renderDate}
          {renderTitle}
          <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between">
          {renderDesc}
          <div onClick={handleClick}>
            <MoreVert />
          </div>
          <Popover
            id={category?._id}
            anchorEl={anchorEl}
            open={open}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <EditOutlinedIcon />
              Edit
            </MenuItem>

            <MenuItem
              onClick={() => {
                handleClose();
                deleteCategory(category._id);
              }}
              sx={{ color: "error.main" }}
            >
              <DeleteForeverOutlinedIcon />
              Delete
            </MenuItem>
          </Popover>
            
          </Stack>
        </Box>
      </Card>
    </Grid>
  );
}

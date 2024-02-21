import * as React from "react";
import {
  Box,
  Button as MuiButton,
  Typography,
  Modal,
  Grid,
  Stack,
  styled,
  FormControlLabel,
  FormGroup,
  Checkbox,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import Image from "next/image";
import { Remove, Add, Close } from "@mui/icons-material";
import { Button, Input } from "../core";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { catContext } from "@/context/catProvider";
import { foodContext } from "@/context/foodProvider";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  bgcolor: "background.paper",
  borderRadius: 5,
  boxShadow: 22,
  p: 4,
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function FoodModal({ handleCloseFilter, openFilter }: any) {
  React.useEffect(() => {
    getCategories();
  }, []);
  const { categories, getCategories } = React.useContext(catContext);
  const {
    uploadFoodImage,
    handleFoodForm,
    handleFile,
    foodForm,
    handleLoading,
  } = React.useContext(foodContext);
  return (
    <div>
      <Modal
        open={openFilter}
        onClose={handleCloseFilter}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="h3">Хоол нэмэх хэсэг</Typography>
            <MuiButton onClick={handleCloseFilter} sx={{ fontSize: 23 }}>
              X
            </MuiButton>
          </Stack>

          <Input
            label="Name"
            desc="Хоолны нэрийг оруулна уу"
            name="name"
            onChange={handleFoodForm}
          />
          <Input
            label="Price"
            desc="Үнийн дүнг оруулна уу"
            name="price"
            onChange={handleFoodForm}
          />
          <Input
            label="Description"
            desc="Write food Description"
            name="description"
            onChange={handleFoodForm}
          />
          <Stack>
            <Input label="Discount" desc="Хямдралын хувийг оруулна уу" />
            <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                name="isSale"
                label="sale"
              />
            </FormGroup>
          </Stack>
          <Stack>
            <FormControl sx={{ m: 1, minWidth: 120 }} required>
              <InputLabel id="demo-simple-select-disabled-label">
                Катигори
              </InputLabel>
              <Select
                labelId="demo-simple-select-disabled-label"
                id="demo-simple-select-disabled"
                label="Катигори"
                name="category"
                value={foodForm.category}
                onChange={handleFoodForm}
              >
                {categories?.map((category: any) => {
                  return (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
          </Stack>
          <MuiButton
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput type="file" onChange={handleFile} />
          </MuiButton>
          <Button
            onClick={() => {
              handleLoading();
              uploadFoodImage();
              handleCloseFilter();
            }}
            label="нэмэх"
          ></Button>
        </Box>
      </Modal>
    </div>
  );
}

import * as React from "react";
import {
  Box,
  Button as MuiButton,
  Typography,
  Modal,
  Grid,
  Divider,
  CardMedia,
} from "@mui/material";
import Image from "next/image";
import { Remove, Add, Close } from "@mui/icons-material";
import { basketContext } from "@/context/BasketProvider";

const style = {
  width: 538,
  borderRadius: 5,
};

const backgroundImageStyle = {
  backgroundImage: 'url("/assets/food-1.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  width: "245px",
  height: "150px",
};

export const DrawerCard = ({food} : any) => {
  const {deleteBasketItem, addBasketItem} = React.useContext(basketContext);
  const [count, setCount] = React.useState(food?.count);
  const handleAdd = () => {
    setCount(count + 1);
    addBasketItem({
      food: food._id,
      count: count,
      totalPrice: count * food.price
    });
  }
  const handleSub = () => {
    if(count === 1) setCount(1)
    else {
      setCount(count - 1);
    }
  }

  const handleDelete =(value: string)=>{
    addBasketItem({
      food: food._id,
      count: count,
      totalPrice: count * food.price
    });
  }
  return (
    <>
      <Box sx={style} m={5}>
        <Grid container display={"flex"} flexDirection={"row"} gap={10}>
          <Grid item xs={5}>
            <Box sx={{background: "red", borderRadius: "10px", width: "250px", height: "150px", overflow: "hidden"}}>
                <CardMedia component="img"
                        sx={{ height: 150, width: 280 }}
                        image={food?.food?.image}
                        alt="img"/>
            </Box>
          </Grid>
          <Grid
            item
            xs={5}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
          >
            <Grid item xs={1} position={"relative"}>
              <MuiButton sx={{ ml: 50, position: "absolute" }}>
                <Close onClick={() => {
                  handleDelete(food?.food?._id);
                }}/>
              </MuiButton>
            </Grid>
            <Grid display={"flex"} flexDirection={"column"}>
              <Typography fontWeight={600}>{food?.food?.name}</Typography>
              <Typography sx={{ color: "#18BA51" }} fontWeight={600}>
                {count * food?.food?.price}₮
              </Typography>

              <Typography color={"gray"}>
                {food?.food?.description}
              </Typography>

              <div>
                <MuiButton onClick={handleSub}>
                  <Remove
                    sx={{
                      bgcolor: "#18BA51",
                      color: "white",
                      width: "70%",
                      height: "30px",
                      borderRadius: 2,
                    }}
                  />
                </MuiButton>
                <input
                  type="text"
                  value={count}
                  style={{
                    width: "60px",
                    border: "none",
                    textAlign: "center",
                    paddingTop: 4,
                    paddingBottom: 4,
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                />
                <MuiButton onClick={handleAdd}>
                  <Add
                    sx={{
                      bgcolor: "#18BA51",
                      color: "white",
                      width: "70%",
                      height: "30px",
                      borderRadius: 2,
                    }}
                  />
                </MuiButton>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Divider />
    </>
  );
};
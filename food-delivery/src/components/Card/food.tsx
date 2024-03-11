import { Typography, Box, CardMedia, Stack, Divider } from '@mui/material';
import { Button } from '@mui/material'
import { Add, Remove } from '@mui/icons-material';
import React, { useContext, useState } from 'react'
import { basketContext } from '@/context/BasketProvider';

type Props = {
    food: any
}

const SmFood = (food: Props) => {
    const {deleteBasketItem, updateBasketItem} = useContext(basketContext);
    const [count, setCount] = useState(food?.food?.count);
    console.log("count", food.food.count)
    const handleAdd = () => {
        console.log("adding food", food);
        setCount(count + 1);
        updateBasketItem({
          foodId: food.food.food._id,
          count: food.food.count + 1,
          totalPrice: (food.food.count + 1) * food.food.food.price
        });
      }
      const handleSub = () => {
        if(count === 1){
          deleteBasketItem(food.food.food._id);
        }
        else {
          setCount(count - 1);
          updateBasketItem({
            foodId: food.food.food._id,
            count: food.food.count - 1,
            totalPrice: (food.food.count - 1) * food.food.food.price
          });
        }
      }
  return (
    <Box sx={{marginY: "10px", paddingX: "30px"}}>
        <Divider sx={{marginY: "10px"}}/>
        <Stack direction="row" display="flex" justifyContent="space-between">
            <Box sx={{display: "flex", justifyContent: "space-between", gap: "40px"}}>
                <CardMedia component="img"
                            sx={{ height: 100, width: 150, borderRadius: "10px" }}
                            image={food?.food.food?.image}
                            alt="img"/>
                <Stack>
                    <Typography sx={{fontWeight: "bold"}}>{food?.food.food?.name}</Typography>
                    <Typography sx={{fontWeight: "bold", color: "#18ba51"}}>{food?.food.food?.price}₮</Typography>
                    <Typography sx={{fontWeight: "semibold"}}>{food?.food.food?.description}</Typography>
                </Stack>
            </Box>
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
              <Typography sx={{fontWeight: "bold"}}>Тоо ширхэг:</Typography>
              <Typography sx={{fontWeight: "bold"}}>{count}</Typography>
            </Box>
        </Stack>
    </Box>
  )
}

export default SmFood;
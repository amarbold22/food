"use client"
import React, { useContext, useState } from 'react'
import { Box, Stack, Typography, Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import SmFood from '../Card/food';
import { basketContext } from '@/context/BasketProvider';
import Button from '../CORE/Button';
import { UserContext } from '@/context/UserProvider';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
type IOrderProps = {
  basketFoods: [];
  formik: any;
};

const Order2 = ({basketFoods, formik}: IOrderProps) => {
  console.log("asaasas", basketFoods);
  const {order} = useContext(UserContext)
  const [initial, setInitial] = useState(0);
  const handleOrder = () => {
    order();
  }
  return (
    <Stack sx={{width: "800px", height: "800px"}}>
      <Box sx={{width: "full", margin: "10px", display: "flex", alignItems: "center"}}>
        <Radio sx={{
          '& .MuiSvgIcon-root': {
            fontSize: 50,
          },
        }}/>
        <Stack>
          <Typography sx={{color: "gray", fontSize: "14px"}}>Алхам 2</Typography>
          <Typography sx={{fontSize: "24px", fontWeight: "semibold"}}>Захиалгаа баталгаажуулах</Typography>
          <Typography sx={{color: "dodgerblue"}}>Хүлээгдэж байна</Typography>
        </Stack>
      </Box>
      <Box sx={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", borderRadius: "20px", padding: "20px"}}>
        <Grid sx={{height: "600px", overflow: "scroll"}}>
        {
          basketFoods?.map((food : any) => {
            return <SmFood food={food}/>;
          })
        }
        </Grid>
        <Grid sx={{display: "flex", marginTop: "30px"}} xs={12}>
          <Grid xs={6} sx={{}}>
            <Typography sx={{color: "gray", fontSize: "16px"}}>Нийн төлөх дүн</Typography>
            <Typography sx={{fontWeight: "bold", fontSize: "20px"}}>
              {
                basketFoods?.map((food: any) => {
                  return food?.count * food?.food?.price;
              })
              .filter((el: any) => (typeof el === "number"))
              ?.reduce((prev: any, next: any) => {
                  return prev + next;
              }, 0)
              }₮
            </Typography>
          </Grid>
          <Grid xs={6}>
            <Button label="Захиалах" disabled={false} btnType='contained' onClick={() => {
              handleOrder();
            }}></Button>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  )
}

export default Order2;
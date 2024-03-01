"use client"
import FoodCard from "@/components/Card";
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from "@mui/material";
import Typography from '@mui/material/Typography';
import { IoBookOutline, IoTimeOutline } from "react-icons/io5";
import { PiBowlFoodDuotone } from "react-icons/pi";
import { useContext, useEffect } from "react";
import { categoryContext } from "@/context/CategoryProvider";
import { foodContext } from "@/context/FoodProvider";
import CategoryTag from "@/components/Categories";
import { Divider } from "@mui/material";

const AdCardArr = [
  {
    id: 1,
    label: "Хүргэлтийн төлөв шалгах",
    icon: <IoBookOutline size="50px"/>,
    description: "Захиалга бэлтгэлийн явцыг хянах"
  },
  {
    id: 2,
    label: "Шуурхай хүргэлт",
    icon: <IoTimeOutline size="50px"/>,
    description: "Захиалга бэлтгэлийн явцыг хянах"
  },
  {
    id: 3,
    label: "Эрүүл, баталгаат орц",
    icon: <PiBowlFoodDuotone size="50px"/>,
    description: "Захиалга бэлтгэлийн явцыг хянах"
  },
  {
    id: 4,
    label: "Хоолны өргөн сонголт",
    icon: <IoBookOutline size="50px"/>,
    description: "Захиалга бэлтгэлийн явцыг хянах"
  },
]

export default function Home() {
  const { getCategories, categories } = useContext(categoryContext);
  const { getFoods, foods } = useContext(foodContext);
  // // const { getFoods, foods } = useContext(foodContext);

  useEffect(() => {
    getCategories();
    // getFoods();
  }, []);

  return (
    <main>
      <Box sx={{width: "full", height: "500px", backgroundColor: "#18ba51"}}>
        <Box sx={{width: "400px", height: "200px", position: "absolute", left: "10%", top: "20%"}}>
          <Typography sx={{color: "white", fontSize: "40px", fontWeight: "bold"}}>Pinecone Food Delivery</Typography>
          <Divider></Divider>
          <Typography sx={{color: "white", fontSize: "20px"}}>Horem ipsum dolor sit amet, consectetur adipicing elit.</Typography>
        </Box>
      </Box>
      <Grid container sx={{width: 'full', backgroundColor: "white", gap: "20px"}} display="flex" flexDirection="column" alignItems="center" py={20}>
        <Stack direction="row" spacing={20} my="10px" maxWidth="100%">
        {AdCardArr?.map((el) => (
            <Grid key={el.id} boxShadow={1} spacing="15px" sx={{ border: "1px solid #d1d1d1", maxWidth: "355px", maxHeight: "200px", p: "16px", borderRadius: "20px"}}>
              <Box color="#18BA51" width="300px">{el.icon}</Box>
              <Stack spacing="4px">
                <Typography sx={{fontWeight: "700"}}>{el.label}</Typography>
                <Typography sx={{color: "grey"}}>{el.description}</Typography>
              </Stack>
            </Grid>
          ))}
        </Stack>
        <Stack spacing={10}>
            {
              categories?.map((category) => (
                <CategoryTag key={category._id} name={category?.name} getFoods={getFoods} foods={foods} id={category._id}/>
              ))
            }
          </Stack>
      </Grid>
    </main>
  )
}


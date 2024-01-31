"use client"
import FoodCard from "@/components/Card";
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ModalWithButton from "@/components/ModalWithButton";
import { IoBookOutline, IoTimeOutline } from "react-icons/io5";
import { PiBowlFoodDuotone } from "react-icons/pi";
import { grey } from "colors";

const AdCardArr = [
  {
    label: "Хүргэлтийн төлөв шалгах",
    icon: <IoBookOutline size="50px"/>,
    description: "Захиалга бэлтгэлийн явцыг хянах"
  },
  {
    label: "Шуурхай хүргэлт",
    icon: <IoTimeOutline size="50px"/>,
    description: "Захиалга бэлтгэлийн явцыг хянах"
  },
  {
    label: "Эрүүл, баталгаат орц",
    icon: <PiBowlFoodDuotone size="50px"/>,
    description: "Захиалга бэлтгэлийн явцыг хянах"
  },
  {
    label: "Хоолны өргөн сонголт",
    icon: <IoBookOutline size="50px"/>,
    description: "Захиалга бэлтгэлийн явцыг хянах"
  },
]

export default function Home() {

  return (
    <main>
      <Grid container sx={{width: 'full', backgroundColor: "white", gap: "20px"}} display="flex" flexDirection="column" alignItems="center" py={20}>
        <Stack direction="row" spacing={20} my="100px">
        {AdCardArr.map((el) => (
            <Grid boxShadow={1} spacing="15px" sx={{ border: "1px solid #d1d1d1", maxWidth: "355px", maxHeight: "200px", p: "16px", borderRadius: "20px"}}>
              <Box color="#18BA51" width="300px">{el.icon}</Box>
              <Stack spacing="4px">
                <Typography sx={{fontWeight: "700"}}>{el.label}</Typography>
                <Typography sx={{color: "grey"}}>{el.description}</Typography>
              </Stack>
            </Grid>
          ))}
        </Stack>
        <Stack direction="row" spacing={10}>
          <FoodCard label="Өглөөний хоол" imageSrc="food.jpeg" sale={20} price={8000} isDiscounted={true}/>
          <FoodCard label="Зайрмаг" imageSrc="icecream.avif" sale={25} price={4500} isDiscounted={true}/>
          <FoodCard label="Breakfast" imageSrc="pork.avif" sale={20} price={4500} isDiscounted={false}/>
          <FoodCard label="Breakfast" imageSrc="eng-breakfast.avif" sale={20} price={16000} isDiscounted={false}/>
        </Stack>
        <ModalWithButton/>
      </Grid>
    </main>
  )
}

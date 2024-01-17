import FoodCard from "@/components/Card";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button, Typography } from "@mui/material";
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

export default function Home() {
  return (
    <main>
      <Grid container sx={{width: 'full', backgroundColor: "white"}} justifyContent="center" py={20}>
        <Stack direction="row" spacing={10}>
          <FoodCard/>
          <FoodCard/>
          <FoodCard/>
        </Stack>
      </Grid>
    </main>
  )
}

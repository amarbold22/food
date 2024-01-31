import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { ReactNode } from 'react';

interface ICardProps {
    label: ReactNode;
    imageSrc: string;
    isDiscounted: boolean;
    sale?: number;
    price: number;
}

const FoodCard = ({label, imageSrc, isDiscounted, sale, price} : ICardProps) => {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: "20px", boxShadow: "none", position: "relative"}}>
      <CardActionArea sx={{width: "500px", height: "300px"}}>
        <CardMedia
          component="img"
          height="200px"
          image={imageSrc}
          alt="green iguana"
          sx={{borderRadius: "20px"}}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" fontWeight="600">
             {label}
          </Typography>
          <Stack direction="row" spacing="10px">
            <Typography sx={{px: "0px", py: "10px", fontWeight: "bold", color: "#18BA51", fontSize: "20px"} }>{price}₮</Typography>
            <Typography sx={{px: "0px", py: "10px", fontWeight: "bold", color: "rgb(200, 200, 200)", textDecoration:"line-through", fontSize: "20px", display: isDiscounted ? "block" : "none"} }>{sale ? price/(1-sale/100) : price}₮</Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
      <Box sx={{position: "absolute", borderRadius: "10px", backgroundColor: "#18BA51", 
      zIndex: isDiscounted ? 99 : -1, 
      right: "10px", 
      top: "10px", 
      width: "50px", height: "30px"}} textAlign="center">
        <Typography sx={{color: "white", fontWeight: "bold", px: "10px", pt: "3px"}}>{sale}%</Typography>
      </Box>
    </Card>
  );
}

export default FoodCard;
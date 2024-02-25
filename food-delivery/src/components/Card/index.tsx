import * as React from 'react';
import { Modal, Grid, Stack, Box, Button, Typography, CardMedia, CardContent, Card, CardActions, CardActionArea} from '@mui/material';
import { ReactNode } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import MuiButton from '@/components/CORE/Button'
import { UserContext } from '@/context/UserProvider';
import { basketContext } from '@/context/BasketProvider';

interface ICardProps {
    food?: any;
}

const style = {
  display: 'flex',
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 981,
  height: 564,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
};

const FoodCard = ({food} : ICardProps) => {
  const { addBasketItem } = React.useContext(basketContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [ count, setCount ] = React.useState(1);
  const addCount = () => setCount(count + 1);;

  const subCount = () => {
    if(count === 1) setCount(1);
    else setCount(count - 1);
  }
  const handleAddBasket = () => {
    console.log("handleAddBasket");
    addBasketItem(food, count);
    console.log(food, count);
    handleClose();
  }

  return (
    <Card sx={{ maxWidth: 345, borderRadius: "20px", boxShadow: "none", position: "relative"}} onClick={handleOpen}>
      <CardActionArea sx={{width: "300px", height: "300px"}}>
        <CardMedia
          component="img"
          height="200px"
          image={food.image}
          alt="green iguana"
          sx={{borderRadius: "20px", width: "300px"}}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" fontWeight="600">
             {food?.name}
          </Typography>
          <Stack direction="row" spacing="10px">
            <Typography sx={{px: "0px", py: "10px", fontWeight: "bold", color: "#18BA51", fontSize: "20px"} }>{food?.price}₮</Typography>
            <Typography sx={{px: "0px", py: "10px", fontWeight: "bold", color: "rgb(200, 200, 200)", textDecoration:"line-through", fontSize: "20px", display: food?.isDiscounted ? "block" : "none"} }>{food?.sale ? food?.price/(1-food?.sale/100) : food?.price}₮</Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
      <Box sx={{position: "absolute", borderRadius: "10px", backgroundColor: "#18BA51", 
      zIndex: food?.isDiscounted ? 99 : -1, 
      right: "10px", 
      top: "10px", 
      width: "50px", height: "30px"}} textAlign="center">
        <Typography sx={{color: "white", fontWeight: "bold", px: "10px", pt: "3px"}}>{food?.sale}%</Typography>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Grid item xs={7} sx={{display: 'flex', justifyContent: "center", alignItems: "center", overflow: "hidden"}}>
                <CardMedia
                    component="img"
                    sx={{
                      width: "450px",
                      height: "450px"
                    }}
                    alt="Pizza"
                    src={food?.image}
                />
                </Grid>
                <Grid item xs={5}>
                  <Stack>
                      <Box textAlign="end">
                        <Button>
                          <CloseOutlinedIcon/>
                        </Button>
                      </Box>
                      <Grid display="flex" flexDirection="column" gap="32px">
                        <Box>
                          <Typography sx={{fontSize: "28px", fontWeight: 600}}>{food?.name}</Typography>
                          <Typography sx={{fontSize: "18px" ,color: "#18ba51"}}>{food?.price}₮</Typography>
                        </Box>
                        <Box sx={{display: "flex",flexDirection: "column", gap: "12px"}}>
                          <Typography>Тайлбар</Typography>
                          <Box sx={{ borderRadius: "10px", background: "#F6F6F6", height: "60px", padding: "10px"}}>
                              <Typography color="#767676">{food?.description}</Typography>
                          </Box>
                        </Box>
                        <Typography>Тоо</Typography>
                        <Box sx={{display: "flex", gap: "20px", justifyContent: "space-between", alignItems: "center"}}>
                            <Button sx={{background: "#18BA51", color: "white"}} onClick={subCount}>-</Button>
                            <Typography sx={{background: "#F6F6F6", height: "30px", maxWidth: "200px"}}>{count}</Typography>
                            <Button sx={{background: "#18BA51", color: "white"}} onClick={addCount}>+</Button>
                        </Box>
                        <MuiButton label="Сагслах" disabled={false} btnType="contained" h={50} onClick={handleAddBasket}></MuiButton>
                      </Grid>
                  </Stack>
                </Grid>
            </Box>
        </Modal>
    </Card>
  );
}

export default FoodCard;
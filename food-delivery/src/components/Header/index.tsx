"use client";
import React, { useContext, useState } from 'react'
import WhiteIcon from '../WhiteIcon';
import { Button, IconButton, InputBase, Box, Typography, Stack, Badge } from '@mui/material';
import SearchIcon from '../SearchIcon';
import { ShoppingBasketOutlined, Person2Outlined } from '@mui/icons-material';
// import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import BlackIcon from '../BlackIcon';
import { DrawerCard } from '../DrawerCard';
import MyDrawer from '../Drawer';
import Link from '@mui/material/Link';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/context/UserProvider';
import { basketContext } from '@/context/BasketProvider';

const Header = () => {
    const { basketFoods } = useContext(basketContext);
    const { user } = useContext(UserContext);
    const router = useRouter();
    const [drawer, setDrawer] = useState(false);
    const handleOpenDrawer = () => setDrawer(true);
    const handleCloseDrawer = () => setDrawer(false);

    const goToProfile = () => router.push("/profile");
    const goToLogin = () => router.push("/login");

  return (
    <Stack direction="row" height={40} sx={{backgroundColor: "#FFFFFF"}} py={4} px={10} justifyContent="center" alignItems="center" spacing={25}>
        <Stack direction="row" spacing={6} color="black">
            <BlackIcon/>
            <Stack direction="row" spacing={2}>
                <Link href="/" underline="none">
                    <Typography sx={{fontWeight: "bold", color: "black"}}>НҮҮР</Typography>
                </Link>
                <Link href="/" underline="none">
                    <Typography sx={{fontWeight: "bold", color: "black"}}>ХООЛНЫ ЦЭС</Typography>
                </Link>
                <Link href="/" underline="none">
                    <Typography sx={{fontWeight: "bold", color: "black"}}>ХҮРГЭЛТИЙН БҮС</Typography>
                </Link>
            </Stack>
        </Stack>
        <Stack direction="row" spacing="15px" alignItems="center">
            <Box sx={{borderRadius: "10px", border: "solid black 0.5px"}}>
                <IconButton sx={{ p: '10px' }} aria-label="menu">
                    <SearchIcon />
                </IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Хайх"
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
            </Box>
            <Button onClick={handleOpenDrawer}>
                <Stack direction="row"  sx={{color: "black"}} spacing="10px" px={2}>
                    <Badge badgeContent={basketFoods?.length} color="primary">
                        <ShoppingBasketOutlined/>
                    </Badge>
                    <Typography sx={{fontWeight: "bold"}}>Сагс</Typography>
                </Stack>
            </Button>
            {
                user ? (
                    <Button onClick={goToProfile}>
                        <Stack direction="row" spacing="10px" px={2} sx={{color: "black"}}>
                            <Person2Outlined/>
                            <Typography sx={{fontWeight: "bold"}}>Хэрэглэгч</Typography>
                        </Stack>
                    </Button>
                ) : (
                    <Button onClick={goToLogin}>
                        <Stack direction="row" spacing="10px" px={2} sx={{color: "black"}}>
                            <Person2Outlined/>
                            <Typography sx={{fontWeight: "bold"}}>Нэвтрэх</Typography>
                        </Stack>
                    </Button>
                )
            }
            <MyDrawer open={drawer} handleClose={handleCloseDrawer} basketFoods={basketFoods} />
            </Stack>
    </Stack>
  )
}

export default Header;
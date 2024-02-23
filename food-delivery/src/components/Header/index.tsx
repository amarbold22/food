"use client";
import React, { useState } from 'react'
import Stack from '@mui/material/Stack'
import WhiteIcon from '../WhiteIcon';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import BlackIcon from '../BlackIcon';
import { DrawerCard } from '../DrawerCard';
import MyDrawer from '../Drawer';
import Link from '@mui/material/Link';

const Header = () => {
    const [drawer, setDrawer] = useState(false);
    const handleOpenDrawer = () => setDrawer(true);
    const handleCloseDrawer = () => setDrawer(false);

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
            <button onClick={handleOpenDrawer}>
                <Stack direction="row"  sx={{color: "black"}} spacing="10px" px={2}>
                    <ShoppingBasketOutlinedIcon/>
                    <Typography sx={{fontWeight: "bold"}}>Сагс</Typography>
                </Stack>
            </button>
            <Link href="/login" underline="none">
                <Stack direction="row" spacing="10px" px={2} sx={{color: "black"}}>
                    <Person2OutlinedIcon/>
                    <Typography sx={{fontWeight: "bold"}}>Нэвтрэх</Typography>
                </Stack>
            </Link>
            <MyDrawer open={drawer} handleClose={handleCloseDrawer} />
            </Stack>
    </Stack>
  )
}

export default Header;
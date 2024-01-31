import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button as MuiButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Button from '@/components/CORE/Button';

import React from 'react';
import { Stack, Typography } from '@mui/material';

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

const ModalWithButton = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    <Box>
        <MuiButton onClick={handleOpen}>Open modal</MuiButton>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Grid xs={7} sx={{display: 'flex', justifyContent: "center", alignItems: "center", overflow: "hidden"}}>
                <Box
                    component="img"
                    sx={{
                      width: "full",
                      height: "full"
                    }}
                    alt="Pizza"
                    src="Image.png"
                />
                </Grid>
                <Grid xs={5}>
                  <Stack>
                      <Box textAlign="end">
                        <CloseOutlinedIcon/>
                      </Box>
                      <Grid display="flex" flexDirection="column" gap="32px">
                        <Box>
                          <Typography sx={{fontSize: "28px", fontWeight: 600}}>Main Pizza</Typography>
                          <Typography sx={{fontSize: "18px" ,color: "#18ba51"}}>34,800₮</Typography>
                        </Box>
                        <Box sx={{display: "flex",flexDirection: "column", gap: "12px"}}>
                          <Typography>Орц</Typography>
                          <Box sx={{ borderRadius: "10px", background: "#F6F6F6", height: "60px", padding: "10px"}}>
                              <Typography color="#767676">Хулуу, төмс, лууван , сонгино, цөцгийн тос, самрын үр</Typography>
                          </Box>
                        </Box>
                        <Typography>Тоо</Typography>
                        <Box sx={{display: "flex", gap: "20px", justifyContent: "space-between", alignItems: "center"}}>
                            <MuiButton sx={{background: "#18BA51", color: "white"}}>-</MuiButton>
                            <Typography sx={{background: "#F6F6F6", height: "30px", maxWidth: "200px"}}>1</Typography>
                            <MuiButton sx={{background: "#18BA51", color: "white"}}>+</MuiButton>
                        </Box>
                        <Button label="Сагслах" disabled={false} btnType="contained" h={50}></Button>
                      </Grid>
                  </Stack>
                </Grid>
            </Box>
        </Modal>
    </Box>
  )
}

export default ModalWithButton;
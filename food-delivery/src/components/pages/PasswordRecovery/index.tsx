import Button from '@/components/CORE/Button';
import { Input } from '@/components/CORE/Input';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import React from 'react';

const PasswordRecoveryPage = () => {
  return (
    <Box sx={{ maxWidth: "550px", mx: "auto", my: "110px"}}>
        <Stack sx={{background: "", p: "32px"}}>
          <Typography textAlign="center" sx={{fontSize: "30px", fontWeight: "bold"}}>Нууц үг сэргээх</Typography>
          <Input label="И-мейл"></Input>
          <Link>
            <Button label="Нэвтрэх" disabled={false} btnType="contained"></Button>
          </Link>
        </Stack>
    </Box>
  )
};

export default PasswordRecoveryPage;
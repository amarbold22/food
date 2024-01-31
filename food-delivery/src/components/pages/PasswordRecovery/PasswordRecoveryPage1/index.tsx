import Button from '@/components/CORE/Button';
import { Input } from '@/components/CORE/Input';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import React, { ChangeEvent } from 'react';
import formik from "formik";


interface IStepProps {
  email: string;
  handleNext: () => void;
  handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
}


const PasswordRecoveryPage1 = ({ email, handleNext, handleChangeInput }: IStepProps) => {
  return (
    <Box sx={{ maxWidth: "550px", mx: "auto", my: "110px"}}>
        <Stack sx={{background: "", p: "32px"}}>
          <Typography textAlign="center" sx={{fontSize: "30px", fontWeight: "bold"}}>Нууц үг сэргээх</Typography>
          <Input label="И-мейл" name="email" onChange={handleChangeInput}></Input>
          <Link href="step2" underline="none">
            <Button label="Нэвтрэх" disabled={false} btnType="contained"  onClick={handleNext}></Button>
          </Link>
        </Stack>
    </Box>
  )
};

export default PasswordRecoveryPage1;
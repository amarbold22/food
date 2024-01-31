import Button from '@/components/CORE/Button';
import { Input } from '@/components/CORE/Input';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import axios from "axios";
import { toast } from "react-toastify";
import React, { ChangeEvent } from 'react';

interface IStepProps {
  email: string;
  otp: string;
  handleNext: () => void;
  handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

const PasswordRecoveryPage2 = ({ email, otp, handleNext, handleChangeInput }: IStepProps) => {
  const handleSendOtp = async () => {
    try {
      const data = await axios.post("http://localhost:8080/verify/otp", {
        email,
        otp,
      });
      handleNext();
    } catch (error) {
      console.log(error);
      toast.error("OTP илгэээхэд алдаа гарлаа.");
    }
  };

  return (
    <Box sx={{ maxWidth: "550px", mx: "auto", my: "110px"}}>
        <Stack sx={{background: "", p: "32px"}}>
          <Typography textAlign="center" sx={{fontSize: "30px", fontWeight: "bold"}}>Нууц үг сэргээх</Typography>
          <Typography my={5}>Таны 
            <Box component="span" sx={{color: "green", fontWeight: "bold", paddingX: "4px"}}>
                example@pinecone.mn
            </Box> 
            хаяг руу сэргээх код илгээх болно. 
        </Typography>
          <Input name="otp" label="Нууц үг сэргээх код" onChange={handleChangeInput}></Input>
          <Link href="step3" my={5} underline="none">
            <Button label="Үргэлжлүүлэх" disabled={false} btnType="contained" onClick={handleSendOtp}></Button>
          </Link>
        </Stack>
    </Box>
  )
};

export default PasswordRecoveryPage2;
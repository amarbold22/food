'use client'
import Button from '@/components/CORE/Button';
import { Input } from '@/components/CORE/Input';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import React from 'react';
import * as yup from 'yup'
import { useFormik } from 'formik';



const validationSchema = yup.object({
  email: yup
    .string()
    .max(100, "И-мейл хаяг 100 тэмдэгтээс хэтрэхгүй байна")
    .required("И-мейл хаягийг заавал бөглөнө үү")
    .matches(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@gmail[A-Za-z0-9.-]+$/, "Та зөвхөн gmail оруулна"),
  password: yup
    .string()
    .required()
    .min(6, "Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой.")
});

const SignupPage = () => {
  const formik = useFormik({
    onSubmit: ()=>{},
    initialValues:{name:'', email: ''}
  })
  return (
    <Box sx={{ maxWidth: "550px", mx: "auto", my: "110px"}}>
        <Stack sx={{background: "", p: "32px"}} spacing="16px">
          <Typography textAlign="center" sx={{fontSize: "30px", fontWeight: "bold"}}>Бүртгүүлэх</Typography>
          <Input label="Нэр"></Input>
          <Input label="И-мейл"></Input>
          <Input label="Хаяг"></Input>
          <Input label="Нууц үг" showPassword={true}></Input>
          <Input label="Нууц үг давтах" showPassword={true}></Input>
          <Stack direction="row" spacing="20px" sx={{px: "10px", py: "20px"}}>
                <CloudOutlinedIcon></CloudOutlinedIcon>
                <Typography>Үйлчилгээний нөхцөл зөвшөөрөх</Typography>
          </Stack>
          <Button label="Бүртгүүлэх" disabled={false} btnType="contained"></Button>
        </Stack>
    </Box>
  )
};

export default SignupPage;
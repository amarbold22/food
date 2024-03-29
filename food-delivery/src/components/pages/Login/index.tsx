'use client'
import Button from '@/components/CORE/Button';
import { Input } from '@/components/CORE/Input';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import React, { useContext } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import { UserContext, UserProvider } from '@/context/UserProvider';
import { useRouter } from 'next/navigation';
// import { UserContext } from '@/context/UserProvider';

const validationSchema = yup.object({
  email: yup
    .string()
    .max(100, "И-мейл хаяг 100 тэмдэгтээс хэтрэхгүй байна")
    .required("И-мейл хаягийг заавал бөглөнө үү")
    .matches(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "Та зөвхөн email оруулна"),
  password: yup
    .string()
    .required()
    .min(6, "Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой.")
});

const LoginPage = () => {
  const { login } = useContext(UserContext);
  const router = useRouter();

  const formik = useFormik({
    onSubmit: ({ email, password }) => {
      login(email, password);
      console.log("login worked");
    },
    initialValues: {
      email: "",
      password: ""
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema,
  });

  return (
    <Box sx={{ maxWidth: "550px", mx: "auto", my: "110px"}}>
        <Stack sx={{background: "", p: "32px"}}>
          <Typography textAlign="center" sx={{fontSize: "30px", fontWeight: "bold"}}>Нэвтрэх</Typography>
          <Input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            errorText={formik.errors.email}
            label="Имэйл"
          />
          <Box sx={{mb: "0px"}}>
          <Input
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            errorText={formik.errors.password}
            label="Нууц үг"
            showPassword
          />
          </Box>
            {/* <Typography textAlign="end" color="gray" sx={{mb: "20px"}}>Нууц үг сэргээх</Typography> */}
            <Button label="Нууц үг сэргээх" btnType="text" disabled={false} onClick={() => {
              router.push("/recovery/step1");
            }}/>
          <Button label="Нэвтрэх" disabled={false} btnType="outlined" onClick={formik.handleSubmit}/>
          <Typography textAlign="center" sx={{my: "20px"}}>Эсвэл</Typography>
          <Button label="Бүртгүүлэх" disabled={false} btnType="contained" href="/signup"></Button>
        </Stack>
    </Box>
  )
};
export default LoginPage;
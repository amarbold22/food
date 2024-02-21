'use client'
import Button from '@/components/CORE/Button';
import { Input } from '@/components/CORE/Input';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import React, { useContext } from 'react';
import * as yup from 'yup'
import { useFormik } from 'formik';
import { UserContext } from '@/context/UserProvider';

const validationSchema = yup.object({
  name: yup.string().required("Нэрийг заавал бөглөнө үү."),
  email: yup
    .string()
    .max(100, "Имэйл хаяг 100 тэмдэгтээч хэтрэхгүй байна.")
    .required("Имэйл хаягыг заавал бөглөнө үү.")
    .email("Хүчинтэй имэйл хаяг байх ёстой")
    .matches(
      /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
      "Та зөвхөн gmail хаяг оруулна"
    ),
  address: yup.string().required("Хаягийг заавал бөглөнө үү."),
  password: yup
    .string()
    .required("Нууц үгээ заавал бөглөнө үү.")
    .min(6, "Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой."),
  rePassword: yup
    .string()
    .oneOf([yup.ref("password")], "Нууц үг хоорондоо таарахгүй байна")
    .min(6, "Хамгийн багадаа 6 тэмдэгтээс тогтоно")
    .required("Нууц үгийг заавал оруулна уу"),
});

const SignupPage = () => {
  const { signup } = useContext(UserContext);
  const formik = useFormik({
    onSubmit: ({ email, password, address, name })=>{
      console.log("EMAIL", email);
      console.log("PASS", password);
      signup(email, password, address, name);
    },
    initialValues: {
      name: "",
      email: "",
      address: "",
      password: "",
      rePassword: "",
      isOk: false,
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema,
  })
  return (
    <Box sx={{ maxWidth: "550px", mx: "auto", my: "110px"}}>
        <Stack sx={{background: "", p: "32px"}} spacing="16px">
          <Typography textAlign="center" sx={{fontSize: "30px", fontWeight: "bold"}}>Бүртгүүлэх</Typography>
          <Input
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            errorText={formik.errors.name}
            label="Нэр"
          />
          <Input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            errorText={formik.errors.email}
            label="И-Мэйл"
          />
          <Input
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            errorText={formik.errors.address}
            label="Хаяг"
          />
          <Input
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            errorText={formik.errors.password}
            label="Нууц үг"
            showPassword
          />
          <Input
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            errorText={formik.errors.rePassword}
            label="Нууц үг давтах"
            showPassword
          />
          <Stack direction="row" spacing="20px" sx={{px: "10px", py: "20px"}}>
                <CloudOutlinedIcon></CloudOutlinedIcon>
                <Typography>Үйлчилгээний нөхцөл зөвшөөрөх</Typography>
          </Stack>
          <Button label="Бүртгүүлэх" disabled={false} btnType="contained" onClick={formik.handleSubmit}></Button>
        </Stack>
    </Box>
  )
};

export default SignupPage;
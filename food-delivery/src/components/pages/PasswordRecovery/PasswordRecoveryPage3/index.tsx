import Button from '@/components/CORE/Button';
import { Input } from '@/components/CORE/Input';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import React from 'react';
import { useFormik } from "formik";
import { object, string, ref } from "yup";
import Swal from "sweetalert2";
import { useRouter } from 'next/navigation';


interface IStepProps {
  email: string;
};

const validationSchema = object({
  password: string()
    .min(6, "Хамгийн багадаа 6 тэмдэгтээс тогтоно")
    .required("Нууц үгийг заавал оруулна уу"),
  rePassword: string()
    .oneOf([ref("password")], "Нууц үг хоорондоо таарахгүй байна")
    .min(6, "Хамгийн багадаа 6 тэмдэгтээс тогтоно")
    .required("Нууц үгийг заавал оруулна уу"),
});

const PasswordRecoveryPage3 = ({ email } : IStepProps) => {
  const router = useRouter();

  const formik = useFormik({
    onSubmit: ({ password, rePassword }) => {
      console.log("PASS", password);
      console.log("PASS", rePassword);
    },
    initialValues: { password: "test", rePassword: "retest" },
    validateOnChange: false,
    validationSchema,
    validateOnBlur: false,
  });

  const savePassword = async () => {
    await Swal.fire({
      title: "Таны нууц үг амжилттай солигдлоо",
      text: "та шинэ нууц үгээ ашиглан нэвтэрнэ үү",
      icon: "success",
    });
    // router.replace("/login");
  };

  return (
    <Box sx={{ maxWidth: "550px", mx: "auto", my: "110px"}}>
        <Stack sx={{background: "", p: "32px"}}>
          <Typography textAlign="center" sx={{fontSize: "30px", fontWeight: "bold"}}>Шинээр нууц үг зохиох</Typography>
          <Input
            value={formik.values.password}
            errorText={formik.errors.password}
            name="password"
            label="Нууц үг"
            showPassword
            onChange={formik.handleChange}
          />
          <Input
            value={formik.values.rePassword}
            errorText={formik.errors.rePassword}
            name="rePassword"
            label="Нууц үг давтах"
            showPassword
            onChange={formik.handleChange}
          />
          <Link href="step3" my={5} underline="none">
            <Button label="Үргэлжлүүлэх" disabled={false} btnType="contained"></Button>
          </Link>
        </Stack>
    </Box>
  )
};

export default PasswordRecoveryPage3;
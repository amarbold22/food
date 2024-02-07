"use client"
import Button from "@/components/CORE/Button";
import { Input } from "@/components/CORE/Input";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { object, string, ref } from "yup";
import PasswordRecoveryPage1 from "../PasswordRecoveryPage1";

interface IStepProps {
  email: string;
}

const validationSchema = object({
  password: string()
    .min(6, "Хамгийн багадаа 6 тэмдэгтээс тогтоно")
    .required("Нууц үгийг заавал оруулна уу"),
  rePassword: string()
    .oneOf([ref("password")], "Нууц үг хоорондоо таарахгүй байна")
    .min(6, "Хамгийн багадаа 6 тэмдэгтээс тогтоно")
    .required("Нууц үгийг заавал оруулна уу"),
});

const PasswordRecoveryPage3 = ({ email }: IStepProps) => {
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
    router.replace("/login");
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          margin: "auto ",
          px: "2.1rem",
          maxWidth: "450px",
          padding: "5rem 0",
        }}
      >
        <Typography
          align="center"
          gutterBottom
          sx={{ fontSize: "28px", fontWeight: "700" }}
        >
          Шинэ нууц үг cэргээх
        </Typography>

        <Stack width="100%" sx={{ mb: "2rem" }}>
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
          <Button label={"Сэргээх"} disabled={false} onClick={formik.handleSubmit} />
        </Stack>
      </Box>
    </Container>
  );
};

export default PasswordRecoveryPage3;
"use client"
import Button from "@/components/CORE/Button";
import { Input } from "@/components/CORE/Input";
import { Box, Container, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { ChangeEvent } from "react";
import { toast } from "react-toastify";
import { object, string } from "yup";
import PasswordRecoveryPage2 from "../PasswordRecoveryPage2";

interface IStepProps {
  email: string;
  handleNext: () => void;
  handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

const PasswordRecoveryPage1 = ({ email, handleNext, handleChangeInput }: IStepProps) => {
  const sendToEmail = async () => {
    try {
      const data = await axios.post("http://localhost:8080/verify/send-email", {
        email: email,
      });
      handleNext();
    } catch (error) {
      toast.error("Email илгэээхэд алдаа гарлаа.");
    }
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
          Нууц үг сэргээх
        </Typography>
        <Input label="Имэйл" onChange={handleChangeInput} name="email" />
        <Stack flex="row" width="100%" justifyContent="flex-end">
          <Button label={"Үргэлжлүүлэх"} disabled={false} onClick={sendToEmail} />
        </Stack>
      </Box>
    </Container>
  );
};

export default PasswordRecoveryPage1;
"use client";

import { ChangeEvent, useState } from "react";

import { Container } from "@mui/material";

import StepOne from "./PasswordRecoveryPage1";
import StepTwo from "./PasswordRecoveryPage2";
import StepThree from "./PasswordRecoveryPage3";

const MyStepper = () => {
  const [activeStep, setActiveStep] = useState(3);

  const [user, setUser] = useState({
    email: "",
    password: "",
    otp: "",
  });

  const handleNext = async () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Container>
      {activeStep === 1 && (
        <StepOne
          email={user.email}
          handleNext={handleNext}
          handleChangeInput={handleChangeInput}
        />
      )}
      {activeStep === 2 && (
        <StepTwo
          email={user.email}
          otp={user.otp}
          handleNext={handleNext}
          handleChangeInput={handleChangeInput}
        />
      )}
      {activeStep === 3 && <StepThree email={user.email} />}
    </Container>
  );
};

export default MyStepper;
import Stack from '@mui/material/Stack';
import React, { ReactNode } from 'react';
import { Button as MuiButton } from '@mui/material';


interface IButtonProps {
    label: ReactNode;
    disabled: boolean;
    h?: number;
    btnType?: "contained" | "outlined" | "text";
    onClick?: () => void;
}

const Button = ({ label, disabled, btnType,h, onClick }: IButtonProps) => {
  return (
    <Stack>
        <MuiButton
        onClick={onClick}
        color="primary"
        variant={btnType}
        sx={{
          p: 4,
          fontSize: "1rem",
          color:
            btnType === "outlined" || btnType === "text" ? "#18ba51" : "white",
          border: btnType === "outlined" ? 1 : 0,
          borderColor: btnType === "outlined" ? "#18ba51" : "",
          height: 
            h ? h + "px" : "50px"
        }}
        disabled={disabled}
        size="medium"
      >
        {label}
      </MuiButton>
    </Stack>
  )
}

export default Button;
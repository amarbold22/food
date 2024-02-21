"use client"
import React, { useContext } from 'react'
import { Input } from '@/components/CORE/Input'
import Button from '@/components/CORE/Button'
import { Box, Stack } from '@mui/material'
import { UserContext } from '@/context/UserProvider'

type Props = {}

const VerifyPage = (props: Props) => {
    const { verify } = useContext(UserContext);
    return (
    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Stack sx={{padding: "100px"}}>
            <Input name="OTP" label="OTP"></Input>
            <Button label="Илгээх" btnType="contained" disabled={false} onClick={verify}></Button>
        </Stack>
    </Box>
  )
}

export default VerifyPage;
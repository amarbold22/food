"use client"
import Order1 from '@/components/Order/step1'
import Order2 from '@/components/Order/step2'
import { Grid } from '@mui/material'
import React from 'react'

type Props = {}

const OrderPage = (props: Props) => {
  return (
    <Grid>
        <Grid>
            <Order1/>
        </Grid>
        <Grid>
            <Order2/>
        </Grid>  
    </Grid>
  )
}

export default OrderPage;
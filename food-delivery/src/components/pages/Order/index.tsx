"use client"
import Order1 from '@/components/Order/step1'
import Order2 from '@/components/Order/step2'
import { basketContext } from '@/context/BasketProvider'
import { Grid } from '@mui/material'
import * as yup from "yup";
import React, { useContext } from 'react'
import { UserContext } from '@/context/UserProvider'
import { useFormik } from 'formik'

type Props = {}

const OrderPage = (props: Props) => {
  const {basketFoods}=useContext(basketContext);
  const {order} = useContext(UserContext);
  const validationSchema = yup.object({
    duureg: yup.string().required("Дүүрэгээ заавал оруулах ёстой."),
    horoo: yup.string().required("Хороогоо заавал оруулах ёстой."),
    buildingNo: yup.string().required("Байраа заавал оруулах ёстой."),
    phoneNumber: yup.string().required("Утасны дугаарыг заавал оруулах ёстой"),
    info: yup
      .string()
      .required("Нэмэлт хаягны мэдээлэлийг заавал оруулах ёстой."),
    method: yup.string().required("Төлбөрийн төрлөө заавал сонгоно уу"),
  });
  const formik = useFormik({
    onSubmit: ({ duureg, horoo, buildingNo, info, phoneNumber, method }) => {
      console.log("ON SUBMIT WORKING");
      order(duureg, horoo, buildingNo, info, phoneNumber, method);
    },
    initialValues: {
      duureg: "",
      horoo: "",
      buildingNo: "",
      phoneNumber: "",
      info: "",
      method: "",
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema,
  });
  return (
    <Grid container xs={12}>
        <Grid item xs={6} height="1000px" sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Order1 formik={formik}/>
        </Grid>
        <Grid item xs={6} height="1000px" sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Order2 basketFoods={basketFoods} formik={formik}/>
        </Grid>  
    </Grid>
  )
}

export default OrderPage;
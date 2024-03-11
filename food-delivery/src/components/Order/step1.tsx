"use client"
import React from 'react'
import { Box, Typography, Stack, Radio, RadioGroup, FormControlLabel, FormLabel, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material'
import { Input as DefaultInput } from '../CORE/Input';
import { SelectChangeEvent } from '@mui/material/Select';
import PlaceOutlinedIcon from '@mui/icons-material/LocationOnOutlined';


type Props = {
  formik: any;
}

const districts = [
  "Баянзүрх дүүрэг",
  "Хан-уул дүүрэг",
  "Баянгол дүүрэг",
  "Сонгинохайрхан дүүрэг",
  "Чингэлтэй дүүрэг",
];

const khoroos = [
  "1-р хороо",
  "2-р хороо",
  "3-р хороо",
  "4-р хороо",
  "5-р хороо",
  "6-р хороо",
  "7-р хороо",
];

const apartments = [
  "Нархан хотхон",
  "26-р байр",
  "Хоймор хотхон",
  "45-р байр",
  "Зайсан хотхон",
];

const Order1 = ({ formik }: Props) => {
  const duureg = [
    "Баянзүрх дүүрэг",
    "Баянгол дүүрэг",
    "Сонгинохайрхан дүүрэг",
    "Хан-Уул дүүрэг",
    "Чингэлтэй дүүрэг",
  ];
  const horoo = [
    "1-р хороо",
    "2-р хороо",
    "3-р хороо",
    "4-р хороо",
    "5-р хороо",
    "6-р хороо",
  ];
  const bair = [
    "Нархан хотхон",
    "Хоймор хотхон",
    "Зайсан хотхон",
    "26-р байр",
    "45-р байр",
  ];
  return (
    <Box sx={{ minWidth: 370, width: { md: "50%" } }}>
      <Box sx={{ display: "flex" }}>
        <Radio color="secondary" checked={true} />
        <Box>
          <Typography variant="caption" color="GrayText">
            Алхам 1
          </Typography>
          <Typography variant="h6">Хаягийн мэдээлэл оруулах</Typography>
          <Typography variant="body2" color="Highlight">
            Хүлээгдэж байна
          </Typography>
        </Box>
      </Box>
      <Box my={10} boxShadow={3} gap={10} p={5} borderRadius={2}>
        <Typography variant="subtitle2" fontWeight={600}>
          Хаяг аа оруулна уу
        </Typography>
        <Stack spacing={4}>
          <Select
            onChange={formik.handleChange}
            sx={{ bgcolor: "#ECEDF0" }}
            displayEmpty
            name="duureg"
            value={formik.values.duureg}
          >
            <MenuItem sx={{ backgroundColor: "#18BA51" }}>
              <em>
                <PlaceOutlinedIcon />
                Дүүрэг сонгоно уу
              </em>
            </MenuItem>
            {duureg.map((el) => (
              <MenuItem key={el} value={el}>
                {el}
              </MenuItem>
            ))}
          </Select>
          <Typography color="red">{formik.errors.duureg}</Typography>
          <Select
            name="horoo"
            onChange={formik.handleChange}
            sx={{ bgcolor: "#ECEDF0" }}
            displayEmpty
            value={formik.values.horoo}
          >
            <MenuItem sx={{ backgroundColor: "#18BA51" }}>
              <em>
                <PlaceOutlinedIcon />
                Хороо сонгоно уу
              </em>
            </MenuItem>
            {horoo.map((el) => (
              <MenuItem key={el} value={el}>
                {el}
              </MenuItem>
            ))}
          </Select>
          <Typography color="red">{formik.errors.horoo}</Typography>
          <Select
            onChange={formik.handleChange}
            sx={{ bgcolor: "#ECEDF0" }}
            displayEmpty
            name="buildingNo"
            value={formik.values.buildingNo}
          >
            <MenuItem sx={{ backgroundColor: "#18BA51" }}>
              <em>
                <PlaceOutlinedIcon />
                Байр гудамж сонгоно уу
              </em>
            </MenuItem>
            {bair.map((el) => (
              <MenuItem key={el} value={el}>
                {el}
              </MenuItem>
            ))}
          </Select>{" "}
          <Typography color="red">{formik.errors.buildingNo}</Typography>
        </Stack>
        <Stack spacing={7} marginTop={10}>
          <Box>
            <Typography variant="subtitle2" fontWeight={600}>
              Нэмэлт мэдээлэл
              <TextField
                name="info"
                onChange={formik.handleChange}
                sx={{ bgcolor: "#ECEDF0", width: "100%" }}
                id="outlined-multiline-static"
                multiline
                rows={4}
                placeholder="Орц, давхар, орцны код..."
                value={formik.values.info}
              />
              <Typography color="red">{formik.errors.info}</Typography>
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" fontWeight={600}>
              Утасны дугаар
            </Typography>
            <DefaultInput
              label=""
              errorText={formik.errors.phoneNumber}
              name="phoneNumber"
              onChange={formik.handleChange}
              placeholder="Утасны дугаараа оруулна уу"
            />
          </Box>
          <Box>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                <Typography variant="subtitle2" fontWeight={600}>
                  Төлбөр төлөх
                </Typography>
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="method"
                value={formik.values.method}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value="Qpay"
                  control={<Radio />}
                  label="Qpay"
                />
                <FormControlLabel
                  value="Card"
                  control={<Radio />}
                  label="Картаар"
                />
              </RadioGroup>
            </FormControl>
            <Typography color="red">{formik.errors.method}</Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default Order1;
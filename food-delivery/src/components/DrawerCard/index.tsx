import * as React from "react";
import {
  Box,
  Button as MuiButton,
  Typography,
  Modal,
  Grid,
  Divider,
} from "@mui/material";
import Image from "next/image";
import { Remove, Add, Close } from "@mui/icons-material";

const style = {
  width: 538,
  borderRadius: 5,
};

const backgroundImageStyle = {
  backgroundImage: 'url("/assets/food-1.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  width: "245px",
  height: "150px",
};

export const DrawerCard = () => {
  const [count, setCount] = React.useState(1);

  const handleCount = (operation: string) => {
    if (operation === "sub") {
      if(count === 0){
        setCount(0);
      }else{
        setCount(count - 1);
      }
    } else if (operation === "add") {
      setCount(count + 1);
    }
  };

  return (
    <>
      <Box sx={style} m={5}>
        <Grid container display={"flex"} flexDirection={"row"} gap={10}>
          <Grid item xs={5} style={backgroundImageStyle}></Grid>
          <Grid
            item
            xs={5}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
          >
            <Grid item xs={1} position={"relative"}>
              <MuiButton sx={{ ml: 50, position: "absolute" }}>
                <Close />
              </MuiButton>
            </Grid>
            <Grid display={"flex"} flexDirection={"column"}>
              <Typography fontWeight={600}>Bowl</Typography>
              <Typography sx={{ color: "#18BA51" }} fontWeight={600}>
                18,800
              </Typography>

              <Typography color={"gray"}>
                Өндөг, шош, улаан лооль, өргөст хэмт, байцаа, салмон.
              </Typography>

              <div>
                <MuiButton onClick={() => handleCount("sub")}>
                  <Remove
                    sx={{
                      bgcolor: "#18BA51",
                      color: "white",
                      width: "70%",
                      height: "30px",
                      borderRadius: 2,
                    }}
                  />
                </MuiButton>
                <input
                  type="text"
                  value={count}
                  style={{
                    width: "60px",
                    border: "none",
                    textAlign: "center",
                    paddingTop: 4,
                    paddingBottom: 4,
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                />
                <MuiButton onClick={() => handleCount("add")}>
                  <Add
                    sx={{
                      bgcolor: "#18BA51",
                      color: "white",
                      width: "70%",
                      height: "30px",
                      borderRadius: 2,
                    }}
                  />
                </MuiButton>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Divider />
    </>
  );
};
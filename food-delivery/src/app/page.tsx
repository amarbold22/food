import { Grid, Button, Typography } from "@mui/material";

export default function Home() {
  return (
    <main>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ background: "teal" }}>
          <Typography>Welcome MUI Framework</Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary">Click</Button>
        </Grid>
      </Grid>
    </main>
  )
}

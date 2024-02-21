import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Skeleton from "@mui/material/Skeleton";

interface MediaProps {
  loading?: boolean;
}

function Media() {
  return (
    <Card sx={{ minWidth: 200, maxWidth: 500 }}>
      <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />

      <CardContent>
        <React.Fragment>
          <Skeleton animation="wave" height={10} width="80%" />
          <Skeleton animation="wave" height={10} width="50%" />
        </React.Fragment>
      </CardContent>
    </Card>
  );
}

export default function Skeletons() {
  return (
    <div>
      <Media />
    </div>
  );
}

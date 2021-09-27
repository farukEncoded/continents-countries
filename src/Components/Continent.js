import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import CountryTable from "./CountryTable";

export default function Continent({ continent }) {
  const [showCountryTable, setShowCountryTable] = React.useState(false);

  const onButtonClick = () => {
    setShowCountryTable(!showCountryTable);
  };

  return (
    <Grid
      container
      spacing={3}
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ mt: "1.5rem" }}
    >
      <Box sx={{ minWidth: 500 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography
              sx={{ fontSize: "1.5rem" }}
              color="text.secondary"
              gutterBottom
            >
              Name of the continent
            </Typography>
            <Typography variant="h4" component="div">
              {continent.name}
            </Typography>
            <Typography sx={{ fontSize: "1rem" }} color="text.secondary">
              Code:
            </Typography>
            <Typography sx={{ mb: "1.5rem" }} variant="h5">
              {continent.code}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={onButtonClick}>
              {!showCountryTable
                ? `See All Countries in ${continent.name}`
                : `Close Table`}
            </Button>
          </CardActions>
        </Card>
      </Box>
      {showCountryTable && <CountryTable continentCode={continent.code} />}
    </Grid>
  );
}

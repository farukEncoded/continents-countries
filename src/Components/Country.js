import React from "react";
import { useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid, Skeleton } from "@mui/material";
import Queries from "../Queries";

export default function Country({ countryCode }) {
  const { loading, error, data } = useQuery(Queries.COUNTRY, {
    variables: { code: countryCode },
  });

  if (loading)
    return (
      <Skeleton
        variant="rectangular"
        width={500}
        height={500}
        animation="wave"
      />
    );
  if (error)
    return (
      <Typography variant="h4" sx={{ color: "red" }}>
        Error loading countries: {error.message}
      </Typography>
    );

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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <Typography sx={{ fontSize: "1.5rem" }} color="text.secondary">
                  Name of the country
                </Typography>
                <Typography variant="h4" component="div" gutterBottom>
                  {data.country.name}
                </Typography>
                <Typography sx={{ fontSize: "1.5rem" }} color="text.secondary">
                  Capital
                </Typography>
                <Typography variant="h5" component="div" sx={{ mb: "2rem" }}>
                  {data.country.capital}
                </Typography>
                <Typography sx={{ fontSize: "1rem" }} color="text.secondary">
                  Code:
                </Typography>
                <Typography sx={{ mb: "1.5rem" }} variant="h5">
                  {data.country.code}
                </Typography>
                <Typography sx={{ fontSize: "1rem" }} color="text.secondary">
                  Phone:
                </Typography>
                <Typography sx={{ mb: "1.5rem" }} variant="h5">
                  +{data.country.phone}
                </Typography>
              </div>
              <div>
                <div style={{ marginBottom: "1rem" }}>
                  <Typography color="text.secondary">Emoji-flag</Typography>
                  {data.country.emoji}
                </div>
                <div>
                  <Typography color="text.secondary">Native Script</Typography>
                  <Typography h5 gutterBottom>
                    {data.country.native}
                  </Typography>
                </div>
                <div>
                  <Typography
                    sx={{ fontSize: "1.5rem" }}
                    color="text.secondary"
                  >
                    Continent
                  </Typography>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ mb: "2rem" }}
                    gutterBottom
                  >
                    {data.country.continent.name}({data.country.continent.code})
                  </Typography>
                </div>
                <div>
                  <Typography
                    sx={{ fontSize: "1.5rem" }}
                    color="text.secondary"
                  >
                    Languages
                  </Typography>
                  <Typography variant="h5" component="div" sx={{ mb: "2rem" }}>
                    {data.country.languages.map((lang) => lang.name).join(", ")}
                  </Typography>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
}

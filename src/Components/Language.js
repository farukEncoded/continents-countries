import React from "react";
import { useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid, Skeleton } from "@mui/material";
import Queries from "../Queries";

export default function Language({ langCode }) {
  const { loading, error, data } = useQuery(Queries.LANGUAGE, {
    variables: { code: langCode },
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
        Error loading languages: {error.message}
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
                  Name of the language
                </Typography>
                <Typography variant="h4" component="div" gutterBottom>
                  {data.language.name}
                </Typography>
                <Typography sx={{ fontSize: "1.5rem" }} color="text.secondary">
                  Native Script
                </Typography>
                <Typography variant="h5" component="div" sx={{ mb: "2rem" }}>
                  {data.language.native}
                </Typography>
                <Typography sx={{ fontSize: "1rem" }} color="text.secondary">
                  Code:
                </Typography>
                <Typography sx={{ mb: "1.5rem" }} variant="h5">
                  {data.language.code}
                </Typography>
                <Typography sx={{ fontSize: "1rem" }} color="text.secondary">
                  Writing Orientation:
                </Typography>
                <Typography sx={{ mb: "1.5rem" }} variant="h5">
                  {data.language.rtl ? "RTL" : "LTR"}
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
}

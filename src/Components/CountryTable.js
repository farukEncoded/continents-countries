import React from "react";
import { useQuery } from "@apollo/client";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Queries from "../Queries";
import { Skeleton, Typography } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 170 },
  { field: "code", headerName: "ISO\u00a0Code", width: 100 },
  {
    field: "native",
    headerName: "Native",
    width: 170,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 170,
  },
  {
    field: "capital",
    headerName: "Capital",
    width: 170,
  },
];

export default function CountryTable({ continentCode }) {
  const { loading, error, data } = useQuery(Queries.COUNTRIES_OF_A_CONTINENT, {
    variables: { code: continentCode },
  });

  if (loading)
    return <Skeleton variant="rectangular" width={700} height={500} />;
  if (error)
    return (
      <Typography variant="h4" sx={{ color: "red" }}>
        Error loading countries: {error.message}
      </Typography>
    );
  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        ml: "1rem",
        pl: "1rem",
        mt: "1rem",
      }}
    >
      <Typography textAlign="center" variant="h4">
        Table of countries in {data.continent.name}
      </Typography>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={data.continent.countries.map((country, idx) => ({
            id: idx + 1,
            ...country,
          }))}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>
    </Paper>
  );
}

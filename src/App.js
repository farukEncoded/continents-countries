import { useQuery, useApolloClient } from "@apollo/client";
import React from "react";
import {
  Paper,
  Button,
  Box,
  Grid,
  Autocomplete,
  TextField,
  Skeleton,
  Typography,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Queries from "./Queries";
import Continent from "./Components/Continent";
import Country from "./Components/Country";
import Language from "./Components/Language";

const createOptionsForDropdown = (elements = []) => {
  return elements
    .map((element) => ({
      firstLetter: element.name[0].toUpperCase(),
      ...element,
    }))
    .sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter));
};

const compareOptionToValue = (option, value) => option.name === value.name;

function App() {
  const {
    loading: langsLoading,
    error: langsError,
    data: langsData,
  } = useQuery(Queries.LANGUAGES);
  const {
    loading: countriesLoading,
    error: countriesError,
    data: countriesData,
  } = useQuery(Queries.COUNTRIES);
  const {
    loading: continentsLoading,
    error: continentsError,
    data: continentsData,
  } = useQuery(Queries.CONTINENTS);

  const client = useApolloClient();

  const [selectedValue, setSelectedValue] = React.useState(null);

  const onChange = (_, value) => {
    setSelectedValue(value);
  };

  const clearCache = () => {
    client.clearStore();
    window.localStorage.clear();
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          flexGrow: 1,
          padding: "1rem",
          backgroundColor: "InfoBackground",
          minHeight: "100vh",
        }}
      >
        <Grid container spacing={3} direction="column">
          <Typography
            variant="h2"
            textAlign="center"
            color="secondary"
            gutterBottom
            sx={{ mt: "1rem" }}
          >
            Explore continents, countries and languages
          </Typography>
          <Button onClick={clearCache}>Clear Cached Data</Button>
          <Grid container item justifyContent="space-evenly">
            <Paper>
              {continentsLoading && (
                <Skeleton variant="rectangular" width={300} height={50} />
              )}
              {continentsError && (
                <Typography variant="h5" sx={{ color: "red" }}>
                  Error loading continents data!
                </Typography>
              )}
              {continentsData && (
                <Autocomplete
                  options={createOptionsForDropdown(continentsData.continents)}
                  groupBy={(option) => option.firstLetter}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField {...params} label="Select A Continent" />
                  )}
                  sx={{ width: 300 }}
                  onChange={onChange}
                  isOptionEqualToValue={compareOptionToValue}
                />
              )}
            </Paper>
            <Paper>
              {countriesLoading && (
                <Skeleton variant="rectangular" width={300} height={50} />
              )}
              {countriesError && (
                <Typography
                  variant="h5"
                  color="secondary"
                  sx={{ color: "red" }}
                >
                  Error loading countries data!
                </Typography>
              )}
              {countriesData && (
                <Autocomplete
                  options={createOptionsForDropdown(countriesData.countries)}
                  groupBy={(option) => option.firstLetter}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField {...params} label="Select A Country" />
                  )}
                  sx={{ width: 300 }}
                  onChange={onChange}
                  isOptionEqualToValue={compareOptionToValue}
                />
              )}
            </Paper>
            <Paper>
              {langsLoading && (
                <Skeleton variant="rectangular" width={300} height={50} />
              )}
              {langsError && (
                <Typography
                  variant="h5"
                  color="secondary"
                  sx={{ color: "red" }}
                >
                  Error loading languages data!
                </Typography>
              )}
              {langsData && (
                <Autocomplete
                  options={createOptionsForDropdown(langsData.languages)}
                  groupBy={(option) => option.firstLetter}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField {...params} label="Select A Language" />
                  )}
                  sx={{ width: 300 }}
                  onChange={onChange}
                  isOptionEqualToValue={compareOptionToValue}
                />
              )}
            </Paper>
          </Grid>
          <Grid container item justifyContent="center" alignItems="center">
            {selectedValue && selectedValue.__typename === "Continent" && (
              <Continent continent={selectedValue} />
            )}
            {selectedValue && selectedValue.__typename === "Country" && (
              <Country countryCode={selectedValue.code} />
            )}
            {selectedValue && selectedValue.__typename === "Language" && (
              <Language langCode={selectedValue.code} />
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default App;

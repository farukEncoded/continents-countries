import { gql } from "@apollo/client";
const Queries = {
  CONTINENTS: gql`
    {
      continents {
        code
        name
      }
    }
  `,
  CONTINENT: gql`
    query ($code: ID!) {
      continent(code: $code) {
        code
        name
      }
    }
  `,
  COUNTRIES_OF_A_CONTINENT: gql`
    query ($code: ID!) {
      continent(code: $code) {
        name
        countries {
          code
          name
          native
          phone
          capital
          emoji
        }
      }
    }
  `,
  COUNTRIES: gql`
    {
      countries {
        code
        name
      }
    }
  `,
  COUNTRY: gql`
    query ($code: ID!) {
      country(code: $code) {
        code
        name
        native
        phone
        capital
        emoji
        continent {
          code
          name
        }
        languages {
          name
        }
      }
    }
  `,
  LANGUAGES: gql`
    {
      languages {
        code
        name
      }
    }
  `,
  LANGUAGE: gql`
    query ($code: ID!) {
      language(code: $code) {
        code
        name
        native
        rtl
      }
    }
  `,
};

export default Queries;

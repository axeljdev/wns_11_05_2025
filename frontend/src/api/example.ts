import { gql } from "@apollo/client";

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      id
      name
      code
      emoji
      continent {
        id
      }
    }
  }
`;

export { GET_COUNTRIES };

const ADD_COUNTRY = gql`
  mutation AddCountry($data: NewCountryInput!) {
    addCountry(data: $data) {
      name
      emoji
      code
    }
  }
`;

export { ADD_COUNTRY };

const GET_COUNTRY = gql`
  query GetCountry($code: String!) {
    country(code: $code) {
      id
      name
      emoji
      code
      continent {
        id
        name
      }
    }
  }
`;

export { GET_COUNTRY };

const GET_CONTINENTS = gql`
  query GetContinents {
    continents {
      id
      name
    }
  }
`;

export { GET_CONTINENTS };

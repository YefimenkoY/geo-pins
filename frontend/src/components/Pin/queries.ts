import { gql } from "apollo-boost";

export const pinFragment = gql`
  fragment pin on Pin {
    id
    description
    title
    lat
    lon
    image
    createdAt
    comments {
      text
    }
    author {
      id
      login
      email
    }
  }
`;

export const DELETE_PIN = gql`
  mutation DELETE_PIN($input: DeletePinInput!) {
    DeletePin(input: $input) {
      ...pin
    }
  }
  ${pinFragment}
`;

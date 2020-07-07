import { gql } from "apollo-boost";

import { pinFragment } from "../Pin/queries";

export const CREQTE_PIN_MUTATION = gql`
  mutation CREQTE_PIN_MUTATION($input: CreatePinInput!) {
    CreatePin(input: $input) {
      ...pin
    }
  }
  ${pinFragment}
`;

// export const GET_PIN = gql`
//   query GET_PIN($input: GetPinInput!) {
//     GetPin(input: $input) {
//       id
//       title
//       createdAt
//       description
//       image
//       lat
//       lon

//       author {
//         id
//       }
//       comments {
//         id
//       }
//     }
//   }
// `;

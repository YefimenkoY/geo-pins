/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GET_PINS_QUERY
// ====================================================

export interface GET_PINS_QUERY_GetPins_comments {
  __typename: "Comment";
  text: string;
}

export interface GET_PINS_QUERY_GetPins_author {
  __typename: "User";
  id: string;
  login: string;
  email: string;
}

export interface GET_PINS_QUERY_GetPins {
  __typename: "Pin";
  id: string;
  pinId: string;
  text: string;
  placeName: string;
  placeType: string;
  center: number[];
  createdAt: string;
  comments: (GET_PINS_QUERY_GetPins_comments | null)[] | null;
  author: GET_PINS_QUERY_GetPins_author | null;
}

export interface GET_PINS_QUERY {
  GetPins: GET_PINS_QUERY_GetPins[];
}

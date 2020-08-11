/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetPinInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: GET_PIN
// ====================================================

export interface GET_PIN_GetPin_comments {
  __typename: "Comment";
  text: string;
}

export interface GET_PIN_GetPin_author {
  __typename: "User";
  id: string;
  login: string;
  email: string;
}

export interface GET_PIN_GetPin {
  __typename: "Pin";
  id: string;
  pinId: string;
  text: string;
  placeName: string;
  placeType: string;
  center: number[];
  createdAt: string;
  comments: (GET_PIN_GetPin_comments | null)[] | null;
  author: GET_PIN_GetPin_author | null;
}

export interface GET_PIN {
  GetPin: GET_PIN_GetPin | null;
}

export interface GET_PINVariables {
  input: GetPinInput;
}

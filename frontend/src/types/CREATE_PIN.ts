/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreatePinInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CREATE_PIN
// ====================================================

export interface CREATE_PIN_CreatePin_comments {
  __typename: "Comment";
  text: string;
}

export interface CREATE_PIN_CreatePin_author {
  __typename: "User";
  id: string;
  login: string;
  email: string;
}

export interface CREATE_PIN_CreatePin {
  __typename: "Pin";
  id: string;
  pinId: string;
  text: string;
  placeName: string;
  placeType: string;
  center: number[];
  createdAt: string;
  comments: (CREATE_PIN_CreatePin_comments | null)[] | null;
  author: CREATE_PIN_CreatePin_author | null;
}

export interface CREATE_PIN {
  CreatePin: CREATE_PIN_CreatePin | null;
}

export interface CREATE_PINVariables {
  input: CreatePinInput;
}

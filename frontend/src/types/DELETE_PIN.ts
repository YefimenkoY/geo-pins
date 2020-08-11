/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeletePinInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: DELETE_PIN
// ====================================================

export interface DELETE_PIN_DeletePin_comments {
  __typename: "Comment";
  text: string;
}

export interface DELETE_PIN_DeletePin_author {
  __typename: "User";
  id: string;
  login: string;
  email: string;
}

export interface DELETE_PIN_DeletePin {
  __typename: "Pin";
  id: string;
  pinId: string;
  text: string;
  placeName: string;
  placeType: string;
  center: number[];
  createdAt: string;
  comments: (DELETE_PIN_DeletePin_comments | null)[] | null;
  author: DELETE_PIN_DeletePin_author | null;
}

export interface DELETE_PIN {
  DeletePin: (DELETE_PIN_DeletePin | null)[] | null;
}

export interface DELETE_PINVariables {
  input: DeletePinInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreatePinInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CRETE_PIN_MUTATILN
// ====================================================

export interface CRETE_PIN_MUTATILN_CreatePin_author {
  __typename: "User";
  login: string;
  image: string | null;
}

export interface CRETE_PIN_MUTATILN_CreatePin_comments {
  __typename: "Comment";
  text: string;
}

export interface CRETE_PIN_MUTATILN_CreatePin {
  __typename: "Pin";
  id: string;
  title: string;
  createdAt: string;
  description: string;
  lat: string;
  lon: string;
  author: CRETE_PIN_MUTATILN_CreatePin_author | null;
  comments: (CRETE_PIN_MUTATILN_CreatePin_comments | null)[] | null;
}

export interface CRETE_PIN_MUTATILN {
  CreatePin: CRETE_PIN_MUTATILN_CreatePin | null;
}

export interface CRETE_PIN_MUTATILNVariables {
  input: CreatePinInput;
}

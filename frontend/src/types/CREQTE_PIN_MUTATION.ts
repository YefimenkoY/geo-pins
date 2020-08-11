/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreatePinInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CREQTE_PIN_MUTATION
// ====================================================

export interface CREQTE_PIN_MUTATION_CreatePin_comments {
  __typename: "Comment";
  text: string;
}

export interface CREQTE_PIN_MUTATION_CreatePin_author {
  __typename: "User";
  id: string;
  login: string;
  email: string;
}

export interface CREQTE_PIN_MUTATION_CreatePin {
  __typename: "Pin";
  id: string;
  pinId: string;
  text: string;
  placeName: string;
  placeType: string;
  center: number[];
  createdAt: string;
  comments: (CREQTE_PIN_MUTATION_CreatePin_comments | null)[] | null;
  author: CREQTE_PIN_MUTATION_CreatePin_author | null;
}

export interface CREQTE_PIN_MUTATION {
  CreatePin: CREQTE_PIN_MUTATION_CreatePin | null;
}

export interface CREQTE_PIN_MUTATIONVariables {
  input: CreatePinInput;
}

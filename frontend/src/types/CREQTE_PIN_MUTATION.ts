/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreatePinInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CREQTE_PIN_MUTATION
// ====================================================

export interface CREQTE_PIN_MUTATION_CreatePin_author {
  __typename: "User";
  login: string;
  image: string | null;
}

export interface CREQTE_PIN_MUTATION_CreatePin_comments {
  __typename: "Comment";
  text: string;
}

export interface CREQTE_PIN_MUTATION_CreatePin {
  __typename: "Pin";
  id: string;
  title: string;
  createdAt: string;
  description: string;
  lat: string;
  lon: string;
  author: CREQTE_PIN_MUTATION_CreatePin_author | null;
  comments: (CREQTE_PIN_MUTATION_CreatePin_comments | null)[] | null;
}

export interface CREQTE_PIN_MUTATION {
  CreatePin: CREQTE_PIN_MUTATION_CreatePin | null;
}

export interface CREQTE_PIN_MUTATIONVariables {
  input: CreatePinInput;
}

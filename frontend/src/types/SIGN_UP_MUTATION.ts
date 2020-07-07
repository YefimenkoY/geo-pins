/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SignUpUser } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SIGN_UP_MUTATION
// ====================================================

export interface SIGN_UP_MUTATION_SignUp {
  __typename: "Token";
  token: string | null;
}

export interface SIGN_UP_MUTATION {
  SignUp: SIGN_UP_MUTATION_SignUp;
}

export interface SIGN_UP_MUTATIONVariables {
  input: SignUpUser;
}

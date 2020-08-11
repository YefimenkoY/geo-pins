/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SignInUser } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SIGN_IN_MUTATION
// ====================================================

export interface SIGN_IN_MUTATION_SignIn {
  __typename: "Token";
  token: string | null;
}

export interface SIGN_IN_MUTATION {
  SignIn: SIGN_IN_MUTATION_SignIn;
}

export interface SIGN_IN_MUTATIONVariables {
  input: SignInUser;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GET_CURRENT_USER_QUERY
// ====================================================

export interface GET_CURRENT_USER_QUERY_CurrentUser {
  __typename: "User";
  id: string;
  login: string;
  email: string;
}

export interface GET_CURRENT_USER_QUERY {
  CurrentUser: GET_CURRENT_USER_QUERY_CurrentUser | null;
}

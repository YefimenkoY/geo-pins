/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: pin
// ====================================================

export interface pin_comments {
  __typename: "Comment";
  text: string;
}

export interface pin_author {
  __typename: "User";
  id: string;
  login: string;
  email: string;
}

export interface pin {
  __typename: "Pin";
  id: string;
  pinId: string;
  text: string;
  placeName: string;
  placeType: string;
  center: number[];
  createdAt: string;
  comments: (pin_comments | null)[] | null;
  author: pin_author | null;
}

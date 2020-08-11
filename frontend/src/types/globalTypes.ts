/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreatePinInput {
  pinId: string;
  text: string;
  placeName: string;
  center: (number | null)[];
  placeType: string;
}

export interface DeletePinInput {
  pinId: string;
}

export interface GetPinInput {
  pinId: string;
}

export interface SignInUser {
  login: string;
  password: string;
}

export interface SignUpUser {
  login: string;
  email: string;
  password: string;
  image?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================

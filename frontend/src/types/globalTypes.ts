/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreatePinInput {
  title: string;
  description: string;
  lat: string;
  lon: string;
  image: string;
}

export interface DeletePinInput {
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

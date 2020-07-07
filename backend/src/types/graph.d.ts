export const typeDefs = ["input CreatePinInput {\n  title: String!\n  description: String!\n  lat: String!\n  lon: String!\n  image: String!\n}\n\ntype Mutation {\n  CreatePin(input: CreatePinInput!): Pin\n  SignIn(input: SignInUser!): Token!\n  SignUp(input: SignUpUser!): Token!\n}\n\ntype Query {\n  GetPins: [Pin]!\n  CurrentUser: User\n}\n\ntype Comment {\n  text: String!\n  createdAt: String\n  author: User\n  pin: Pin\n}\n\ntype Pin {\n  id: ID\n  title: String!\n  createdAt: String!\n  description: String!\n  image: String\n  lat: String!\n  lon: String!\n  author: User\n  comments: [Comment]\n}\n\ntype User {\n  id: ID!\n  login: String!\n  email: String!\n  password: String!\n  image: String\n  pins: [Pin]\n  createdAt: String\n  updatedAt: String\n}\n\ntype Token {\n  token: String\n}\n\ninput SignInUser {\n  login: String!\n  password: String!\n}\n\ninput SignUpUser {\n  login: String!\n  email: String!\n  password: String!\n  image: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetPins: Array<Pin>;
  CurrentUser: User | null;
}

export interface Pin {
  id: string | null;
  title: string;
  createdAt: string;
  description: string;
  image: string | null;
  lat: string;
  lon: string;
  author: User | null;
  comments: Array<Comment> | null;
}

export interface User {
  id: string;
  login: string;
  email: string;
  password: string;
  image: string | null;
  pins: Array<Pin> | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface Comment {
  text: string;
  createdAt: string | null;
  author: User | null;
  pin: Pin | null;
}

export interface Mutation {
  CreatePin: Pin | null;
  SignIn: Token;
  SignUp: Token;
}

export interface CreatePinMutationArgs {
  input: CreatePinInput;
}

export interface SignInMutationArgs {
  input: SignInUser;
}

export interface SignUpMutationArgs {
  input: SignUpUser;
}

export interface CreatePinInput {
  title: string;
  description: string;
  lat: string;
  lon: string;
  image: string;
}

export interface SignInUser {
  login: string;
  password: string;
}

export interface Token {
  token: string | null;
}

export interface SignUpUser {
  login: string;
  email: string;
  password: string;
  image: string | null;
}

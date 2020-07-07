/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { DeletePinInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: DELETE_PIN
// ====================================================

export interface DELETE_PIN_DeletePin {
  __typename: "Pin";
  id: string;
}

export interface DELETE_PIN {
  DeletePin: (DELETE_PIN_DeletePin | null)[];
}

export interface DELETE_PINVariables {
  input: DeletePinInput;
}

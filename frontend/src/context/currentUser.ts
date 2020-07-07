import { useState } from "react";
import createUseContext from "constate";
import { GET_CURRENT_USER_QUERY_CurrentUser } from "../types/GET_CURRENT_USER_QUERY";

export default createUseContext(() =>
  useState<GET_CURRENT_USER_QUERY_CurrentUser | null>(null)
);

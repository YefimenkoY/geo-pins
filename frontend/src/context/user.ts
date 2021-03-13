import { useState } from "react"
import constate from "constate"
import { GET_CURRENT_USER_QUERY_CurrentUser } from "../types/GET_CURRENT_USER_QUERY"
import { Maybe } from "types/common"

const [Provider, useUserContext] = constate(() =>
	useState<Maybe<GET_CURRENT_USER_QUERY_CurrentUser>>(),
)

export { Provider, useUserContext }

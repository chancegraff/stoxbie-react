import {
  Map,
} from "immutable";
import {
  atom,
} from "recoil";

import {
  AUTHENTICATED_USER_STATE_KEY,
} from "utils/Constants";

/**
 * @description Authenticated user
 */
export const authenticatedUserState = atom<Map<string, firebase.User>>(
  {
    key: AUTHENTICATED_USER_STATE_KEY,
    default: Map(),
  },
);

import { ADD_ENTRY, RECEIVE_ENTRIES } from "../actions/index";

function entries(state = {}, action) {
  switch (action.type) {
    case RECEIVE_ENTRIES:
      return {
        ...state,
        ...action.payload,
      };
    case ADD_ENTRY:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

export default entries;

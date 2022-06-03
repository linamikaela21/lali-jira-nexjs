import { UIState } from ".";

type UIActionType =
  | { type: "[UI] - Open Sidebar" }
  | { type: "[UI] - Close Sidebar" }
  | { type: "[UI] - Set addingEntry"; payload: boolean }
  | { type: "[UI] - Start Dragging" }
  | { type: "[UI] - End Dragging" };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case "[UI] - Open Sidebar":
      return {
        ...state,
        sidemenuOpen: true,
      };

    case "[UI] - Close Sidebar":
      return {
        ...state,
        sidemenuOpen: false,
      };

    case "[UI] - Set addingEntry":
      return {
        ...state,
        adding: action.payload,
      };

    case "[UI] - Start Dragging":
      return {
        ...state,
        dragging: true,
      };

      case "[UI] - End Dragging":
        return {
          ...state,
          dragging: false,
        };

    default:
      return state;
  }
};

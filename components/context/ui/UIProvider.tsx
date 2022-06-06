import { FC, useReducer } from "react";
import { UIContext } from ".";
import { uiReducer } from "./uiReducer";

export interface UIState {
  sidemenuOpen: boolean;
  adding: boolean;
  dragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  adding: false,
  dragging: false,
};

export const UIProvider: FC = ({ children }: any) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => {
    dispatch({ type: "[UI] - Open Sidebar" });
  };

  const closeSideMenu = () => dispatch({ type: "[UI] - Close Sidebar" });

  const setIsAddingEntry = (adding: boolean) => {
    dispatch({ type: "[UI] - Set addingEntry", payload: adding });
  };

  const setDraggingStart = () => dispatch({ type: "[UI] - Start Dragging" });

  const setDraggingEnd = () => dispatch({ type: "[UI] - End Dragging" });

  return (
    <UIContext.Provider
      value={{
        ...state,
        closeSideMenu,
        openSideMenu,

        setIsAddingEntry,

        setDraggingStart,
        setDraggingEnd,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

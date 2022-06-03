import { createContext } from "react";

interface ContextProps {
  sidemenuOpen: boolean;
  adding: boolean;
  dragging: boolean;

  closeSideMenu: () => void;
  openSideMenu: () => void;
  setIsAddingEntry: (boolean: any) => void;
  setDraggingStart: (dragging: boolean) => void;
  setDraggingEnd: (dragging: boolean) => void; 
}

export const UIContext = createContext({} as ContextProps);

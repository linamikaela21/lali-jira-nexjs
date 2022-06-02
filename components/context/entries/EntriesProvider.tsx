import { FC, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { EntriesContext } from ".";
import { entriesReducer } from ".";
import { Entry } from "../../../interfaces";

export interface EntriesState {
  entries: Entry[];
}
const today = new Date();

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      status: "pending",
      createdAt: today.toDateString(),
    },
    {
      _id: uuidv4(),
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      status: "in-progress",
      createdAt: today.toDateString(),
    },    {
      _id: uuidv4(),
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      status: "completed",
      createdAt: today.toDateString(),
    },
  ],
};

export const EntriesProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};

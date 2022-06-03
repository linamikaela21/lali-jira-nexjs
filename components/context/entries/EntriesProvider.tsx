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
    },
    {
      _id: uuidv4(),
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      status: "completed",
      createdAt: today.toDateString(),
    },
  ],
};

export const EntriesProvider: FC = ({ children }: any) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      status: "pending",
      createdAt: today.toDateString(),
    };
    dispatch({ type: "[Entry] - Add-Entry", payload: newEntry });
  };

  const updateEntry = (entry: Entry) =>
    dispatch({ type: "[Entry] - Update-Entry", payload: entry });

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};

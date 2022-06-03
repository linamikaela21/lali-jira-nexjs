import { FC, useReducer, useEffect } from "react";
import { EntriesContext } from ".";
import { entriesReducer } from ".";
import { entriesApi } from "../../../apis";
import { Entry } from "../../../interfaces";

export interface EntriesState {
  entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC = ({ children }: any) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

  const addNewEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>("/entries", {
      description,
    });
    dispatch({ type: "[Entry] - Add-Entry", payload: data });
  };

  const updateEntry = async ({ _id, description, status }: Entry) => {
    const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
      description,
      status,
    });
    dispatch({ type: "[Entry] - Update-Entry", payload: data });
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>("/entries");
    dispatch({ type: "[Entry] - Refresh-Data", payload: data });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

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

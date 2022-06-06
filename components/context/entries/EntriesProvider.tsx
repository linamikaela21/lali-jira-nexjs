import { FC, useReducer, useEffect, ReactElement } from "react";
import { EntriesContext } from ".";
import { entriesReducer } from ".";
import { useSnackbar } from "notistack";
import { entriesApi } from "../../../apis";
import { Entry } from "../../../interfaces";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";

export interface EntriesState {
  entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC<EntriesState> = ({ children }: any) => {
  const router = useRouter()
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();

  const addNewEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>("/entries", {
      description,
    });
    dispatch({ type: "[Entry] - Add-Entry", payload: data });
  };

  const updateEntry = async (
    { _id, description, status }: Entry,
    showSnackBar = false
  ) => {
    const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
      description,
      status,
    });
    dispatch({ type: "[Entry] - Update-Entry", payload: data });
    if (showSnackBar) {
      enqueueSnackbar("Task Updated", {
        variant: "success",
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      router.push('/')
    }
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

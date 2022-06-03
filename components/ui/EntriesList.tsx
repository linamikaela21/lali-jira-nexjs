import { DragEvent, FC, useContext, useMemo } from "react";
import { List, ListItem, Paper } from "@mui/material";
import { EntryStatus } from "../../interfaces";
import { EntriesContext } from "../context/entries/EntriesContent";
import { UIContext } from "../context/ui";
import { EntryCard } from "./";
import styles from "./EntryList.module.css";

interface Props {
  status: EntryStatus;
}

export const EntriesList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { dragging, setDraggingEnd } = useContext(UIContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries, status]
  );

  const allowDrop = (e: DragEvent<HTMLDivElement>) => e.preventDefault();
  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData("text");
    const entry = entries.find((entry) => entry._id === id)!;
    entry.status = status;
    updateEntry(entry);
    setDraggingEnd(true);
  };

  return (
    <div
      onDrop={onDrop}
      onDragOver={allowDrop}
      className={dragging ? styles.dragging : ""}
    >
      <Paper
        sx={{
          height: "calc(100vh - 180px)",
          overflow: "scroll",
          backgroundColor: "transparent",
          padding: "3px 5px",
        }}
      >
        <List sx={{ opacity: dragging ? 0.3 : 1, transition: "all .3s" }}>
          {entriesByStatus.map((entry) => (
            <ListItem key={entry._id} button>
              <EntryCard entry={entry} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
};

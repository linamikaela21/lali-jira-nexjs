import { DragEvent, FC, useContext } from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Entry } from "../../interfaces";
import { UIContext } from "../context/ui";

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { setDraggingStart, setDraggingEnd } = useContext(UIContext);

  const onDragStart = (e: DragEvent) => {
    e.dataTransfer?.setData("text", entry._id);
    setDraggingStart(true);
  };

  const onDragEnd = () => setDraggingEnd(false);

  return (
    <Card
      sx={{ marginButtom: 0.5, width: "100%" }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {entry.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}
      >
        <Typography variant="body2">{entry.createdAt}</Typography>
      </CardActions>
    </Card>
  );
};

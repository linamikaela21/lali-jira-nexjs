import { FC } from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Entry } from "../../interfaces";

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  return (
    <Card sx={{ marginButtom: 1 }}>
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

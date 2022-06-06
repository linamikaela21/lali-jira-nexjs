import { ChangeEvent, FC, useContext, useMemo, useState } from "react";
import { GetServerSideProps } from "next";
import {
  Button,
  capitalize,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { Layout } from "../../components/layout";
import { EntryStatus, Entry } from "../../interfaces/entry";
import { getEntryById } from "../../database";
import { EntriesContext } from "../../components/context/entries";
import { getFormatDistanceToNow } from "../../utils";

interface Props {
  entry: Entry;
}

const validStatus: EntryStatus[] = ["pending", "in-process", "completed"];

const EntryPage: FC<Props> = ({ entry }) => {
  const { updateEntry } = useContext(EntriesContext);
  const [inputValue, setInputValue] = useState(entry.description);
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<EntryStatus>(entry.status);

  const isNotValid = useMemo(
    () => inputValue.length <= 0 && touched,
    [inputValue, touched]
  );

  const onInputChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  const onStatusSave = (e: ChangeEvent<HTMLInputElement>) =>
    setStatus(e.target.value as EntryStatus);

  const onSave = () => {
    if (inputValue.trim().length === 0) return;

    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    };
    updateEntry(updatedEntry, true);
    setTouched(false);
  };

  return (
    <Layout title={inputValue.substring(0, 15) + "..."}>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Task: ${inputValue}`}
              subheader={`Created ${getFormatDistanceToNow(entry.createdAt)}`}
            />
            <CardContent>
              <TextField
                sx={{ marginY: 2 }}
                fullWidth
                autoFocus
                multiline
                label="New task"
                value={inputValue}
                onChange={onInputChanged}
                helperText={isNotValid && "Enter a task"}
                onBlur={() => setTouched(true)}
                error={isNotValid}
              />
              <FormControl>
                <FormLabel>Status: </FormLabel>
                <RadioGroup row value={status} onChange={onStatusSave}>
                  {validStatus.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                variant="contained"
                startIcon={<SaveRoundedIcon />}
                onClick={onSave}
                disabled={inputValue.length <= 0}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "error.dark",
        }}
      >
        <DeleteRoundedIcon />
      </IconButton>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };
  const entry = await getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      entry,
    },
  };
};

export default EntryPage;

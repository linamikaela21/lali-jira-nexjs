import { ChangeEvent, FC, useContext, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import CancelPresentationRoundedIcon from "@mui/icons-material/CancelPresentationRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { EntriesContext } from "../context/entries";
import { UIContext } from "../context/ui";

export const NewEntry: FC = () => {
  const { addNewEntry } = useContext(EntriesContext);
  const { adding, setIsAddingEntry } = useContext(UIContext);

  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);

  const onTextChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  const onSave = () => {
    if (inputValue.length === 0) return;
    addNewEntry(inputValue);
    setTouched(false);
    setIsAddingEntry(false)
    setInputValue("");
  };

  return (
    <Box sx={{ padding: 1, marginBottom: 1 }}>
      {adding ? (
        <>
          <TextField
            multiline
            fullWidth
            autoFocus
            placeholder="New Entry"
            label="New Entry"
            helperText={inputValue.length <= 0 && touched && "Enter a value"}
            error={inputValue.length <= 0 && touched}
            value={inputValue}
            onChange={onTextChanged}
            onBlur={() => setTouched(true)}
          />
          <Box
            display="flex"
            justifyContent="space-between"
            sx={{ margin: "0.5vh" }}
          >
            <Button
              variant="outlined"
              color="success"
              startIcon={<SaveRoundedIcon />}
              onClick={onSave}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<CancelPresentationRoundedIcon />}
              onClick={() => setIsAddingEntry(false)}
            >
              Cancel
            </Button>
          </Box>
        </>
      ) : (
        <Button
          sx={{ padding: "1vh", margin: "0.3vh" }}
          fullWidth
          variant="outlined"
          color="success"
          startIcon={<AddCircleOutlineRoundedIcon />}
          onClick={() => setIsAddingEntry(true)}
        >
          Add New Task
        </Button>
      )}
    </Box>
  );
};

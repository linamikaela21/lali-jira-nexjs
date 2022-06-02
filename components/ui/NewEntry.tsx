import { FC } from "react";
import { Box, Button, TextField } from "@mui/material";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import CancelPresentationRoundedIcon from "@mui/icons-material/CancelPresentationRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

export const NewEntry: FC = () => {
  return (
    <Box sx={{ padding: "2vw", marginBottom: 2 }}>
      <Button
        sx={{ padding: "1vh", margin: "1vh" }}
        fullWidth
        variant="outlined"
        color="success"
        startIcon={<AddCircleOutlineRoundedIcon />}
      >
        Add New Task
      </Button>
      <TextField
        multiline
        fullWidth
        autoFocus
        placeholder="New Entry"
        label="New Entry"
        helperText="Enter a value"
      />
      <Box display="flex" justifyContent="space-between">
        <Button
          variant="outlined"
          color="success"
          startIcon={<SaveRoundedIcon />}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<CancelPresentationRoundedIcon />}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

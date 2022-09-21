import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";

interface Props {
  showForm: boolean;
  toggleShowForm: () => void;
  addItem: (title: string, body: string, userId: number) => Promise<void>;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const Form = ({ showForm, toggleShowForm, addItem }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [userId, setUserId] = useState<number>(1);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = () => {
    if (!title || !body || !userId) return;
    setSubmitting(true);
    addItem(title, body, userId);
    setTimeout(() => {
      toggleShowForm();
      setTitle("");
      setBody("");
      setUserId(1);
      setSubmitting(false);
    }, 1000);
  };
  return (
    <Modal
      open={showForm}
      onClose={toggleShowForm}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h4"
          sx={{ marginBottom: "16px" }}
        >
          Add an entry
        </Typography>
        <TextField
          id="outlined-basic"
          label="UserId"
          variant="outlined"
          sx={{ marginBottom: "16px" }}
          type="number"
          value={userId}
          onChange={(e) => setUserId(e.target.value as unknown as number)}
          error={userId < 1 && userId !== 0}
          helperText={
            userId < 1 && userId !== 0 ? "Must be greater than 0" : ""
          }
        />

        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          sx={{ marginBottom: "16px" }}
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          error={title.length < 5 && title !== ""}
          helperText={
            title.length < 5 && title !== "" ? "At least 5 characters long" : ""
          }
        />
        <TextField
          id="outlined-basic"
          label="Body"
          variant="outlined"
          sx={{ marginBottom: "16px" }}
          value={body}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBody(e.target.value)
          }
          error={body.length < 10 && body !== ""}
          helperText={
            body.length < 10 && body !== "" ? "At least 10 characters long" : ""
          }
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSubmit()}
          disabled={
            submitting || body.length < 10 || title.length < 5 || userId < 1
          }
        >
          Add Entry
        </Button>
      </Box>
    </Modal>
  );
};

export default Form;

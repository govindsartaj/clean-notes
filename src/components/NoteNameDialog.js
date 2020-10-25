import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

export default function FormDialog(props) {
  const [noteTitle, setNoteTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(noteTitle);
    props.handleNewNote(noteTitle);
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle id="form-dialog-title">Create Note</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Note title"
            type="title"
            fullWidth
            onInput={(e) => setNoteTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button type="submit" onClick={props.handleClose}>
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

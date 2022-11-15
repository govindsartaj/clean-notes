import React, { useState } from "react";
import NoteList from "./List";
import NoteInput from "./NoteInput";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import NoteNameDialog from "./NoteNameDialog";
import { convertToRaw } from "draft-js";
import Divider from "@material-ui/core/Divider";

export default function NotesPanel(props) {
  const initialValue = [
    {
      _id: "5f8f372f4bc4e51d30ff6b38",
      noteBody: "",
      title: "Thoughts",
      created: "1603221295594",
      updated: "1603223803665",
    },
  ];

  const [notes, setNotes] = useState(initialValue);
  const [selectedNote, setSelectedNote] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleNewNote = (newNoteTitle) => {
    let formData = new URLSearchParams();

    formData.append("noteBody", "");
    formData.append("title", newNoteTitle);

    return fetch("http://localhost:8080/notes", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const existingNotes = notes.slice();
        console.log(result);
        existingNotes.unshift(result);
        setNotes(existingNotes);
        setSelectedNote(existingNotes[0]._id);
        setLoaded(true);
      });
  };

  const handleClose = (content) => {
    setOpen(false);
  };

  React.useEffect(() => {
    fetch("http://localhost:8080/notes")
      .then((res) => {
        console.log(res)
        return res.json();
      })
      .then((result) => {
        console.log(result);

        if (result === undefined || result.length === 0) {
          console.log("EMPTY");
          setLoaded(false);
          handleNewNote("First note");
        } else {
          setNotes(result);
          setSelectedNote(result[0]._id);
          setLoaded(true);
        }
      })
      .then(() => {
        console.log(selectedNote);
        setLoaded(true);
      });
  }, []);

  React.useEffect(() => {
    console.log("CHANFED");
  }, [selectedNote]);

  function handleClick(id) {
    if (id !== selectedNote) {
      syncNotes();
      setSelectedNote(id);
      console.debug(id);
    }
  }

  function deleteNote(id) {
    console.log(id);
    fetch("http://localhost:8080/notes/" + id, {
      method: "DELETE",
    })
      .then((res) => {
        console.log(res);

        let existingNotes = notes.slice();

        existingNotes = existingNotes.filter(function (obj) {
          return obj._id !== id;
        });

        setSelectedNote(existingNotes[0]._id);
        setNotes(existingNotes);
      })
      .catch((err) => console.error(err));
  }

  function saveContent(event) {
    const content = JSON.stringify(convertToRaw(event.getCurrentContent()));
    notes.find((obj) => {
      return obj._id === selectedNote;
    }).noteBody = content;
  }

  function syncNotes() {
    console.log("saved");
    const noteTitle = notes.find((obj) => {
      return obj._id === selectedNote;
    }).title;

    const noteBody = notes.find((obj) => {
      return obj._id === selectedNote;
    }).noteBody;

    let formData = new URLSearchParams();

    formData.append("body", noteBody);
    formData.append("title", noteTitle);

    fetch("http://localhost:8080/notes/" + selectedNote, {
      method: "PATCH",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then((res) => {
      console.log(res);
      return true;
    });
  }

  function enableNoteRename(id) {
    console.log("loool" + id);
  }

  function renameNote(title) {
    // let formData = new URLSearchParams();
    // formData.append('title', title)
    // fetch("http://localhost:8080/notes/" + selectedNote, {
    //   method: "PATCH",
    //   body: formData,
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    // }).then((res) => {
    //   console.log(res);
    //   return true;
    // });
  }

  if (!loaded) {
    return <h1>Loading</h1>;
  } else {
    return (
      <Grid container spacing={0}>
        <Grid item xs={4}>
          <Tooltip title="Add note" placement="right">
            <Button
              style={{
                fontSize: "20px",
                minWidth: "30px",
                lineHeight: 1,
                marginTop: 10,
                marginBottom: 3,
                marginLeft: 10,
              }}
              variant="outlined"
              onClick={handleClickOpen}
            >
              +
            </Button>
          </Tooltip>
          <NoteList
            notes={notes}
            handleClick={handleClick}
            deleteNote={deleteNote}
            enableNoteRename={enableNoteRename}
            selectedNote={selectedNote}
          />
        </Grid>
        <Grid item xs={1}>
          <Divider orientation="vertical" flexItem />
        </Grid>
        <Grid item xs={6}>
          <NoteInput
            noteBody={
              notes.find((obj) => {
                console.log(notes);
                return obj._id === selectedNote;
              }).noteBody
            }
            saveContent={saveContent}
            syncNotes={syncNotes}
          />
        </Grid>
        <Grid item xs={1}>
          <Divider orientation="vertical" flexItem />
        </Grid>
        <NoteNameDialog
          open={open}
          handleClose={handleClose}
          handleNewNote={handleNewNote}
        />
      </Grid>
    );
  }
}

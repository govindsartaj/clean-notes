import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListIconMenu from "./ListItemMenu";
import InputBase from "@material-ui/core/InputBase";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
  },
  
}));

function SelectedListItem(props) {
  const classes = useStyles();

  const [selectedNote, setSelectedNote] = useState(props.notes[0]._id);

  const [isShown, setIsShown] = useState({});


  function handleMouseEnter(id) {
    console.log("ENTERED");
    setIsShown({index: id})
  }

  function handleMouseLeave(index) {
    console.log("LEFT");
    setIsShown({index: false})
  }


  return (
    <div className={classes.root}>
      <List
        component="nav"
        aria-label="main mailbox folders"
        className="list-item"
      >
        {props.notes.map((items, i) => {
          return (
            <ListItem
              button
              selected={selectedNote === items._id}
              onClick={() => {
                props.handleClick(items._id);
                setSelectedNote(items._id);
              }}
              key={items._id}
              onMouseEnter={() => handleMouseEnter(items._id)}
              onMouseLeave={() => handleMouseLeave(items._id)}
              style={{minHeight: '80px'}}
            >
              <Grid container>

              <Grid item xs={10}>
              <InputBase
                defaultValue={items.title}
                inputProps={{ "aria-label": "naked" }}
                disabled={false}
              />
              <ListItemText
                    secondary={new Date(items.created).toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}
                  />
              </Grid>
              <Grid item xs={2}>
              {isShown.index === items._id && (
                <ListIconMenu
                  id={items._id}
                  deleteNote={props.deleteNote}
                  enableNoteRename={props.enableNoteRename}
                />
              )}
              </Grid>
              </Grid>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

export default function NoteList(props) {
  return (
    <SelectedListItem
      notes={props.notes}
      handleClick={props.handleClick}
      selectedNote={props.selectedNote}
      deleteNote={props.deleteNote}
      enableNoteRename={props.enableNoteRename}
    />
  );
}

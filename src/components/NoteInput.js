import React from "react";
import MUIRichTextEditor from "mui-rte";

export default function Inputs(props) {
  return (
    <MUIRichTextEditor
      defaultValue={props.noteBody}
      onChange={props.saveContent}
      label="Type something here"
      maxLength={8000}
      onSave={props.syncNotes}
    />
  );
}

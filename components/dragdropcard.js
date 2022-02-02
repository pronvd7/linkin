import React from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];

function DragDrop({handleChange}) {
  return (
    <FileUploader handleChange={handleChange} label="Drag & Drop here to upload"name="file" types={fileTypes} />
  );
}

export default DragDrop;
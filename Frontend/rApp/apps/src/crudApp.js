import React, { useRef } from 'react';
import { useTextFileManagement } from './useTextFileManagement'; // Import the custom hook

function CrudApp() {
  const {
    files,
    selectedFile,
    fileContent,
    editedText,
    isEditing,
    handleFileChange,
    createFile,
    selectFile,
    editFile,
    saveFile,
    deleteFile,
    newFileName,
    setNewFileName,
    setEditedText,
  } = useTextFileManagement(); // Custom hook

  const fileInputRef = useRef();

  return (
    <div>
      <h1>CRUD System for Text Files</h1>
      <input type="file" accept=".txt" ref={fileInputRef} onChange={() => handleFileChange(fileInputRef)} />

      <h2>Create New File:</h2>
      <div>
        <input
          type="text"
          placeholder="Enter file name"
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
        />
        <button className="app-button" onClick={createFile}>Create</button>
      </div>

      <div>
        <h2>Selected File: {selectedFile ? selectedFile.name : 'No File Selected'}</h2>
        {isEditing ? (
          <div>
            <textarea value={editedText} onChange={(e) => setEditedText(e.target.value)} />
            <button className="app-button" onClick={saveFile}>Save</button>
          </div>
        ) : (
          <div>
            <div>Content:</div>
            <pre>{fileContent}</pre>
            <button className="app-button" onClick={editFile}>Edit</button>
            <button className="app-button" onClick={deleteFile}>Delete</button>
          </div>
        )}
      </div>

      <h2>All Files:</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index} onClick={() => selectFile(file)}>
            {file.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CrudApp;

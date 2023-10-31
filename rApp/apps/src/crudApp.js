import React, { useState, useRef } from 'react';

function CrudApp() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [editedText, setEditedText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [newFileName, setNewFileName] = useState('');

  const fileInputRef = useRef(null);

  const handleFileChange = () => {
    const file = fileInputRef.current.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const content = event.target.result;
        setFileContent(content);
      };

      reader.readAsText(file);
    }
  };

  const handleCreateFile = () => {
    if (newFileName) {
      const newFile = {
        name: newFileName + '.txt',
        content: '',
      };
      setFiles([...files, newFile]);
      setNewFileName('');
    }
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setFileContent(file.content);
    setIsEditing(false);
  };

  const handleFileEdit = () => {
    setIsEditing(true);
  };

  const handleFileSave = () => {
    const updatedFiles = files.map((file) => {
      if (file === selectedFile) {
        return { ...file, content: editedText };
      }
      return file;
    });
    setFiles(updatedFiles);
    setIsEditing(false);
  };

  const handleFileDelete = () => {
    const updatedFiles = files.filter((file) => file !== selectedFile);
    setFiles(updatedFiles);
    setSelectedFile(null);
  };

  return (
    <div>
      <h1>CRUD System for Text Files</h1>
      <input
        type="file"
        accept=".txt"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <div>
        <h2>Selected File: {selectedFile ? selectedFile.name : 'No File Selected'}</h2>
        {isEditing ? (
          <div>
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
            <button onClick={handleFileSave}>Save</button>
          </div>
        ) : (
          <div>
            <div>Content:</div>
            <pre>{fileContent}</pre>
            <button onClick={handleFileEdit}>Edit</button>
            <button onClick={handleFileDelete}>Delete</button>
          </div>
        )}
      </div>

      <h2>Create New File:</h2>
      <div>
        <input
          type="text"
          placeholder="Enter file name"
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
        />
        <button onClick={handleCreateFile}>Create</button>
      </div>

      <h2>All Files:</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index} onClick={() => handleFileSelect(file)}>
            {file.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CrudApp;

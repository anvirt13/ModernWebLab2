import { useState } from 'react';

export function useTextFileManagement() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [editedText, setEditedText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [newFileName, setNewFileName] = useState(''); // Define setNewFileName

  const handleFileChange = (fileInputRef) => {
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

  const createFile = () => {
    if (newFileName) {
      const newFile = {
        name: newFileName + '.txt',
        content: '',
      };
      setFiles([...files, newFile]);
      setNewFileName(''); // Reset newFileName
    }
  };

  const selectFile = (file) => {
    setSelectedFile(file);
    setFileContent(file.content);
    setIsEditing(false);
  };

  const editFile = () => {
    setIsEditing(true);
  };

  const saveFile = () => {
    const updatedFiles = files.map((file) => {
      if (file === selectedFile) {
        return { ...file, content: editedText };
      }
      return file;
    });
    setFiles(updatedFiles);
    setIsEditing(false);
  };

  const deleteFile = () => {
    const updatedFiles = files.filter((file) => file !== selectedFile);
    setSelectedFile(null);
    setFiles(updatedFiles);
  };

  return {
    files,
    selectedFile,
    fileContent,
    editedText,
    setEditedText,
    isEditing,
    newFileName,
    setNewFileName,
    handleFileChange,
    createFile,
    selectFile,
    editFile,
    saveFile,
    deleteFile,
  };
}

import React, { Component } from 'react';

class CrudApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      selectedFile: null,
      fileContent: '',
      editedText: '',
      isEditing: false,
      newFileName: '',
    };
  }

  fileInputRef = React.createRef();

  handleFileChange = () => {
    const file = this.fileInputRef.current.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const content = event.target.result;
        this.setState({ fileContent: content });
      };

      reader.readAsText(file);
    }
  };

  handleCreateFile = () => {
    const { newFileName, files } = this.state;
    if (newFileName) {
      const newFile = {
        name: newFileName + '.txt',
        content: '',
      };
      this.setState({
        files: [...files, newFile],
        newFileName: '',
      });
    }
  };

  handleFileSelect = (file) => {
    this.setState({
      selectedFile: file,
      fileContent: file.content,
      isEditing: false,
    });
  };

  handleFileEdit = () => {
    this.setState({ isEditing: true });
  };

  handleFileSave = () => {
    const { files, selectedFile, editedText } = this.state;
    const updatedFiles = files.map((file) => {
      if (file === selectedFile) {
        return { ...file, content: editedText };
      }
      return file;
    });
    this.setState({
      files: updatedFiles,
      isEditing: false,
    });
  };

  handleFileDelete = () => {
    const { files, selectedFile } = this.state;
    const updatedFiles = files.filter((file) => file !== selectedFile);
    this.setState({
      files: updatedFiles,
      selectedFile: null,
    });
  };

  render() {
    const { files, selectedFile, fileContent, editedText, isEditing, newFileName } = this.state;

    return (
      <div>
        <h1>CRUD System for Text Files</h1>
        <input type="file" accept=".txt" ref={this.fileInputRef} onChange={this.handleFileChange} />

        <h2>Create New File:</h2>
        <div>
          <input
            type="text"
            placeholder="Enter file name"
            value={newFileName}
            onChange={(e) => this.setState({ newFileName: e.target.value })}
          />
          <button onClick={this.handleCreateFile}>Create</button>
        </div>
        
        <div>
          <h2>Selected File: {selectedFile ? selectedFile.name : 'No File Selected'}</h2>
          {isEditing ? (
            <div>
              <textarea value={editedText} onChange={(e) => this.setState({ editedText: e.target.value })} />
              <button onClick={this.handleFileSave}>Save</button>
            </div>
          ) : (
            <div>
              <div>Content:</div>
              <pre>{fileContent}</pre>
              <button onClick={this.handleFileEdit}>Edit</button>
              <button onClick={this.handleFileDelete}>Delete</button>
            </div>
          )}
        </div>

       

        <h2>All Files:</h2>
        <ul>
          {files.map((file, index) => (
            <li key={index} onClick={() => this.handleFileSelect(file)}>
              {file.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default CrudApp;

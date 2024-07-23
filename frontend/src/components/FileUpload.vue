<template>
  <div class="upload-container">
    <h2>Upload Your CV in PDF format</h2>
    <!-- Container to hold the buttons and file name display -->
    <div class="button-container">
      <!-- Button to trigger file input -->
      <button @click="triggerFileInput" class="select-button">Select File</button>
      
      <!-- Display selected file name -->
      <p v-if="selectedFile" class="file-name">Selected file: {{ selectedFile.name }}</p>
      
      <!-- Hidden file input -->
      <input type="file" ref="fileInput" @change="onFileChange" style="display:none;" />
      
      <!-- Upload button visible only if a file is selected -->
      <button v-if="selectedFile" @click="uploadFile" class="upload-button">Upload</button>
    </div>
    <!-- Display upload message -->
    <p class="upload-message">{{ uploadMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedFile: null,
      uploadMessage: '',
    };
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click(); // Trigger the file input click
    },
    onFileChange(event) {
      this.selectedFile = event.target.files[0]; // Update selected file
    },
    async uploadFile() {
      if (!this.selectedFile) {
        this.uploadMessage = 'Please select a file';
        return;
      }

      if (this.selectedFile.type !== 'application/pdf') {
        alert('Only PDF files are allowed'); // Notify the user
        this.selectedFile = null; // Clear the selected file
        this.uploadMessage = 'Only PDF files are allowed';
        return;
      }

      const formData = new FormData();
      formData.append('file', this.selectedFile);

      try {
        const response = await axios.post('http://localhost:3000/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const uniqueFileName = response.data.filename;
        alert(`File ${uniqueFileName} uploaded successfully!`); // Notify the user
        this.uploadMessage = `File ${uniqueFileName} uploaded successfully!`;
        this.selectedFile = null; // Clear the selected file
        this.$emit('file-uploaded'); // Emit event if needed
        console.log('File uploaded:', response.data);
      } catch (error) {
        console.error('File upload failed', error);
        this.uploadMessage = `File upload failed: ${error.message}`;
      }
    },
  },
};
</script>

<style scoped>
.upload-container {
  text-align: center;
  margin: 20px auto;
  max-width: 600px;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.select-button,
.upload-button {
  background-color: #3137C9; /* Vuetify primary color */
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 20px;
  transition: background-color 0.3s ease;
}

.select-button:hover,
.upload-button:hover {
  background-color: #170f81; /* Darker shade for hover effect */
}

.file-name {
  font-size: 16px;
  font-weight: bold;
}

.upload-message {
  font-size: 16px;
  font-weight: bold;
  color: #155a8a; /* Red for error messages */
}
</style>

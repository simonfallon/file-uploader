<template>
  <div>
    <h2>Upload a File</h2>
    <!-- Container to hold the buttons and file name display -->
    <div class="button-container">
      <!-- Button to trigger file input -->
      <input type="button" value="Select File" @click="triggerFileInput" /> 
      
      <!-- Display selected file name -->
      <p v-if="selectedFile">Selected file: {{ selectedFile.name }}</p>
      
      <!-- Hidden file input -->
      <input type="file" ref="fileInput" @change="onFileChange" style="display:none;" />
      
      <!-- Upload button visible only if a file is selected -->
      <button v-if="selectedFile" @click="uploadFile">Upload</button>
    </div>
    <!-- Display upload message -->
    <p>{{ uploadMessage }}</p>
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
  /* Optional styling for your buttons and other elements */
  </style>
  
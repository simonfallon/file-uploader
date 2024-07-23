<template>
  <div class="container">
    <h2>File List</h2>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Filename</th>
            <th>Upload Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="file in files" :key="file.filename">
            <td>{{ file.filename }}</td>
            <td>{{ new Date(file.upload_date).toLocaleString() }}</td>
            <td>
              <button class="delete-button" @click="deleteFile(file.filename)">Delete</button>
              <button class="download-button" @click="downloadFile(file.filename)">Download</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="files.length === 0">No files available.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const apiUrl = process.env.VUE_APP_API_URL;

export default {
  data() {
    return {
      files: [],
    };
  },
  async created() {
    this.fetchFiles();
  },
  methods: {
    async fetchFiles() {
      try {
        const response = await axios.get(`${apiUrl}/files`);
        this.files = response.data;
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    },
    async deleteFile(filename) {
      if (!confirm(`Are you sure you want to delete this file (${filename})?`)) {
        return; // Exit if the user clicks "Cancel"
      }

      try {
        await axios.delete(`${apiUrl}/files/${filename}`);
        this.fetchFiles(); // Refresh the file list
        alert(`File ${filename} deleted successfully!`); // Notify the user
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    },
    async downloadFile(filename) {
      try {
        const response = await axios.get(`${apiUrl}/download/${filename}`, {
          responseType: 'blob', // Important: responseType must be 'blob'
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        alert(`File ${filename} downloaded successfully!`); // Notify the user
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px; /* Add some margin at the top */
}

.table-container {
  width: 100%; /* Full width */
  max-width: 1200px; /* Limit the width */
  max-height: 600px; /* Limit the height and enable scrolling */
  overflow-y: auto; /* Vertical scrolling */
  border: 1px solid #ddd; /* Light border for the table container */
  border-radius: 8px; /* Rounded corners */
  background: linear-gradient(135deg, #ffffff, #e0e4fc); /* Light blue gradient */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  padding: 10px; /* Add padding */
}

.table-container th {
  font-size: 1.3em; /* Adjust the font size as needed */
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: auto; /* Adjust column widths based on content */
}

thead th {
  position: sticky;
  top: 0;
  background-color: #0b437b; /* Primary color */
  color: white;
  border: 1px solid #ddd; /* Light border for header cells */
  z-index: 1; /* Keeps header above content */
}

th, td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd; /* Light border for table cells */
}

thead th:nth-child(1), tbody td:nth-child(1) {
  width: 40%; /* Width for Filename column */
}

thead th:nth-child(2), tbody td:nth-child(2) {
  width: 40%; /* Width for Upload Date column */
}

thead th:nth-child(3), tbody td:nth-child(3) {
  width: 20%; /* Narrow width for Actions column */
  text-align: center; /* Center-align content in the Actions column */
}

td {
  word-wrap: break-word; /* Break long words onto the next line */
}

.delete-button, .download-button {
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px; /* Rounded corners for button */
  font-size: 16px; /* Slightly smaller font size */
}
.delete-button {
  background-color: #ab1010; /* Red color for delete button */
  margin-right: 15px; /* Add some margin between buttons */
  margin-bottom: 1.5px;   /* Margin for mobile view */
}

.download-button {
  background-color: #3137C9; /* Primary color for button */
  margin-top: 1.5px;  /* Margin for mobile view */
}

.delete-button:hover {
  background-color: #6b0b0b; /* Darker shade for hover effect */
}

.download-button:hover {
  background-color: #170f81; /* Darker shade for hover effect */
}

.no-files-message {
  color: #1976d2; /* Blue color for "No files available" message */
  font-style: italic;
}

@media (max-width: 768px) {
  .table-container {
    width: 95%; /* Make table container almost full width on smaller screens */
  }

  table {
    font-size: 14px; /* Slightly smaller text on smaller screens */
  }

  thead th, tbody td {
    padding: 8px; /* Reduced padding on smaller screens */
  }
}
</style>

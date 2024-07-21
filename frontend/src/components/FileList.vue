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
              <button @click="deleteFile(file.filename)">Delete</button>
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
        const response = await axios.get('http://localhost:3000/api/files');
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
        await axios.delete(`http://localhost:3000/api/files/${filename}`);
        this.fetchFiles(); // Refresh the file list
        alert(`File ${filename} deleted successfully!`); // Notify the user
      } catch (error) {
        console.error('Error deleting file:', error);
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
}

.table-container {
  width: 60%; /* Adjust width as needed */
  max-height: 400px; /* Adjust height as needed */
  overflow-y: auto; /* Enables vertical scrolling */
  border: 1px solid black; /* Adds border around the table container */
  background-color: white; /* White background for the table itself */
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed; /* Ensures columns do not expand excessively */
}

thead th {
  position: sticky;
  top: 0;
  background-color: #f4f4f4; /* Ensures header has a background color */
  border: 1px solid black; /* Adds border to table header cells */
  z-index: 1; /* Ensures header is above the table content */
}

th, td {
  padding: 10px;
  text-align: left;
  border: 1px solid black; /* Adds black border to table cells */
}

thead th:nth-child(1), tbody td:nth-child(1) {
  width: 60%; /* Width for Filename column */
}

thead th:nth-child(2), tbody td:nth-child(2) {
  width: 30%; /* Width for Upload Date column */
}

thead th:nth-child(3), tbody td:nth-child(3) {
  width: 10%; /* Narrow width for Actions column */
  text-align: center; /* Center-align content in the Actions column */
}

td {
  word-wrap: break-word; /* Allows long words to break and wrap onto the next line */
}

button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

button:hover {
  background-color: #d32f2f;
}
</style>
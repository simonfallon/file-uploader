<template>
  <li>
    {{ file.name }} - {{ file.uploadDate }}
    <button @click="deleteFile">Delete</button>
  </li>
</template>

<script>
import axios from 'axios';

export default {
  props: ['file'],
  methods: {
    async deleteFile() {
        if (!confirm(`Are you sure you want to delete this file (${this.file.name})?`)) {
            return;
        }

        try {
            await axios.delete(`http://localhost:3000/api/files/${this.file.name}`);
            this.$emit('file-deleted'); // Emit an event to notify parent component
        } catch (error) {
            console.error('Failed to delete file', error);
        }
    },
  },
};
</script>

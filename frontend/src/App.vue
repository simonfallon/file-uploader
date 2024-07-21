<template>
  <div id="app">
    <h1>File Upload App</h1>
    <FileUpload @file-uploaded="fetchFiles" />
    <FileList ref="fileList" />
  </div>
</template>

<script>
import FileUpload from './components/FileUpload.vue';
import FileList from './components/FileList.vue';

export default {
  components: {
    FileUpload,
    FileList,
  },
  methods: {
    fetchFiles() {
      this.$refs.fileList.fetchFiles();
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title class="d-flex align-center">
        <span class="app-title">Upload your </span>
        <img alt="App logo" src="/logo.png" class="app-logo mr-3" siz>
      </v-toolbar-title>
    </v-app-bar>
    <v-container fluid fill-height>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card class="pa-4">
            <v-card-actions class="justify-center">
              <FileUpload @file-uploaded="fetchFiles" />
            </v-card-actions>
            <FileList ref="fileList" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
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
.app-logo {
  height: 40px; /* Adjust this value to ensure the logo is not too big */
  width: auto;  /* Maintain aspect ratio */
  margin-left: 10px;
}
.app-title {
  font-size: 2rem; /* Adjust this value to ensure the text size matches your needs */
  /* Bold and italicize the text */
  font-weight: bold;
  line-height: 40px; /* Adjust this value to ensure the text size matches the logo height */
  font-family: Tahoma;
}

.custom-table th {
  font-size: 10em; /* Adjust the font size as needed */
}
</style>

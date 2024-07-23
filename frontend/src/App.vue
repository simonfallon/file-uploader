<template>
  <v-app>
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
#app {
  font-family: Tahoma;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  background-color: #f7f7ff;
  min-height: 100vh;
}
.custom-table th {
  font-size: 10em; /* Adjust the font size as needed */
}
</style>

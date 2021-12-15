<template>
  <h2>File Details von {{ fileversions.title }}</h2>
  <div class="container">
    <div class="left">
      <ul id="fileliste" v-if="fileversions">
        <li
          class="file"
          v-for="(value, index) in fileversions.files"
          v-bind:key="value"
          @click="selectedFileChange(index)"
        >
          <p class="title">{{ value.title }}</p>
          <p>&nbsp;|&nbsp;</p>

          <p class="date">{{ getDate(value.createdAt) }}</p>
        </li>
      </ul>
    </div>
    <div class="right" v-if="selectedFile.title">
      <p>Inhalt : {{ selectedFile?.content }}</p>
      <br />
      <p>Erstellt am : {{ getDate(selectedFile?.createdAt) }}</p>
    </div>
  </div>
  <div class="uploadFile">
    <UploadButton :id="id" />
  </div>
  <div class="deleteButton" @click="deleteFileVersion()">
    <button>Alle Files löschen</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { File } from "../types/File.interface";
import { FileVersions } from "../types/FileVersions.interface";
import UploadButton from "../components/UploadButton.vue";
import { mapGetters } from "vuex";

export default defineComponent({
  components: { UploadButton },

  data() {
    return {
      selectedFile: {} as File,
      id: window.location.pathname.split("/")[2],
    };
  },

  computed: {
    ...mapGetters("fileversions", ["getFileVersionById"]),
    fileversions(): FileVersions {
      return this.getFileVersionById(this.id);
    },
  },
  methods: {
    selectedFileChange(index: number): void {
      const currentFile = (this.fileversions.files as Array<File>)[index];
      this.selectedFile = currentFile;
    },
    getDate(value: Date): string {
      var dt = new Date(value);
      var dtd = dt.getDay();
      var dtm = dt.getMonth();
      var dty = dt.getFullYear();
      return dtd + "/" + dtm + "/" + dty;
    },
    deleteFileVersion() {
      this.$store.dispatch("fileversions/deleteFileVersion", { id: this.id });
      this.$router.push("/files");
    },
  },
});
</script>

<style lang="scss" scoped>
h2 {
  text-align: left;
}

.container {
  display: flex;
  margin-top: 10%;
}
.left {
  width: 50%;
}
.right {
  width: 50%;
  height: 100%;
  background-color: rgb(150, 137, 137) !important;
  border: 5px 5px 5px 5px;
}

.icon {
  margin-bottom: 1.5rem;
}

.file {
  cursor: pointer;
  p {
    display: inline;
  }

  .title {
    font-weight: bold;
  }
}

.uploadFile {
  margin-top: 4rem;
}

.deleteButton {
  margin-top: 4rem;
}
</style>

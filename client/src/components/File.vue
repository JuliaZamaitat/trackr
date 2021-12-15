<template>
  <h2>File Details von {{ currentFileVersion.title }}</h2>
  <div class="container">
    <div class="left">
      <ul id="fileliste">
        <li
          class="file"
          v-for="(value, index) in fileVersions"
          v-bind:key="value"
          @click="selectedFileChange(index)"
        >
          <p class="title">{{ value.title }}</p>
          <p>&nbsp;|&nbsp;</p>

          <p class="date">{{ getDate(value.created_at) }}</p>
        </li>
      </ul>
    </div>
    <div class="right">
      <p>Inhalt : {{ selectedFile?.content }}</p>
      <br />
      <p>Erstellt am : {{ getDate(selectedFile?.created_at) }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { FileVersions } from "../types/FileVersions.interface";
import { File } from "../types/File.interface";

export default defineComponent({
  data() {
    return {
      currentFileVersion: {} as FileVersions,
      currentId: Number(window.location.pathname.split("/")[2]).toString(),
      selectedFile: {} as File,
      fileVersions: [] as FileVersions[],
      allFileVersions: [
        {
          title: "Meine ersten Files",
          id: "2",
          files: [
            {
              id: "10",
              title: "Hello",
              content: "Lorem Ipsum ....",
              created_at: Date().toString(),
            },
            {
              id: "20",
              title: "Hello2",
              content: "Lorem Ipsum 2",
              created_at: Date().toString(),
            },
          ] as File[],
        },

        {
          title: "Meine zweiten Files",
          id: "3",
          files: [
            {
              id: "210",
              title: "Testtest",
              content: "Lorem Ipsum testete",
              created_at: Date().toString(),
            },
            {
              id: "213",
              title: "Testtest2222",
              content: "Lorem Ipsum xsxsxsxsqqwq",
              created_at: Date().toString(),
            },
          ] as File[],
        },
      ],
    };
  },

  mounted() {
    for (const file in this.allFileVersions) {
      const element = this.allFileVersions[file];
      if (element.id == this.currentId) {
        this.currentFileVersion = element;
        for (const currentFile in element.files) {
          this.fileVersions.push(element.files[currentFile]);
        }
      }
    }
  },
  methods: {
    selectedFileChange(index: number): void {
      const currentFile = this.fileVersions[index];
      this.selectedFile = currentFile;
    },
    getDate(value: Date): string {
      var dt = new Date(value);
      var dtd = dt.getDay();
      var dtm = dt.getMonth();
      var dty = dt.getFullYear();
      return dtd + "/" + dtm + "/" + dty;
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
</style>

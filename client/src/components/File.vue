<template>
  <div class="container">
    <h2>File Details</h2>
    <div class="left">
      <ul id="fileliste">
        <li
          v-for="(value, index) in fileVersions"
          v-bind:key="value"
          @click="selectedFileChange(index)"
        >
          {{ value.title }}
        </li>
      </ul>
    </div>
    <div class="right">
      <p>content : {{ selectedFile?.content }}</p>
      <br />
      <p>created_at : {{ selectedFile?.created_at }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  // el: "#fileliste",
  data() {
    return {
      currentFiles: [],
      currentId: Number(window.location.pathname.split("/")[2]),
      selectedFile: { id: 0, title: "", content: "", created_at: null },
      fileVersions: [] as Array<any>,
      allFileVersions: [
        //So sehen die Daten später aus, die wir über die API Schnittstelle bekommen
        {
          title: "Meine ersten Files",
          id: 2,
          files: [
            {
              id: 10,
              title: "Hello",
              content: "Lorem Ipsum ....",
              created_at: Date(),
            },
            {
              id: 20,
              title: "Hello2",
              content: "Lorem Ipsum 2",
              created_at: Date(),
            },
          ],
        },

        {
          title: "Meine zweiten Files",
          id: 3,
          files: [
            {
              id: 210,
              title: "Testtest",
              content: "Lorem Ipsum testete",
              created_at: Date(),
            },
            {
              id: 213,
              title: "Testtest2222",
              content: "Lorem Ipsum xsxsxsxsqqwq",
              created_at: Date(),
            },
          ],
        },
      ],
    };
  },

  mounted() {
    for (const file in this.allFileVersions) {
      const element = this.allFileVersions[file];
      if (element.id == this.currentId) {
        for (const currentFile in element.files) {
          this.fileVersions.push(element.files[currentFile]);
        }
      }
    }
  },
  methods: {
    selectedFileChange(index: any) {
      const currentFile = this.fileVersions[index];
      this.selectedFile = currentFile;
    },
  },
});
</script>

<style lang="scss" scoped>
h2 {
  text-align: left;
}

.fileVersions {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  margin-block: 3rem;
  gap: 2rem;
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
</style>

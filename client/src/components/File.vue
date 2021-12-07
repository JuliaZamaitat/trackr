<template>
  <div class="container">
    <h2>File Details</h2>
    <!-- <font-awesome-icon class="icon" :icon="['fas', 'fa-file']" size="2x" /> -->

    <div class="left">
      <ul id="fileliste">
        <li
          v-for="value in getFiles(fileVersions, currentId)"
          v-bind:key="value"
          @click="selectedFileChange(value.id)"
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
export default {
  el: "#fileliste",
  data: function (vm: any) {
    return {
      currentFiles: [],
      currentId: Number(window.location.pathname.split("/")[2]),
      selectedFile: { id: 0, title: "", content: "", created_at: null },
      fileVersions: [
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
              title: "Testtest",
              content: "Lorem Ipsum xsxsxsxsqqwq",
              created_at: Date(),
            },
          ],
        },
      ],
    };
  },
  methods: {
    // Get Files Method
    getFiles: (fileVersions: any, currentId: any): any =>
      fileVersions.find((x: any) => x.id == currentId)?.files,
    // Get Selected File Method
    selectedFileChange: function (id: any): any {
      var vm: any = this;
      const currentFiles = vm.fileVersions.find(
        (x: any) => x.id == vm.currentId
      )?.files;
      const selectedFile = currentFiles.find((x: any) => x.id == id);
      // vm.selectedFile = { content: selectedFile.content };
      vm.selectedFile = selectedFile;
    },
  },
  mounted: () => {
    console.log("Component Mounted.");
  },
  created: () => {
    console.log("Component Created...");
    var vm: any = this;
  },
};
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

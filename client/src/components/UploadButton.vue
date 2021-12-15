<template>
  <label for="file-upload" class="upload">
    Upload File
    <input
      id="file-upload"
      ref="file"
      @change="handleFileUpload($event)"
      type="file"
      accept=".md"
    />
  </label>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      file: {} as File | undefined,
    };
  },
  methods: {
    handleFileUpload(event: Event): void {
      const target = event.target as HTMLInputElement;
      this.file = target.files ? target.files[0] : undefined;
      const fileName = target.value.split(/(\\|\/)/g).pop();
      if (!this.file) return;
      let formData = new FormData();
      formData.append("file", this.file);
      this.$store.dispatch("fileversions/addFileToFileVersion", {
        id: this.id,
        file: {
          title: fileName,
          content: formData.toString(),
        },
      });
    },
  },
});
</script>

<style scoped lang="scss">
.upload {
  padding: 0.8em;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  background-color: #42b983;
  color: var(--clr-white);
  border: none;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  font-weight: 500 !important;

  &:hover {
    background-color: #2ee59d;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
  }
}
input[type="file"] {
  display: none;
}
</style>

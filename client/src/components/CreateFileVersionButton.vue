<template>
  <button @click="createFileVersions" class="fileversion-creation">
    Create FileVersion
  </button>
  <Modal
    class="modal"
    v-show="showModal"
    v-on:confirm="confirm"
    v-on:cancel="cancel"
    >>
    <template v-slot:header>Wähle einen Titel</template>
    <template v-slot:body
      ><input
        v-model="title"
        style="border: 1px solid black; width: 100%"
        type="text"
    /></template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Modal from "./Modal.vue";

export default defineComponent({
  components: { Modal },
  data() {
    return {
      showModal: false,
      title: "Mein Titel",
    };
  },
  methods: {
    createFileVersions(): void {
      this.showModal = true;
    },
    confirm(): void {
      this.showModal = false;
      this.$store.dispatch("fileversions/createFileVersion", {
        title: this.title,
      });
    },
    cancel(): void {
      this.showModal = false;
    },
  },
});
</script>

<style scoped lang="scss">
button {
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
</style>

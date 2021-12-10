<template>
  <div>
    <h2>Your File Collection</h2>
    <!-- <font-awesome-icon class="icon" :icon="['fas', 'fa-file']" size="2x" /> -->
    <div class="fileVersions">
      <div v-for="files in fileVersions" :key="files.id">
        <router-link
          :to="{
            path: `/files/${files.id}`,
            props: { files: files },
          }"
        >
          <i class="fas fa-file fa-5x"></i>
        </router-link>
        {{ files.title }}
      </div>
    </div>
    <UploadButton />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UploadButton from "../components/UploadButton.vue";

export default defineComponent({
  components: { UploadButton },
  mounted() {
    // this.$store.dispatch("fileversions/fetchFileVersions");
  },
  data() {
    return {
      fileVersions: [
        //So sehen die Daten später aus, die wir über die API Schnittstelle bekommen
        {
          title: "Meine ersten Files",
          id: 2,
          files: [
            {
              title: "Hello",
              content: "Lorem Ipsum ....",
              created_at: Date.now().toString,
            },
            {
              title: "Hello2",
              content: "Lorem Ipsum 2",
              created_at: Date.now().toString,
            },
          ],
        },

        {
          title: "Meine zweiten Files",
          id: 3,
          files: [
            {
              title: "Testtest",
              content: "Lorem Ipsum ....",
              created_at: Date.now().toString,
            },
            {
              title: "Testtest",
              content: "Lorem Ipsum 2",
              created_at: Date.now().toString,
            },
          ],
        },
      ],
    };
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
  margin-block: 5rem;
  gap: 2rem;
  pointer-events: none;
}

::v-deep .fa-file {
  display: block;
  margin: 0 auto;
  pointer-events: all;
  margin-bottom: 0.7rem;
  transition: all 0.3s ease 0s;

  &:hover {
    color: #2ee59d;
    transform: translateY(-7px);
  }
}
</style>

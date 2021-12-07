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
          <div class="icon">
            <i class="fas fa-file fa-5x"></i>
          </div>
        </router-link>
        {{ files.title }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
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
  margin-block: 3rem;
  gap: 2rem;
}

.icon {
  margin-bottom: 1.5rem;
}
</style>

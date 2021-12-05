<template>
  <div>
    <h2>File Details</h2>
    <!-- <font-awesome-icon class="icon" :icon="['fas', 'fa-file']" size="2x" /> -->
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      fileVersions: [
        //So sehen die Daten später aus, die wir über die API Schnittstelle bekommen
        {
          title: "Meine ersten Files",
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

.icon {
  margin-bottom: 1.5rem;
}
</style>

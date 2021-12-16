<template>
  <div>
    <h2>Your File Collection</h2>
    <div class="fileVersions" v-if="!pending">
      <div v-for="fileVersions in this.fileVersions" :key="fileVersions.id">
        <router-link
          :to="{
            path: `/files/${fileVersions._id}`,
          }"
        >
          <i class="fas fa-file fa-5x"></i>
        </router-link>
        {{ fileVersions.title }}
      </div>
    </div>
    <CreateFileVersionButton />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CreateFileVersionButton from "../components/CreateFileVersionButton.vue";
import { mapState } from "vuex";

export default defineComponent({
  components: { CreateFileVersionButton },
  data() {
    return {
      pending: false,
    };
  },
  async mounted() {
    this.pending = true;
    await this.$store.dispatch("fileversions/fetchFileVersions");
    if (this.fileVersions) {
      this.pending = false;
    }
  },
  computed: {
    ...mapState("fileversions", ["fileVersions"]),
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

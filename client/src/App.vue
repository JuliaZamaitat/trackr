<template>
  <div id="nav">
    <Header />
    <router-link to="/">Home</router-link> |
    <router-link to="/files">Files</router-link>
  </div>
  <router-view />
</template>

<script lang="ts">
import Header from "./components/Header.vue";

export default {
  components: {
    Header,
  },
};
</script>

<style lang="scss">
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

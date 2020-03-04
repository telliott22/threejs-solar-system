<template>
  <div id="app">
    <div
      class="page--loading"
      v-if="loadedModelsCount !== modelsCount"
    >
      <h1 class="
      loadingText">LOADING</h1>
      <h2>Best viewed on desktop :)</h2>
    </div>
    <div v-show="loadedModelsCount === modelsCount">
      <Nav />
      <three-canvas />
      <facts />
    </div>
  </div>
</template>

<script>
import ThreeCanvas from "./components/ThreeCanvas.vue";
import Nav from "./components/Nav";
import Facts from "./components/Facts";

export default {
  name: "App",

  components: {
    ThreeCanvas,
    Nav,
    Facts
  },
  data() {
    return {
      loadedModelsCount: 0,
      modelsCount: 10
    };
  },
  mounted() {}
};
</script>


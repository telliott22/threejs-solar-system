<template>
  <div id="app">
    <Nav />
    <three-canvas />
    <facts />
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
  }
};
</script>


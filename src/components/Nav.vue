<template>
  <nav class="nav">

    <ul class="nav__list">
      <li
        class="nav__list-item"
        :class="{'selected': selectedPlanet === 'sun'}"
        @click="navClicked('sun')"
      >Sun</li>
      <li
        class="nav__list-item"
        :class="{'selected': selectedPlanet === 'mercury'}"
        @click="navClicked('mercury')"
      >Mercury</li>
      <li
        class="nav__list-item"
        :class="{'selected': selectedPlanet === 'venus'}"
        @click="navClicked('venus')"
      >Venus</li>
      <li
        class="nav__list-item"
        :class="{'selected': selectedPlanet === 'earth'}"
        @click="navClicked('earth')"
      >Earth</li>
      <li
        class="nav__list-item"
        :class="{'selected': selectedPlanet === 'mars'}"
        @click="navClicked('mars')"
      >Mars</li>
      <li
        class="nav__list-item"
        :class="{'selected': selectedPlanet === 'jupiter'}"
        @click="navClicked('jupiter')"
      >Jupiter</li>
      <li
        class="nav__list-item"
        :class="{'selected': selectedPlanet === 'saturn'}"
        @click="navClicked('saturn')"
      >Saturn</li>
      <li
        class="nav__list-item"
        :class="{'selected': selectedPlanet === 'uranus'}"
        @click="navClicked('uranus')"
      >Uranus</li>
      <li
        class="nav__list-item"
        :class="{'selected': selectedPlanet === 'neptune'}"
        @click="navClicked('neptune')"
      >Neptune</li>
    </ul>

  </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Nav",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState(["selectedPlanet"])
  },
  mounted() {},
  methods: {
    navClicked(planet) {
      this.$store.dispatch("SELECT_PLANET", planet);
    }
  }
};
</script>








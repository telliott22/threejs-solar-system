<template>
  <section
    class="facts"
    v-if="selectedPlanet && !hideFacts"
  >

    <h2 v-html="selectedPlanet.charAt(0).toUpperCase() + selectedPlanet.slice(1)"></h2>

    <ul>
      <li
        v-for="(fact,index) in selectedPlanetsFacts"
        :key="index"
        v-html="fact"
      />
    </ul>
    <!-- 
    <input
      type="number"
      v-model="planetZ"
      placeholder="Z rotation"
    >
    <input
      type="number"
      v-model="planetX"
      placeholder="Z rotation"
    >
    <input
      type="number"
      v-model="planetY"
      placeholder="Z rotation"
    > -->

  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Nav",
  components: {},
  data() {
    return {
      planetZ: 0,
      planetY: 0,
      planetX: 0,
      hideFacts: false,
      facts: {
        sun: {
          facts: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt",
            "Mollit anim id est laborum"
          ]
        },
        mercury: {
          facts: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt",
            "Mollit anim id est laborum"
          ]
        },
        venus: {
          facts: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt",
            "Mollit anim id est laborum"
          ]
        },
        earth: {
          facts: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt",
            "Mollit anim id est laborum"
          ]
        },
        mars: {
          facts: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt",
            "Mollit anim id est laborum"
          ]
        },
        jupiter: {
          facts: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt",
            "Mollit anim id est laborum"
          ]
        },
        saturn: {
          facts: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt",
            "Mollit anim id est laborum"
          ]
        },
        uranus: {
          facts: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt",
            "Mollit anim id est laborum"
          ]
        },
        neptune: {
          facts: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt",
            "Mollit anim id est laborum"
          ]
        }
      }
    };
  },
  computed: {
    ...mapState(["selectedPlanet"]),
    selectedPlanetsFacts() {
      return this.facts[this.selectedPlanet].facts;
    }
  },
  watch: {
    selectedPlanet(newVal) {
      this.hideFacts = true;

      setTimeout(() => {
        this.hideFacts = false;
      }, 1000);
    },
    planetZ(newVal) {
      let rotation = {
        z: newVal,
        y: this.planetY,
        x: this.planetX
      };

      this.$store.dispatch("SET_PLANET_ROTATION", rotation);
    }
    // planetX(newVal) {
    //   let rotation = {
    //     z: this.planetZ,
    //     y: this.planetY,
    //     x: newVal
    //   };

    //   this.$store.dispatch("SET_PLANET_ROTATION", rotation);
    // }
  },
  mounted() {},
  methods: {
    // setPlanetRotation() {
    //   let rotation = {
    //     z: planetZ,
    //     y: planetY,
    //     x: planetX
    //   };
    //   this.$store.dispatch("SET_PLANET_ROTATION", rotation);
    // }
  }
};
</script>








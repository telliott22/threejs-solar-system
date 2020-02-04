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

  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Nav",
  components: {},
  data() {
    return {
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
    }
  },
  mounted() {},
  methods: {}
};
</script>








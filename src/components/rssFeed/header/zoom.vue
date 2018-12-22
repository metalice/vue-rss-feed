<template>
  <v-slider
    v-model="zoom"
    label="Zoom"
    @change="clickedZoom(zoom)"
    :tick-labels="ticksLabels"
    :max="5"
    step="1"
    ticks="always"
    tick-size="2"
  ></v-slider>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "zoom",
  data() {
    return {
      zoom: 1,
      ticksLabels: [0, 1, 2, 3, 4, 5]
    };
  },
  methods: { ...mapActions(["clickedZoom"]) }
};
</script>

<style scoped>
</style>
<template>
  <v-text-field v-model="value" label="Search" @input="searchInRss(value)" placeholder="Search"></v-text-field>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "search",
  data() {
    return {
      value: ""
    };
  },
  methods: { ...mapActions(["searchInRss"]) }
};
</script>

<style scoped>
</style>
<template>
  <div>
    <p>
      <span :id="id">
        <v-btn depressed color="primary" @click="clickedNameOfRss({name, id})">{{name}}</v-btn>
      </span>
      <span v-if="!favorites">
        <v-btn flat small @click="clickedAddToFavorites(name)">Add to favorites</v-btn>
      </span>
      <span v-if="favorites">
        <v-btn flat small @click="clickedRemoveFromFavorites(name)">Remove from favorites</v-btn>
      </span>
    </p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "rssListItem",
  props: ["name", "id", "favorites"],
  methods: {
    ...mapActions([
      "clickedNameOfRss",
      "clickedAddToFavorites",
      "clickedRemoveFromFavorites"
    ])
  }
};
</script>

<style scoped>
span {
  margin: 10px;
}
</style>
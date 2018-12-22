<template>
  <v-card style="margin: 20px">
    <v-card-title>Title: {{title}}</v-card-title>
    <v-card-text v-html="content"></v-card-text>
    <v-btn
      flat
      small
      v-if="!getIsPageFavoritePost"
      @click="clickedAddToFavoritesPosts({title, content})"
    >Add to favorites posts</v-btn>
    <v-btn
      flat
      small
      v-if="getIsPageFavoritePost"
      @click="clickedRemoveFromFavoritesPosts(title)"
    >Remove from favorites posts</v-btn>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "showRssFeedItem",
  props: ["content", "title"],
  computed: { ...mapGetters(["getIsPageFavoritePost"]) },
  methods: {
    ...mapActions([
      "clickedAddToFavoritesPosts",
      "clickedRemoveFromFavoritesPosts"
    ])
  }
};
</script>

<style scoped>
</style>
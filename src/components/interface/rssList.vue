<template>
  <div v-if="getNotEmpty">
    <div v-if="getIsThereFavoritesPosts">
      <v-btn @click="clickedShowFavoritesPosts">Favoriets Posts</v-btn>
    </div>
    <div v-if="getIsThereFavorites">
      <h2>Favoriets Feeds:</h2>
      <div :key="i" v-for="(name, i) in getFavoriets">
        <rssListItem :id="i" :name="name" :favorites="true"/>
      </div>
    </div>
    <h2>All Feeds:</h2>
    <div :key="i" v-for="(name, i) in getFeedNames">
      <rssListItem :id="i" :name="name" :favorites="false"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import rssListItem from "./rssListItem";
export default {
  name: "rssList",
  components: { rssListItem },
  computed: {
    ...mapGetters([
      "getFeedNames",
      "getIsThereFavoritesPosts",
      "getNotEmpty",
      "getIsThereFavorites",
      "getFavoriets"
    ])
  },
  methods: { ...mapActions(["clickedShowFavoritesPosts"]) }
};
</script>

<style scoped>
</style>
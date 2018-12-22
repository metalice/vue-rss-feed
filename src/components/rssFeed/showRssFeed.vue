<template>
  <div :style="{ zoom: getZoom }">
    <div :key="i" v-for="(item, i) in getPickedRss">
      <showRssFeedItem :title="item.title" :content="item.content"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import showRssFeedItem from "./showRssFeedItem";
export default {
  name: "showRssFeed",
  components: { showRssFeedItem },
  computed: {
    ...mapGetters(["getPickedRss", "getZoom"])
  }
};
</script>

<style scoped>
</style>
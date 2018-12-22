<template>
  <div>
    <v-btn v-if="!getShowForm && !getLoading" @click="clickedShowForm">Add new feed</v-btn>
    <v-form v-if="!getLoading && getShowForm" ref="form" v-model="valid">
      <v-text-field :value="getAddData.name" @input="addedNewRssInfoName" label="Name" required></v-text-field>
      <v-text-field :value="getAddData.url" @input="addedNewRssInfoUrl" label="URL" required></v-text-field>
      <v-btn @click="addRss(getAddData)">ADD</v-btn>
      <v-btn @click="clickedShowForm">CANCEL</v-btn>
    </v-form>
    <h2 v-if="getLoading">Adding Data...</h2>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "addNewRss",
  data() {
    return {
      valid: true
    };
  },
  computed: {
    ...mapGetters(["getLoading", "getShowForm", "getAddData"])
  },
  methods: {
    ...mapActions([
      "addRss",
      "addedNewRssInfoName",
      "addedNewRssInfoUrl",
      "clickedShowForm"
    ])
  }
};
</script>

<style scoped>
</style>
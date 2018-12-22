<template>
  <v-app>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs3>
          <rssList/>
          <addNewRss/>
          <error/>
        </v-flex>
        <v-flex xs9>
          <headerBar/>
          <div>
            <showRssFeed/>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import addNewRss from "./components/interface/addNewRss";
import rssList from "./components/interface/rssList.vue";
import showRssFeed from "./components/rssFeed/showRssFeed";
import headerBar from "./components/rssFeed/header/headerBar";
import error from "./components/error";

export default {
  name: "App",
  components: { error, headerBar, showRssFeed, addNewRss, rssList }
};
</script>

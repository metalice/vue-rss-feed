<template>
  <div v-if="getPickedRss !== ''" class="space">
    <span>
      <v-flex>
        <search/>
      </v-flex>
    </span>
    <span>
      <v-flex>
        <zoom/>
      </v-flex>
    </span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import search from "./search";
import zoom from "./zoom";

export default {
  name: "headerBar",
  components: { search, zoom },
  computed: { ...mapGetters(["getPickedRss"]) }
};
</script>

<style scoped>
.space {
  display: flex;
  justify-content: space-between;
}
</style>
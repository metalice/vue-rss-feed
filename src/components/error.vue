<template>
  <div>
    <h2 v-if="getError">{{getError.msg}}</h2>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: { ...mapGetters(["getError"]) }
};
</script>

<style scoped>
h2 {
  color: red;
}
</style>
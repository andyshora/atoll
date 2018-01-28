<template>
  <div class='world'>
    <Island v-if='noiseLoaded'></Island>
  </div>
</template>

<script>
import Island from 'components/Island';
import { mapGetters } from 'vuex';

export default {
  components: {
    Island
  },
  name: 'world',
  computed: {
    noiseLoaded: function() {
      return !!this.sideLength
    },
    ...mapGetters([
      'sideLength'
    ])
  }
}
</script>

<style lang='scss'>
.world {
  width: 100%;
  max-width: 800px;
  height: 400px;
  margin: 0 auto;
}
</style>

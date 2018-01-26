<template>
  <div class='island'>
    <Tile
      v-for='(p, i) in noise'
      :value='p'
      :width='1000/sideLength'
      :x='i % sideLength'
      :y='Math.floor(i / sideLength)'></Tile>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Tile from 'components/Tile';

export default {
  name: 'Island',
  components: {
    Tile
  },
  computed: {
    ...mapGetters([
      'noise',
      'sideLength'
    ])
  }
}
</script>

<style lang='scss'>
.island {
  width: 100%;
  height: 100%;
  background: hotpink;
  position: relative;
}
</style>

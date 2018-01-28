<template>
  <div class='tile' :style='{left: `${x  * width}px`, top: `${y * width}px`, width: `${width}px`, height: `${width}px`, backgroundColor: color}'></div>
</template>

<script>
import chroma from 'chroma-js';
const colorScale = chroma.scale(['lightBlue', 'beige', 'green']);;
export default {
  computed: {
    color: function() {
      return colorScale(this.value).css();
      // return `rgb(${~~(this.value * 255)}, ${~~(this.value * 255)}, ${~~(this.value * 255)})`;
    }
  },
  name: 'Tile',
  props: ['left', 'top', 'value', 'width', 'x', 'y']
}
</script>

<style lang='scss'>
.tile {
  position: absolute;
  display: inline-block;
}
</style>

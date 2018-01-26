<template>
  <div class='tile' :style='{left: `${x  * width}px`, top: `${y * width}px`, width: `${width}px`, height: `${width}px`, backgroundColor: color}'></div>
</template>

<script>
export default {
  computed: {
    color: function() {
      return `rgb(${~~(this.value * 255)}, ${~~(this.value * 255)}, ${~~(this.value * 255)})`;
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

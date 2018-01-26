<template>
  <div class='world'>
    <Island></Island>
  </div>
</template>

<script>
import Island from 'components/Island';

export default {
  components: {
    Island
  },
  name: 'world'
}
</script>

<style lang='scss'>
.world {
  width: 1000px;
  height: 1000px;
  background: cornflowerblue;
}
</style>

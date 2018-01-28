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
  width: 100%;
  max-width: 800px;
  height: 400px;
  margin: 0 auto;
  background: cornflowerblue;
}
</style>

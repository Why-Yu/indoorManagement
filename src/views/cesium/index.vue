<template>
  <div>
    {{ coordinates }}
  </div>
</template>

<script>
export default {
  computed: {
    coordinates() {
      return this.$store.state.cesium.coordinates
    }
  }
}
</script>

<style scoped>

</style>

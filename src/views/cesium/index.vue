<template>
  <div class="viewer">
    <vc-viewer
      :logo="logo"
      @ready="ready"
    >
      <vc-layer-imagery :sort-order="20">
        <vc-provider-imagery-tianditu
          map-style="cva_w"
          token="41d905887697c7bbd4288a63ac3fdfe5"
        />
      </vc-layer-imagery>
      <vc-layer-imagery :sort-order="10">
        <vc-provider-imagery-tianditu
          :map-style="mapStyle"
          token="41d905887697c7bbd4288a63ac3fdfe5"
        />
      </vc-layer-imagery>
      <vc-entity :position="position">
        <vc-graphics-point
          color="red"
          :pixel-size="12"
        />
      </vc-entity>
    </vc-viewer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logo: false,
      mapStyle: 'vec_w',
      positions: {}
    }
  },
  computed: {
    position() {
      return {
        lng: this.$store.state.cesium.lng,
        lat: this.$store.state.cesium.lat,
        height: this.$store.state.cesium.height
      }
    }
  },
  methods: {
    ready() {
    }
  }
}
</script>

<style scoped>
.viewer {
  width: 100%;
  height: calc(100vh - 50px);
}
</style>

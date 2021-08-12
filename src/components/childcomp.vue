<template>
  <div class="child">child
    <scopedcomp v-if="renderChild" :renderChild="false"></scopedcomp>
  </div>
</template>

<script>
export default {
  name: "childcomp",
  props: {
    renderChild: {
      type: Boolean
    }
  },
  components: {
    scopedcomp: () => import("src/components/scopedcomp")
  }
};
</script>
<style lang="sass" scoped>
</style>
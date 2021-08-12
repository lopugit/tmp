<template>
  <div :class="{ parent: true, hasChild: renderChild }">
    <div class="shouldBeScoped">shouldBeScoped
      <childcomp v-if="renderChild" renderChild/>
    </div>
  </div>
</template>

<script>
export default {
  name: "scopedcomp",
  props: {
    renderChild: {
      type: Boolean,
      default: true
    }
  },
  components: {
    childcomp: () => import("src/components/childcomp")
  }
};
</script>
<style lang="sass" scoped>
.parent
  &.hasChild
    .shouldBeScoped
      border: 1px solid red
  .shouldBeScoped
    border: 1px solid blue
</style>
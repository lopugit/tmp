<template>
  <div id="q-app">
    <scopedcomp/>
  </div>
</template>
<script>
export default {
  name: "App",
  components: {
    scopedcomp: require("src/components/scopedcomp").default
  }
};
</script>

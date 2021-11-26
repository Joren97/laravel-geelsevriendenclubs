<template>
  <h4
    class="title"
    :class="config.size ? `is-size-${config.size}` : 'is-size-1'"
  >
    {{ config.label }}
  </h4>
</template>
<script>
export default {
  props: {
    config: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

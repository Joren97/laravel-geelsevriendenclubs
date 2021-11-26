<template>
  <div class="columns is-multiline is-mobile">
    <div
      v-for="(c, index) in config.components"
      :key="index"
      class="column"
      :class="c.columnWidth ? `is-${c.columnWidth}` : ``"
      :style="c.columnStyle"
    >
      <Component
        :is="c.component"
        :config="c"
        :data="data"
        @input="(value) => $emit('input', value)"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          components: [],
        };
      },
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

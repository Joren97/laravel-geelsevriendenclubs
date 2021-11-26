<template>
  <div>
    <b-button
      v-if="(config && !config.nativeType) || config.loading"
      :icon-left="config && config.iconLeft ? config.iconLeft : ''"
      :icon-right="config && config.iconRight ? config.iconRight : ''"
      :class="config && config.class ? config.class : ''"
      :loading="config.loading"
      @click="handleOnButtonClick(config.handleOnClick)"
    >
      {{ config.label }}
    </b-button>

    <b-button
      v-else
      :icon-left="config && config.iconLeft ? config.iconLeft : ''"
      :icon-right="config && config.iconRight ? config.iconRight : ''"
      :class="config && config.class ? config.class : ''"
      :value="config.label"
      :tag="config.tag"
      :native-type="config.nativeType"
    />
  </div>
</template>
<script>
export default {
  props: {
    config: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    handleOnButtonClick(handler) {
      if (handler != null && handler != undefined) {
        handler({ context: this });
      }
    },
  },
};
</script>

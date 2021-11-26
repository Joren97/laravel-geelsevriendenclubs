<template>
  <FormField :label="`${config.label}`" :config="config">
    <b-numberinput
      :value="data[config.name]"
      :name="config.name"
      :placeholder="config && config.placeholder ? config.placeholder : ''"
      :disabled="config && config.disabled ? config.disabled : false"
      :min="config && config.min ? config.min : 0"
      :max="config && config.max ? config.max : 100"
      controls-position="compact"
      @input="onInput"
    ></b-numberinput>
  </FormField>
</template>
<script>
import FormField from './FormField';

export default {
  components: {
    FormField,
  },
  props: {
    config: {
      type: Object,
      default: () => {},
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    // Set default value if no data is present
    if (this.data[this.config.name] == undefined) {
      this.onInput(0, true);
    }
  },
  methods: {
    onInput(event, setDefaultValue) {
      this.$emit('input', {
        value: event,
        name: this.config.name,
        setDefaultValue,
      });
    },
  },
};
</script>

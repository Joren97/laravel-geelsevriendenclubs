<template>
  <FormField :label="`${config.label}`" :config="config">
    <b-input
      type="password"
      password-reveal
      :value="data[config.name]"
      :name="config.name"
      :placeholder="config && config.placeholder ? config.placeholder : ''"
      :disabled="config && config.disabled ? config.disabled : false"
      @input="onInput"
    ></b-input>
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
      this.onInput('', true);
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

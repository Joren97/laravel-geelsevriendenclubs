<template>
  <FormField :label="`${config.label}`" :config="config">
    <b-checkbox v-model="checkBoxValue" @input="onInput">
      {{ checkBoxValue ? 'Yes' : 'No' }}
    </b-checkbox>
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
  data() {
    return {
      checkBoxValue: false,
    };
  },
  mounted() {
    // Set default value if no data is present
    if (this.data[this.config.name] == undefined) {
      this.onInput(true, true);
      this.checkBoxValue = true;
    } else {
      this.checkBoxValue = this.data[this.config.name];
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

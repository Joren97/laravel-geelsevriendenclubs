<template>
  <FormField :label="`${config.label}`" :config="config">
    <b-datepicker
      :name="config.name"
      :value="formattedDate"
      :placeholder="config && config.placeholder ? config.placeholder : ''"
      :disabled="config && config.disabled ? config.disabled : false"
      :min-date="config && config.minDate ? config.minDate : null"
      :max-date="config && config.maxDate ? config.maxDate : null"
      nearby-month-days
      nearby-selectable-month-days
      :date-formatter="
        (date) => {
          return $moment(date).format('DD/MM/YYYY');
        }
      "
      editable
      @input="onInput"
    ></b-datepicker>
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
  computed: {
    formattedDate() {
      if (
        this.data[this.config.name] != null &&
        !isNaN(Date.parse(this.data[this.config.name]))
      ) {
        return new Date(this.data[this.config.name]);
      }
      return null;
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

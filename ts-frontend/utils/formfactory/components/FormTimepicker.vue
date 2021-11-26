<template>
  <FormField :label="`${config.label}`" :config="config">
    <b-timepicker
      :name="config.name"
      :value="formattedTime"
      :placeholder="config && config.placeholder ? config.placeholder : ''"
      :disabled="config && config.disabled ? config.disabled : false"
      :min-time="config && config.minTime ? config.minTime : null"
      :max-time="config && config.maxTime ? config.maxTime : null"
      :time-formatter="
        (date) => {
          return $moment(date).format('HH:mm');
        }
      "
      editable
      @input="onInput"
    ></b-timepicker>
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
    formattedTime() {
      if (!isNaN(Date.parse(this.data[this.config.name]))) {
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
      if (event == null) {
        event = '';
      }

      this.$emit('input', {
        value: event,
        name: this.config.name,
        setDefaultValue,
      });
    },
  },
};
</script>

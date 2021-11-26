<template>
  <FormField :label="`${config.label}`" :config="config">
    <b-datetimepicker
      :name="config.name"
      :value="formattedDateTime"
      :placeholder="config && config.placeholder ? config.placeholder : ''"
      :disabled="config && config.disabled ? config.disabled : false"
      :min-datetime="config && config.minDateTime ? config.minDateTime : null"
      :max-datetime="config && config.maxDateTime ? config.maxDateTime : null"
      :datetime-formatter="
        (date) => {
          return $moment(date).format('DD/MM/YYYY - HH:mm');
        }
      "
      editable
      @input="onInput"
    ></b-datetimepicker>
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
    formattedDateTime() {
      console.log();
      if (
        this.data[this.config.name] != null &&
        !isNaN(Date.parse(this.data[this.config.name]))
      ) {
        const date = this.data[this.config.name] + 'Z';
        return new Date(date);
      }
      return null;
    },
  },
  mounted() {
    console.log(this.data[this.config.name]);
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

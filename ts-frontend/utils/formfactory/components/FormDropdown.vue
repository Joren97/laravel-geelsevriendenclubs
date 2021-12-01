<template>
  <FormField :label="`${config.label}`" :config="config">
    <b-select
      v-model="value"
      :expanded="config && config.expanded ? config.expanded : false"
      :name="config.name"
      :placeholder="config && config.placeholder ? config.placeholder : ''"
      :disabled="config && config.disabled ? config.disabled : false"
    >
      <option
        v-for="(option, index) in defaultOptions"
        :key="index"
        :value="option.value"
      >
        {{ option.display }}
      </option>
      <option
        v-for="(option, index) in optionsArray"
        :key="index"
        :value="option[config.options.value]"
      >
        {{ option[config.options.display] }}
      </option>
    </b-select>
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
      selectedValue: null,
    };
  },
  computed: {
    defaultOptions() {
      return this.config.defaultOptions;
    },
    optionsArray() {
      return this.$store.getters[this.config.options.storePath];
    },
    value: {
      get() {
        return this.selectedValue;
      },
      set(value) {
        this.selectedValue = value;
        this.onInput(value, false);
      },
    },
  },
  mounted() {
    if (this.config.selectedValue) {
      this.selectedValue =
        this.data[this.config.selectedValue.object][
          this.config.selectedValue.property
        ];
      this.onInput(this.selectedValue, true);
    } else {
      if (this.data[this.config.name] == undefined) {
        this.onInput('', true);
      }
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

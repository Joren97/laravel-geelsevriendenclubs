<template>
  <FormField :label="`${config.label}`" :config="config">
    <b-autocomplete
      ref="autocomplete"
      v-model="name"
      :data="filteredData"
      :placeholder="config.placeholder"
      :field="config.field"
      :value="data[config.name]"
      :open-on-focus="true"
      @select="onSelect"
    >
      <template slot-scope="props">{{ props.option.name }}</template>
    </b-autocomplete>
  </FormField>
</template>

<script>
import FormField from './FormField';
export default {
  components: { FormField },
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
      name,
      selected: null,
    };
  },
  computed: {
    filteredData() {
      let data = this.$store.getters[this.config.options.storePath];

      if (data == undefined) {
        return [];
      }

      return data.filter((d) => {
        return (
          d.name.toString().toLowerCase().indexOf(this.name.toLowerCase()) >= 0
        );
      });
    },
  },
  mounted() {
    let data = this.$store.getters[this.config.options.storePath];
    if (this.data[this.config.name]) {
      let selectedOption = data.find((obj) => {
        return obj[this.config.options.value] == this.data[this.config.name];
      });
      this.$refs.autocomplete.setSelected(selectedOption);
    }
  },
  methods: {
    onSelect(event, setDefaultValue) {
      if (event != null) {
        this.selected = event;
        this.$emit('input', {
          value: event[this.config.options.value],
          name: this.config.name,
          setDefaultValue,
        });
      }
    },
  },
};
</script>

<template>
  <FormField :label="`${config.label}`" :config="config">
    <b-autocomplete
      :data="data"
      :placeholder="config.placeholder"
      field="fullName"
      :loading="isFetching"
      :open-on-focus="true"
      @typing="getAsyncData"
      @focus="getAsyncData('')"
      @select="onSelect"
    >
      <template slot-scope="props">{{ props.option.fullName }}</template>
    </b-autocomplete>
  </FormField>
</template>

<script>
import FormField from './FormField';
import debounce from 'lodash/debounce';

export default {
  components: { FormField },
  props: {
    config: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      data: [],
      selected: null,
      isFetching: false,
    };
  },
  methods: {
    // You have to install and import debounce to use it,
    // it's not mandatory though.
    getAsyncData: debounce(function (name) {
      this.isFetching = true;
      this.$axios
        .get(`/services/app/person/getAll?page=1&pageSize=10&name=${name}`)
        .then((res) => {
          let {
            data: { result },
          } = res;
          this.data = result.items;
        })
        .catch((error) => {
          this.data = [];
          throw error;
        })
        .finally(() => {
          this.isFetching = false;
        });
    }, 0),
    onSelect(event, setDefaultValue) {
      this.$emit('input', {
        value: event[this.config.property],
        name: this.config.name,
        setDefaultValue,
      });
    },
  },
};
</script>

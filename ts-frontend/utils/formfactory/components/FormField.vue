<template>
  <b-field
    :label="label + (required ? '*' : '')"
    :custom-class="config.class"
    :type="errorObject && errorObject.hasError ? 'is-danger' : ''"
    :message="
      errorObject && errorObject.hasError ? errorObject.errorMessage : ''
    "
  >
    <slot />
  </b-field>
</template>
<script>
import { required } from '../validations';

export default {
  props: {
    config: {
      type: Object,
      default: () => {},
    },
    label: {
      type: String,
      default: '',
    },
  },
  computed: {
    type() {
      if (this.hasError) {
        return 'is-danger';
      } else if (this.backendError) {
        return 'is-danger';
      } else {
        return '';
      }
    },
    required() {
      return this.config.validation.includes(required);
    },
    errorObject() {
      let errorObject = { hasError: false, errorMessage: '' };
      const validations = this.$store.state.formfactory.validations;
      const backendError = this.$store.state.formfactory.backendError;
      if (validations[this.config.name]) {
        errorObject = validations[this.config.name];
      }
      if (backendError[this.config.name]) {
        errorObject = {
          hasError: true,
          errorMessage: backendError[this.config.name],
        };
      }
      return errorObject;
    },
  },
};
</script>

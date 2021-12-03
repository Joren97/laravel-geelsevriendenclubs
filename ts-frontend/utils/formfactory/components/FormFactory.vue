<template>
  <form
    v-if="formFactoryIsVisible"
    ref="formFactory"
    class="form-factory"
    @submit.prevent="submit"
  >
    <FormRow :config="config" :data="data" @input="onInput" />
  </form>
</template>

<script>
import FormRow from './FormRow';

import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import { sameAs } from '../validations';

const emptyValidationObject = {
  hasError: false,
  errorMessage: '',
};

export default {
  name: 'FormFactory',
  components: {
    FormRow,
  },
  props: {
    dataToEdit: {
      type: Object,
      default: () => {},
    },
    config: {
      type: Object,
      default: () => {
        return { components: [] };
      },
    },
  },
  data() {
    return {
      validations: {},
      data: {},
      formFactoryIsVisible: false,
    };
  },
  computed: {
    validationsObject() {
      return this.validations;
    },
    componentArray() {
      return this.getComponentArray(this.config.components);
    },
  },
  created() {
    // Create componentArray
    // this.getComponentArray(this.config.components);
    // Fill in data for edit
    if (!isEmpty(this.dataToEdit)) {
      this.data = cloneDeep(this.dataToEdit);
    }
    this.$store.commit('formfactory/resetStateData');

    // Focus first input
    this.formFactoryIsVisible = true;
    this.$nextTick(() => {
      const numberOfFields = this.getComponentArray(
        this.config.components,
      ).length;
      for (let i = 0; i < numberOfFields; i++) {
        if (this.$refs.formFactory != undefined) {
          let input = this.$refs.formFactory[i];
          if (!input.disabled) {
            input.focus();
            break;
          }
        }
      }
    });
  },
  methods: {
    touch(component, value) {
      component.touched = true;

      this.validations[component.name] = emptyValidationObject;

      if (component.validation) {
        // Clear backenderror if present
        let backendError = cloneDeep(
          this.$store.state.formfactory.backendError,
        );
        delete backendError[component.name];
        this.$store.commit('formfactory/setBackendError', backendError);

        // Run validations
        component.validation.forEach((v) => {
          let validationObject = v({ value, component, data: this.data });

          if (validationObject.hasError) {
            this.validations[component.name] = validationObject;
          }
        });

        // Run sameAs validation
        let componentWithSameAs = this.componentArray.find((obj) => {
          return obj.config && obj.config.sameAs == component.name;
        });
        if (componentWithSameAs) {
          componentWithSameAs.touched = true;
          componentWithSameAs.validation.forEach((v) => {
            let sameAsValidationObject = emptyValidationObject;
            if (v == sameAs) {
              sameAsValidationObject = v({
                value: this.data[componentWithSameAs.name],
                component: componentWithSameAs,
                data: this.data,
              });
              this.validations[componentWithSameAs.name];
            }
          });
        }
      }

      this.$store.commit('formfactory/setValidations', this.validations);
    },
    submit() {
      this.componentArray.forEach((comp) => {
        this.touch(comp, this.data[comp.name]);
      });

      let isValid = true;
      Object.values(this.validations).forEach((v) => {
        if (v.hasError) {
          isValid = false;
        }
      });
      if (!isValid) return;

      Object.keys(this.data).forEach((key) => {
        if (this.data[key] == null) {
          this.data[key] = '';
        }
      });

      this.$emit('onSubmit', this.data);
    },
    onInput(value) {
      this.data[value.name] = value.value;

      if (!value.setDefaultValue) {
        let component = this.componentArray.find((obj) => {
          return obj.name == value.name;
        });
        this.touch(component, value.value);
      }
    },
    getComponentArray(components) {
      let arr = [];
      components.forEach((c) => {
        if (c.components) {
          this.getComponentArray(c.components).forEach((c2) => {
            arr.push(c2);
          });
        } else {
          arr.push(c);
        }
      });
      return arr;
    },
  },
};
</script>
<style lang="scss">
.form-factory {
  .column {
    padding-bottom: 0;
  }
  .columns:last-child {
    margin-bottom: 0;
  }
}
</style>

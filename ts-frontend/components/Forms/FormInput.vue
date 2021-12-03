<template>
  <b-field
    :label="fullLabel"
    :type="error != '' ? `is-danger` : ``"
    :message="error"
  >
    <b-input
      @blur="$emit('validate')"
      @keypress.native="$emit('validate')"
      @input="input"
    ></b-input>
  </b-field>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component({
  name: 'FormInput',
})
export default class FormInput extends Vue {
  @Prop({})
  validationSchema: Object;

  @Prop({})
  config: { name: string; error: string; label: string };

  input(val: string) {
    console.log(this.config);
    this.$emit('update:input-value', val);
  }

  get error(): string {
    return this.config.error;
  }

  get fullLabel() {
    const required =
      // @ts-ignore
      this.validationSchema.fields[this.config.name].exclusiveTests.required;
    if (required) {
      return this.config.label + '*';
    }

    return this.config.label;
  }
}
</script>

<template>
  <div class="content">
    <div class="title">Team toevoegen</div>
    <FormFactory :config="formFactoryConfig" @onSubmit="handleOnSubmit" />
  </div>
</template>
<script>
import FormFactory from '@/utils/formfactory/components/FormFactory';
import formTemplates from '@/utils/formfactory/formtemplates';
import { required, numeric } from '@/utils/formfactory/validations';

export default {
  components: {
    FormFactory,
  },
  computed: {
    formFactoryConfig() {
      return {
        components: [
          formTemplates.getFormRow({
            components: [
              formTemplates.getFormInput({
                label: 'Naam',
                name: 'name',
                placeholder: 'FC De Sjotters',
                validation: [required],
              }),
            ],
          }),
          formTemplates.getFormRow({
            components: [
              formTemplates.getFormInput({
                label: 'Adres',
                name: 'address',
                placeholder: 'Belgienlaan 3',
                validation: [required],
              }),
              formTemplates.getFormInput({
                label: 'Postcode',
                name: 'postalCode',
                placeholder: '2000',
                validation: [required, numeric],
              }),
              formTemplates.getFormInput({
                label: 'Stad',
                name: 'city',
                placeholder: 'Brussel',
                validation: [required],
              }),
            ],
          }),
          formTemplates.getFormRow({
            components: [
              formTemplates.getFormInput({
                label: 'Eerste kleur',
                name: 'color1',
                placeholder: 'Blauw',
                validation: [required],
              }),
              formTemplates.getFormInput({
                label: 'Tweede kleur',
                name: 'color2',
                placeholder: 'Blauw',
              }),
              formTemplates.getFormInput({
                label: 'Derde kleur',
                name: 'color3',
                placeholder: 'Blauw',
              }),
            ],
          }),
          formTemplates.getFormRow({
            components: [
              formTemplates.getSubmitButton({
                label: 'Toevoegen',
                loading: this.$store.state.team.loading,
                class: 'is-primary',
              }),
            ],
          }),
        ],
      };
    },
  },
  methods: {
    handleOnSubmit(obj) {
      this.$store.dispatch('team/create', obj);
    },
  },
};
</script>

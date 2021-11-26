<template>
  <div class="content">
    <div class="title">Persoon toevoegen</div>
    <FormFactory :config="formFactoryConfig" @onSubmit="handleOnSubmit" />
  </div>
</template>
<script>
import FormFactory from '@/utils/formfactory/components/FormFactory';
import formTemplates from '@/utils/formfactory/formtemplates';
import { required, numeric, email } from '@/utils/formfactory/validations';
import { functions } from '@/utils/enum.js';

export default {
  components: {
    FormFactory,
  },
  async fetch({ store }) {
    await store.dispatch('team/getAll');
  },
  computed: {
    formFactoryConfig() {
      return {
        components: [
          formTemplates.getFormRow({
            components: [
              formTemplates.getFormInput({
                label: 'Voornaam',
                name: 'firstname',
                placeholder: 'Jef',
                validation: [required],
              }),
              formTemplates.getFormInput({
                label: 'Naam',
                name: 'lastname',
                placeholder: 'De Bakker',
                validation: [required],
              }),
              formTemplates.getFormDropdown({
                label: 'Team',
                name: 'teamId',
                expanded: true,
                placeholder: '-- Selecteer een team --',
                options: {
                  storePath: 'team/teamsForDropdown',
                  value: 'id',
                  display: 'name',
                },
                class: 'is-primary',
              }),
              formTemplates.getFormDropdown({
                label: 'Functie',
                name: 'function',
                expanded: true,
                placeholder: '-- Selecteer een functie --',
                defaultOptions: functions,
                class: 'is-primary',
              }),
            ],
          }),
          formTemplates.getFormRow({
            components: [
              formTemplates.getFormDatepicker({
                label: 'Geboortedatum',
                placeholder: '10/10/1990',
                name: 'birthdate',
              }),
              formTemplates.getFormInput({
                label: 'Email',
                name: 'email',
                placeholder: 'jef.debakker@gmail.com',
                validation: [email],
              }),
              formTemplates.getFormInput({
                label: 'Telefoon',
                name: 'tel',
                placeholder: '0478102030',
                validation: [numeric],
              }),
            ],
          }),
          formTemplates.getFormRow({
            components: [
              formTemplates.getFormInput({
                label: 'Adres',
                name: 'address',
                placeholder: 'Belgienlaan 3',
              }),
              formTemplates.getFormInput({
                label: 'Postcode',
                name: 'postalCode',
                placeholder: '2000',
                validation: [numeric],
              }),
              formTemplates.getFormInput({
                label: 'Stad',
                name: 'city',
                placeholder: 'Brussel',
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
      obj = {
        ...obj,
        function: obj.function != '' ? obj.function : 0,
      };
      this.$store.dispatch('person/create', obj);
    },
  },
};
</script>

<template>
  <div class="content">
    <div class="title">Boete toevoegen</div>
    <FormFactory :config="formFactoryConfig" @onSubmit="handleOnSubmit" />
  </div>
</template>
<script>
import FormFactory from '@/utils/formfactory/components/FormFactory';
import formTemplates from '@/utils/formfactory/formtemplates';

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
              formTemplates.getFormAutoCompleteAsync({
                label: 'Speler',
                name: 'playerId',
                placeholder: 'Zoek een speler..',
                property: 'id',
              }),
              formTemplates.getFormNumber({
                label: 'Aantal wedstrijden geschorst',
                name: 'amountOfGames',
                columnWidth: 'narrow',
              }),
              formTemplates.getFormNumber({
                label: 'Boetebedrag',
                name: 'fine',
                columnWidth: 'narrow',
              }),
            ],
          }),
          formTemplates.getFormRow({
            components: [
              formTemplates.getFormInput({
                label: 'Beschrijving',
                name: 'reason',
                placeholder: 'Typ hier je beschrijving..',
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
      this.$store.dispatch('suspension/create', obj);
    },
  },
};
</script>

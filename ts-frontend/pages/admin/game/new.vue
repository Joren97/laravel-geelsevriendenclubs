<template>
  <div class="content">
    <div class="title">Wedstrijd toevoegen</div>
    <FormFactory :config="formFactoryConfig" @onSubmit="handleOnSubmit" />
  </div>
</template>
<script>
import FormFactory from '@/utils/formfactory/components/FormFactory';
import formTemplates from '@/utils/formfactory/formtemplates';
import { required } from '@/utils/formfactory/validations';

export default {
  components: {
    FormFactory,
  },
  async fetch({ store }) {
    await store.dispatch('team/getAllUnfiltered');
  },
  computed: {
    formFactoryConfig() {
      return {
        components: [
          formTemplates.getFormRow({
            components: [
              formTemplates.getFormDropdown({
                label: 'Thuisploeg',
                name: 'homeTeamId',
                expanded: true,
                placeholder: '-- Selecteer een team --',
                options: {
                  storePath: 'team/teamsForDropdown',
                  value: 'id',
                  display: 'name',
                },
                class: 'is-primary',
                validation: [required],
              }),
              formTemplates.getFormDropdown({
                label: 'Uitploeg',
                name: 'outTeamId',
                expanded: true,
                placeholder: '-- Selecteer een team --',
                options: {
                  storePath: 'team/teamsForDropdown',
                  value: 'id',
                  display: 'name',
                },
                class: 'is-primary',
                validation: [required],
              }),
            ],
          }),
          formTemplates.getFormRow({
            components: [
              formTemplates.getFormDateTimepicker({
                label: 'Datum en uur',
                placeholder: '10/10/1990 - 14:00',
                name: 'datetime',
                validation: [required],
              }),
            ],
          }),
          formTemplates.getFormRow({
            components: [
              formTemplates.getFormCheckBox({
                label: 'Bekerwedstrijd',
                name: 'isCup',
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
      this.$store.dispatch('game/create', obj);
    },
  },
};
</script>

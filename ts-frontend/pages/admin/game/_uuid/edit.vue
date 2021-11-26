<template>
  <div class="content">
    <div class="title">Wedstrijd bewerken</div>
    <FormFactory
      :config="formFactoryConfig"
      :data-to-edit="$store.state.game.currentGame"
      @onSubmit="handleOnSubmit"
    />
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
  async fetch({ store, params }) {
    await store.dispatch('game/get', params.uuid);
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
                selectedValue: {
                  object: 'homeTeam',
                  property: 'id',
                },
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
                selectedValue: {
                  object: 'outTeam',
                  property: 'id',
                },
              }),
            ],
          }),
          formTemplates.getFormRow({
            components: [
              formTemplates.getFormDateTimepicker({
                label: 'Datum en uur',
                placeholder: '10/10/1990 - 14:00',
                name: 'dateTime',
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
                label: 'Opslaan',
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
      this.$store.dispatch('game/update', obj);
    },
  },
};
</script>

<template>
  <section class="section">
    <div class="content">
      <div class="title">Team bewerken</div>
      <FormFactory
        :key="teamToEdit ? teamToEdit.id : -1"
        :config="formFactoryConfig"
        :data-to-edit="teamToEdit"
        @onSubmit="handleOnSubmit"
      />
    </div>
  </section>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { teamModule } from '~/store';

import FormFactory from '@/utils/formfactory/components/FormFactory.vue';
import formTemplates from '@/utils/formfactory/formtemplates';
import { required, numeric } from '@/utils/formfactory/validations';
@Component({
  name: 'EditTeam',
  components: {
    FormFactory,
  },
})
export default class EditTeam extends Vue {
  destroyed() {
    teamModule.setItem(null);
  }

  async fetch() {
    await teamModule.get(this.$route.params.uuid);
  }

  get teamToEdit() {
    console.log('Getting team');
    console.log(teamModule.item);

    return teamModule.item;
  }

  get formFactoryConfig() {
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
              label: 'Opslaan',
              loading: this.$store.state.team.loading,
              class: 'is-primary',
            }),
          ],
        }),
      ],
    };
  }
  handleOnSubmit(obj: any) {
    if (!this.teamToEdit) return;
    teamModule.update(obj);
  }
}
</script>

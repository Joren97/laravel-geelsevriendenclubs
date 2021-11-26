<template>
  <div>
    <div class="columns is-centered">
      <div class="column content">
        <h1 class="has-text-centered is-uppercase has-white-text">
          Geelse Vriendenclubs
        </h1>
        <FormFactory :config="formFactoryConfig" @onSubmit="handleOnSubmit" />
      </div>
    </div>
  </div>
</template>
<script>
import FormFactory from '@/utils/formfactory/components/FormFactory';
import formTemplates from '@/utils/formfactory/formtemplates';

export default {
  layout: 'clean-center',
  components: { FormFactory },
  computed: {
    formFactoryConfig() {
      return {
        components: [
          formTemplates.getFormRow({
            components: [
              formTemplates.getFormInput({
                label: 'Gebruikersnaam of email',
                name: 'userNameOrEmailAddress',
                placeholder: 'JohnDoe',
              }),
            ],
          }),
          formTemplates.getFormRow({
            components: [
              formTemplates.getPasswordField({
                label: 'Wachtwoord',
                name: 'password',
              }),
            ],
          }),
          formTemplates.getFormRow({
            components: [
              formTemplates.getSubmitButton({
                label: 'Aanmelden',
                loading: this.$store.state.auth.loading,
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
      this.$store.dispatch('auth/login', obj);
    },
  },
  head() {
    return {
      title: 'Login',
    };
  },
};
</script>

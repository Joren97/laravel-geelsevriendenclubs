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
<script lang="ts">
import FormFactory from '@/utils/formfactory/components/FormFactory.vue';
import formTemplates from '@/utils/formfactory/formtemplates';
import { Vue, Component } from 'nuxt-property-decorator';
import { authModule } from '~/store';

@Component({
  name: 'Login',
  components: { FormFactory },
  layout: 'clean-center',
})
export default class Login extends Vue {
  get formFactoryConfig() {
    return {
      components: [
        formTemplates.getFormRow({
          components: [
            formTemplates.getFormInput({
              label: 'Email',
              name: 'email',
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
  }
  handleOnSubmit(obj: any) {
    authModule
      .login(obj)
      .then((res: { access_token: string; expires_in: number }) => {
        this.$cookies.set('sessionToken', res.access_token, {
          path: '/',
          maxAge: res.expires_in,
        });
        this.$router.push('/admin');
      });
  }
}
</script>

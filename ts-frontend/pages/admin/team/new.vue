<template>
  <div class="content">
    <div class="title">Team toevoegen</div>
    <FormInput
      v-for="(item, index) in formConfig"
      :key="index"
      :config="item"
      :input-value.sync="item.value"
      :validation-schema="validationSchema"
      @validate="validateField(item.name)"
    />
    <b-button @click="addTeam">Toevoegen</b-button>
  </div>
</template>
<script>
import FormFactory from '@/utils/formfactory/components/FormFactory';
import FormInput from '~/components/Forms/FormInput.vue';
import { Vue, Component } from 'nuxt-property-decorator';
import * as yup from 'yup';

@Component({
  components: {
    FormFactory,
    FormInput,
  },
})
export default class NewTeam extends Vue {
  formConfig = [
    { name: 'name', label: 'name', component: FormInput, value: '', error: '' },
    {
      name: 'address',
      label: 'adres',
      component: FormInput,
      value: '',
      error: '',
    },
    {
      name: 'postalCode',
      label: 'postcode',
      component: FormInput,
      value: '',
      error: '',
    },
    { name: 'city', label: 'stad', component: FormInput, value: '', error: '' },
    {
      name: 'color1',
      label: 'kleur 1',
      component: FormInput,
      value: '',
      error: '',
    },
    {
      name: 'color2',
      label: 'kleur 2',
      component: FormInput,
      value: '',
      error: '',
    },
    {
      name: 'color3',
      label: 'kleur 3',
      component: FormInput,
      value: '',
      error: '',
    },
  ];

  get validationSchema() {
    return yup.object().shape({
      name: yup.string().required(),
      address: yup.string().required(),
      postalCode: yup.string(),
      city: yup.string().required(),
      color1: yup.string().required(),
      color2: yup.string().required(),
      color3: yup.string().required(),
    });
  }

  addTeam() {
    const values = {};
    this.formConfig.forEach((element) => {
      values[element.name] = element.value;
    });

    this.validationSchema
      .validate(values, { abortEarly: false })
      .then(() => {
        console.log('valid');
      })
      .catch((err) => {
        console.log('invalid');
        err.inner.forEach((error) => {
          this.formConfig.find((x) => x.name == error.path).error =
            error.message;
        });
        console.log(this.formConfig);
      });
  }

  validateField(field) {
    const values = {};
    this.formConfig.forEach((element) => {
      values[element.name] = element.value;
    });

    this.validationSchema
      .validateAt(field, values)
      .then(() => {
        this.formConfig.find((x) => x.name == field).error = '';
      })
      .catch((err) => {});
  }
  handleOnSubmit(obj) {
    this.$store.dispatch('team/create', obj);
  }
}
</script>

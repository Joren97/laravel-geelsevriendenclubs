import merge from 'lodash/merge';
import concat from 'lodash/concat';
import { email } from './validations.js';

import FormRow from './components/FormRow.vue';
import FormInput from './components/FormInput.vue';
import FormPassword from './components/FormPassword.vue';
import FormButton from './components/FormButton.vue';
import FormNumber from './components/FormNumber.vue';
import FormDropdown from './components/FormDropdown.vue';
import FormSubtitle from './components/FormSubtitle.vue';
import FormAutocompleteAsync from './components/FormAutocompleteAsync.vue';
import FormAutocomplete from './components/FormAutocomplete.vue';
import FormDatepicker from './components/FormDatepicker.vue';
import FormTimepicker from './components/FormTimepicker.vue';
import FormCheckbox from './components/FormCheckbox.vue';
import FormDateTimepicker from './components/FormDateTimepicker.vue';

const getFormCheckBox = (config) => {
  const defaultConfig = {
    component: FormCheckbox,
    name: 'checkbox',
    label: 'Checkbox',
    errorLabel: 'This field',
    touched: false,
    validation: [],
  };

  if (config && config.validation) {
    defaultConfig.validation = concat(
      defaultConfig.validation,
      config.validation,
    );
  }

  return merge(defaultConfig, config);
};

const getFormTimepicker = (config) => {
  const defaultConfig = {
    component: FormTimepicker,
    name: 'timepicker',
    label: 'Timepicker',
    errorLabel: 'This field',
    touched: false,
    validation: [],
  };

  if (config && config.validation) {
    defaultConfig.validation = concat(
      defaultConfig.validation,
      config.validation,
    );
  }

  return merge(defaultConfig, config);
};

const getFormDateTimepicker = (config) => {
  const defaultConfig = {
    component: FormDateTimepicker,
    name: 'datetimepicker',
    locale: 'en-US',
    timezone: 'Europe/London',
    label: 'Datetimepicker',
    errorLabel: 'This field',
    touched: false,
    validation: [],
  };

  if (config && config.validation) {
    defaultConfig.validation = concat(
      defaultConfig.validation,
      config.validation,
    );
  }

  return merge(defaultConfig, config);
};

const getFormDatepicker = (config) => {
  const defaultConfig = {
    component: FormDatepicker,
    name: 'datepicker',
    label: 'Datepicker',
    errorLabel: 'This field',
    touched: false,
    validation: [],
  };

  if (config && config.validation) {
    defaultConfig.validation = concat(
      defaultConfig.validation,
      config.validation,
    );
  }

  return merge(defaultConfig, config);
};

const getFormSubtitle = (config) => {
  const defaultConfig = {
    component: FormSubtitle,
    label: 'Subtitle',
  };

  return merge(defaultConfig, config);
};

const getFormAutoComplete = (config) => {
  const defaultConfig = {
    component: FormAutocomplete,
    label: 'Autocomplete',
    name: 'autocomplete',
    errorLabel: 'This field',
    field: 'name',
  };

  return merge(defaultConfig, config);
};

const getFormAutoCompleteAsync = (config) => {
  const defaultConfig = {
    component: FormAutocompleteAsync,
    label: 'Company',
    name: 'company',
    validation: [],
  };

  return merge(defaultConfig, config);
};

const getFormNumber = (config) => {
  const defaultConfig = {
    component: FormNumber,
    label: 'numberField',
    name: 'numberField',
    errorLabel: 'This field',
    touched: false,
    validation: [],
  };

  if (config && config.validation) {
    defaultConfig.validation = concat(
      defaultConfig.validation,
      config.validation,
    );
  }

  return merge(defaultConfig, config);
};

const getFormDropdown = (config) => {
  const defaultConfig = {
    component: FormDropdown,
    label: 'dropdownField',
    name: 'dropdownField',
    errorLabel: 'This field',
    touched: false,
    validation: [],
    options: {},
  };

  if (config && config.validation) {
    defaultConfig.validation = concat(
      defaultConfig.validation,
      config.validation,
    );
  }

  return merge(defaultConfig, config);
};

const getFormInput = (config) => {
  const defaultConfig = {
    component: FormInput,
    label: 'Inputfield',
    name: 'inputfield',
    errorLabel: 'This field',
    touched: false,
    validation: [],
    type: 'text',
  };

  if (config && config.validation) {
    defaultConfig.validation = concat(
      defaultConfig.validation,
      config.validation,
    );
  }

  return merge(defaultConfig, config);
};

const getEmailField = (config) => {
  const defaultConfig = {
    ...config,
    label: 'Email',
    name: 'email',
    errorLabel: 'Email',
    placeholder: 'example@example.com',
    validation: [email],
  };

  if (config && config.validation) {
    defaultConfig.validation = concat(
      defaultConfig.validation,
      config.validation,
    );
  }

  return getFormInput(defaultConfig);
};

const getPasswordField = (config) => {
  const defaultConfig = {
    component: FormPassword,
    label: 'Password',
    name: 'password',
    placeholder: '******',
    errorLabel: 'Password',
    touched: false,
    validation: [],
  };

  if (config && config.validation) {
    defaultConfig.validation = concat(
      defaultConfig.validation,
      config.validation,
    );
  }

  return merge(defaultConfig, config);
};

const getFormRow = (config) => {
  const defaultConfig = {
    component: FormRow,
    columnWidth: 12,
    components: [],
  };

  return merge(defaultConfig, config);
};

const getButton = (config) => {
  const defaultConfig = {
    component: FormButton,
    handleOnClick: null,
    columnStyle: 'margin-top: auto',
    loading: false,
  };

  return merge(defaultConfig, config);
};

const getGoBackButton = (config) => {
  const defaultConfig = {
    label: 'Back',
    iconLeft: 'chevron-left',
    handleOnClick: ({ context }) => {
      context.$router.go(-1);
    },
  };

  const mergedConfig = merge(defaultConfig, config);

  return getButton(mergedConfig);
};

const getSubmitButton = (config) => {
  const defaultConfig = {
    label: 'Submit',
    nativeType: 'submit',
    tag: 'input',
    loading: false,
  };

  const mergedConfig = merge(defaultConfig, config);

  return getButton(mergedConfig);
};

export default {
  getFormInput,
  getFormRow,
  getPasswordField,
  getFormNumber,
  getFormDropdown,
  getFormSubtitle,
  getFormAutoComplete,
  getFormAutoCompleteAsync,
  getFormDatepicker,
  getFormTimepicker,
  getFormDateTimepicker,
  getFormCheckBox,

  getButton,
  getSubmitButton,
  getGoBackButton,

  getEmailField,
};

/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
export const length = (input) => {
  let hasError = false;
  let errorMessage = '';

  if (input.component.config && input.component.config.minLength) {
    if (input.value.length < input.component.config.minLength) {
      hasError = true;
      errorMessage = `${input.component.errorLabel} must be at
       least ${input.component.config.minLength} ${
        input.component.config.minLength == 1 ? 'charachter' : 'charachters'
      }.`;
    }
  }
  if (input.component.config && input.component.config.maxLength) {
    if (input.value.length > input.component.config.maxLength) {
      hasError = true;
      errorMessage = `${input.component.errorLabel} must be less than
       ${input.component.config.maxLength} charachters.`;
    }
  }
  return { hasError, errorMessage };
};

export const numeric = (input) => {
  const regExp = /^\d+$/;

  let hasError = false;
  let errorMessage = '';

  if (input.value == '') {
    return { hasError, errorMessage };
  }

  if (!regExp.test(input.value)) {
    hasError = true;
    errorMessage = `${input.component.errorLabel} can only contain digits.`;
  }

  return { hasError, errorMessage };
};

export const isFutureDate = (input) => {
  const now = new Date();

  let hasError = false;
  let errorMessage = '';

  if (input.value == '') {
    return { hasError, errorMessage };
  }

  if (input.value < now) {
    hasError = true;
    errorMessage = `${input.component.errorLabel} can not be in the past.`;
  }

  return { hasError, errorMessage };
};

export const hasDigit = (input) => {
  const regExp = /\d/;

  let hasError = false;
  let errorMessage = '';

  if (input.value == '') {
    return { hasError, errorMessage };
  }

  if (!regExp.test(input.value)) {
    hasError = true;
    errorMessage = `${input.component.errorLabel} requires at least one digit.`;
  }

  return { hasError, errorMessage };
};

export const required = (input) => {
  let hasError = false;
  let errorMessage = '';

  if (input.value == null || input.value == '') {
    hasError = true;
    errorMessage = `${input.component.errorLabel} is required.`;
  }

  return { hasError, errorMessage };
};

export const email = (input) => {
  const regExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let hasError = false;
  let errorMessage = '';

  if (input.value == '') {
    return { hasError, errorMessage };
  }

  if (!regExp.test(input.value.toLowerCase())) {
    hasError = true;
    errorMessage = `${input.component.errorLabel} is not a valid email.`;
  }

  return { hasError, errorMessage };
};

export const sameAs = (input) => {
  let hasError = false;
  let errorMessage = '';

  if (input.value == '') {
    return { hasError, errorMessage };
  }

  if (input.value != input.data[input.component.config.sameAs]) {
    hasError = true;
    errorMessage = `${input.component.errorLabel} 
    does not match ${input.component.config.sameAs}`;
  }

  return { hasError, errorMessage };
};

export const url = (input) => {
  const regExp =
    /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

  let hasError = false;
  let errorMessage = '';

  if (input.value == '') {
    return { hasError, errorMessage };
  }

  if (!regExp.test(input.value)) {
    hasError = true;
    errorMessage = `${input.component.errorLabel} is not a valid URL.`;
  }

  return { hasError, errorMessage };
};

export const hasUppercase = (input) => {
  const regExp = /[A-Z]/;

  let hasError = false;
  let errorMessage = '';

  if (input.value == '') {
    return { hasError, errorMessage };
  }

  if (!regExp.test(input.value)) {
    hasError = true;
    errorMessage = `${input.component.errorLabel}
     requires at least one uppercase charachter.`;
  }

  return { hasError, errorMessage };
};

export const hasLowercase = (input) => {
  const regExp = /[a-z]/;

  let hasError = false;
  let errorMessage = '';

  if (input.value == '') {
    return { hasError, errorMessage };
  }

  if (!regExp.test(input.value)) {
    hasError = true;
    errorMessage = `${input.component.errorLabel} 
    requires at least one lowercase charachter.`;
  }

  return { hasError, errorMessage };
};

export const uuid = (input) => {
  let hasError = false;
  let errorMessage = '';

  const regExp = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;

  if (input.value == '') {
    return { hasError, errorMessage };
  }

  if (!regExp.test(input.value)) {
    hasError = true;
    errorMessage = `${input.component.errorLabel} is not a valid UUID.`;
  }

  return { hasError, errorMessage };
};

export const isValidVATNumber = (input) => {
  let hasError = false;
  let errorMessage = '';

  const regExp =
    /^((AT){1}U[0-9]{8}|(BE){1}0[0-9]{9}|(BG){1}[0-9]{9,10}|(CY){1}[0-9]{8}L|(CZ){1}[0-9]{8,10}|(DE){1}[0-9]{9}|(DK){1}[0-9]{8}|(EE){1}[0-9]{9}|(EL|GR){1}[0-9]{9}|(ES){1}[0-9A-Z][0-9]{7}[0-9A-Z]|(FI){1}[0-9]{8}|(FR){1}[0-9A-Z]{2}[0-9]{9}|(GB){1}([0-9]{9}([0-9]{3})?|[A-Z]{2}[0-9]{3})|(HU){1}[0-9]{8}|(IE){1}[0-9]S[0-9]{5}L|(IT){1}[0-9]{11}|(LT){1}([0-9]{9}|[0-9]{12})|(LU){1}[0-9]{8}|(LV){1}[0-9]{11}|(MT){1}[0-9]{8}|(NL){1}[0-9]{9}B[0-9]{2}|(PL){1}[0-9]{10}|(PT){1}[0-9]{9}|(RO){1}[0-9]{2,10}|(SE){1}[0-9]{12}|(SI){1}[0-9]{8}|(SK){1}[0-9]{10})$/;

  if (input.value != null && input.value != '') {
    const trimmedVat = input.value.replace(/[ .]/g, '');

    if (!regExp.test(trimmedVat)) {
      hasError = true;
      errorMessage = `${input.component.errorLabel} is not a valid VAT number.`;
    }
  }

  return { hasError, errorMessage };
};

export const cannotStartWith = (input) => {
  let hasError = false;
  let errorMessage = '';

  if (input.value != null && input.value != '') {
    if (input.component.config && input.component.config.cannotStartWith) {
      input.component.config.cannotStartWith.forEach((element) => {
        if (input.value.startsWith(element)) {
          hasError = true;
          errorMessage = `${input.component.errorLabel} can not start with "${element}".`;
        }
      });
    }
  }

  return { hasError, errorMessage };
};

export const customRegExp = (input) => {
  let hasError = false;
  let errorMessage = '';

  if (input.value != null && input.value != '') {
    if (input.component.config && input.component.config.customRegExps) {
      input.component.config.customRegExps.forEach((regExp) => {
        if (!regExp.expression.test(input.value)) {
          hasError = true;
          errorMessage = `${input.component.errorLabel} ${regExp.errorMessage}.`;
        }
      });
    }
  }

  return { hasError, errorMessage };
};

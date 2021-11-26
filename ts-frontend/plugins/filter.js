import Vue from 'vue';

// Dot to comma
Vue.filter('toComma', (val) => {
  if (val == '' || val == null) {
    return '';
  }
  return (val + '').replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
});

// Number to currency
const formatter = new Intl.NumberFormat('nl-NL', {
  style: 'currency',
  currency: 'EUR',
});
Vue.filter('toEuroCurrency', (val) => {
  if (val !== '') {
    return formatter.format(val);
  } else {
    return val;
  }
});

// Round to 2 decimals
Vue.filter('round', (val) => {
  if (val == '' || val == null) {
    return null;
  }
  return parseFloat(val).toFixed(2);
});

// Replace with / if value is empty
Vue.filter('slashIfEmpty', (val) => {
  if (val == null || val == '') {
    return '/';
  }
  return val;
});

Vue.filter(
  'toDateTime',
  (val, locale = 'en-US', timezone = 'Europe/London') => {
    if (val == null || val == '') {
      return '/';
    }
    return convertDateTimeTz(new Date(val + 'Z'), locale, timezone);
  },
);

Vue.filter('toTime', (val, locale = 'en-US', timezone = 'Europe/London') => {
  if (val == null || val == '') {
    return '/';
  }
  return convertTimeTZ(new Date(val + 'Z'), locale, timezone);
});

Vue.filter('toDate', (val, locale = 'en-US', timezone = 'Europe/London') => {
  if (val == null || val == '') {
    return '/';
  }
  return convertDateTZ(new Date(val + 'Z'), locale, timezone);
});

Vue.filter('padZeros', (value, leadingZeros) => {
  return ('0000000000000000' + value).substr(-leadingZeros);
});

const convertDateTimeTz = (date, locale, tzString) => {
  const formattedDate = date.toLocaleDateString(locale, {
    timeZone: tzString,
  });

  const time = date.toLocaleTimeString(locale, {
    timeZone: tzString,
  });

  return `${formattedDate} - ${time}`;
};

const convertTimeTZ = (date, locale, tzString) => {
  return date.toLocaleTimeString(locale, {
    timeZone: tzString,
  });
};

const convertDateTZ = (date, locale, tzString) => {
  return date.toLocaleDateString(locale, {
    timeZone: tzString,
  });
};

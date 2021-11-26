<template>
  <section class="content">
    <h1>Reglement</h1>
    <p
      v-for="(rule, index) in rules"
      :key="index"
      :class="[rule.type == 0 ? 'title' : '', `is-${rule.size}`]"
    >
      {{ rule.text }}
    </p>
  </section>
</template>
<script>
export default {
  layout: 'guest',
  data() {
    return {
      rules: [
        { type: 0, size: 4, text: 'Statuten en reglementen' },
        { type: 0, size: 5, text: 'Artikel 1: stichting' },
        {
          type: 1,
          size: 0,
          text:
            'De vereniging is gesticht op 01/09/1980 en neemt de benaming aan van Geelse Vriendenclubs, afgekort  G.V.C. Waarvan de statuten en reglementen hieronder worden beschreven.',
        },
      ],
    };
  },
};
</script>

<template>
  <section class="content">
    <h1>Reglement</h1>
    <p v-html="content.rendered"></p>
  </section>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component({
  layout: 'guest',
  head: {
    title: 'Reglement',
  },
})
export default class Rules extends Vue {
  content = { content: { rendered: '' } };
  async fetch() {
    const res = await this.$axios.get(
      'https://zenithwebdesign.be/projects/wp-geelsevriendenclubs/wp-json/wp/v2/pages/818',
    );

    this.content = res.data.content;
  }
}
</script>

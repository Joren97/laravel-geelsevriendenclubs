<template>
  <div>
    <Navbar />
    <nuxt />
    <Footer />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import Footer from '@/components/Footer.vue';
import Navbar from '@/components/Navbar.vue';
@Component({
  components: {
    Footer,
    Navbar,
  },
})
export default class Guesthome extends Vue {}
</script>

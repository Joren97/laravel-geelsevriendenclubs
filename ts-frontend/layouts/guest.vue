<template>
  <div>
    <Navbar />
    <section class="section container main-content">
      <nuxt />
    </section>
    <Footer />
  </div>
</template>
<script>
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
export default {
  components: { Footer, Navbar },
};
</script>

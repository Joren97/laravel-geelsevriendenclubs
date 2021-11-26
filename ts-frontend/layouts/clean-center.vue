<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-8-desktop">
            <nuxt />
          </div>
        </div>
      </div>
    </div>
    <Snackbar />
  </section>
</template>
<script>
import Snackbar from '@/components/Snackbar';
export default {
  components: { Snackbar },
};
</script>

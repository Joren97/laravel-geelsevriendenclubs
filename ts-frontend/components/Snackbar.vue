<template><div></div></template>

<script>
export default {
  name: 'Snackbar',
  created: function () {
    this.$store.watch(
      (state) => state.snackFailure,
      () => {
        const msg = this.$store.state.snackFailure;

        if (msg !== '') {
          this.$buefy.snackbar.open({
            message: this.$store.state.snackFailure,
            type: 'is-danger',
            position: 'is-bottom',
            duration: 5000,
            queue: false,
          });

          this.$store.commit('setSnackFailure', '');
        }
      },
    );
    this.$store.watch(
      (state) => state.snackSuccess,
      () => {
        const msg = this.$store.state.snackSuccess;

        if (msg !== '') {
          this.$buefy.snackbar.open({
            message: this.$store.state.snackSuccess,
            type: 'is-warning',
            position: 'is-bottom',
            duration: 5000,
            queue: false,
          });

          this.$store.commit('setSnackSuccess', '');
        }
      },
    );
  },
};
</script>

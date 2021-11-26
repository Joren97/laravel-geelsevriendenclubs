<template>
  <section class="content">
    <h1>Kalender &amp; uitslagen</h1>
    <div class="columns is-hidden-desktop">
      <div class="column">
        <b-datepicker
          v-model="month"
          placeholder="Click to select..."
          type="month"
          icon="calendar-today"
          range
          :mobile-native="false"
        ></b-datepicker>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <CalendarTable v-if="games.length > 0" :games="games" />
        <p v-else>Geen wedstrijden om weer te geven.</p>
      </div>
      <div class="column is-narrow is-hidden-touch">
        <b-datepicker
          v-model="month"
          type="month"
          icon="calendar-today"
          inline
          trap-focus
        ></b-datepicker>
      </div>
    </div>
  </section>
</template>
<script>
import moment from 'moment';
import { mapState } from 'vuex';
import CalendarTable from '@/components/CalendarTable';
export default {
  components: { CalendarTable },
  layout: 'guest',
  async fetch({ store, query }) {
    await store.commit('game/setQueryParams', query);
    store.dispatch('game/getAll');
  },
  computed: {
    ...mapState({
      loading: (state) => state.game.loading,
      games: (state) => state.game.games,
    }),
    month: {
      get() {
        return new Date(this.$store.state.game.filterDates[0]);
      },
      set(value) {
        const start = moment(value).startOf('month').format('YYYY-MM-DD');
        const end = moment(value).endOf('month').format('YYYY-MM-DD');
        this.$router.push(`?from=${start}&till=${end}`);
      },
    },
  },
  watchQuery: true,
};
</script>

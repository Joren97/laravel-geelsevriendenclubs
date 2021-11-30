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
        <div v-if="loadingActive">
          <b-skeleton></b-skeleton>
          <b-skeleton></b-skeleton>
          <b-skeleton></b-skeleton>
          <b-skeleton></b-skeleton>
        </div>
        <div v-else>
          <CalendarTable v-if="games.length > 0" :games="games" />
          <p v-else>Geen wedstrijden om weer te geven.</p>
        </div>
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
<script lang="ts">
import moment from 'moment';
import CalendarTable from '@/components/CalendarTable.vue';
import { Vue, Component, Watch } from 'nuxt-property-decorator';
import { gameModule } from '~/store';
@Component({
  components: { CalendarTable },
  layout: 'guest',
  name: 'Calendar',
})
export default class Calendar extends Vue {
  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(
    to: { query: { from: string; till: string } },
    from: { query: { from: string; till: string } },
  ) {
    console.log('Route watch triggered');
    if (!to || !from) return;

    let trigger = false;
    if (to.query.from !== from.query.from) {
      gameModule.setFromDate(to.query.from);
      trigger = true;
    }

    if (to.query.till !== from.query.till) {
      gameModule.setTillDate(to.query.till);
      trigger = true;
    }

    if (trigger) gameModule.getAll();
  }

  get loadingActive() {
    return gameModule.loading;
  }

  get games() {
    return gameModule.items;
  }

  get month() {
    return new Date();
  }

  set month(value: Date) {
    const start = moment(value).startOf('month').format('YYYY-MM-DD');
    const end = moment(value).endOf('month').format('YYYY-MM-DD');
    this.$router.push(`?from=${start}&till=${end}`);
  }

  async fetch({ query }: any) {
    gameModule.setPaginationParams(query);
    gameModule.getAll();
  }
}
</script>

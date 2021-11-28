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
<script lang="ts">
import moment from 'moment';
import CalendarTable from '@/components/CalendarTable.vue';
import { Vue, Component, Watch } from 'nuxt-property-decorator';
import { gameModule } from '~/store';
@Component({
  components: { CalendarTable },
  layout: 'guest'
})
export default class Calendar extends Vue {

  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(
    to: { query: { page: string; sorting: string } },
    from: { query: { page: string; sorting: string } },
  ) {
    console.log('Route watch triggered');
    if (!to || !from) return;

    let trigger = false;
    if (to.query.page !== from.query.page) {
      gameModule.setPaginationParams({
        page: to.query.page
      });
      trigger = true;
    }
    if (trigger) gameModule.getAll();
  }

  async fetch({ query }: any) {
    gameModule.setPaginationParams(query);
    gameModule.getAll();
  }

  get loading(){
    return gameModule.loading;
  }

  get games(){
    return gameModule.items;
  }

  get month(){
    return new Date();;
  }

  set month(value: Date){
        const start = moment(value).startOf('month').format('YYYY-MM-DD');
        const end = moment(value).endOf('month').format('YYYY-MM-DD');
        this.$router.push(`?from=${start}&till=${end}`);

  }
};
</script>

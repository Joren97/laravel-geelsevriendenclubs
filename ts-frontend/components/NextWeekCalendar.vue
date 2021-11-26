<template>
  <div class="content">
    <p class="title has-text-black">Volgende wedstrijden</p>
    <div class="box has-background-black has-text-white is-relative">
      <b-loading :is-full-page="false" :active.sync="loading"></b-loading>
      <div class="level has-text-weight-bold">
        {{ saturday }}
      </div>
      <div v-if="nextWeekGames.length < 1">
        <p class="has-text-white">Geen wedstrijden om weer te geven.</p>
      </div>
      <div
        v-for="game in nextWeekGames"
        v-else
        :key="game.id"
        class="columns border-bottom-green is-mobile"
      >
        <div class="column">
          {{ game.dateTime | toTime('nl-BE', 'Europe/Amsterdam') }}
        </div>
        <div class="column is-narrow">
          {{ game.home_team.name }} - {{ game.out_team.name }}
        </div>
      </div>
      <div class="level mt-1">
        <div class="level-item">
          <b-button
            type="is-success"
            class="has-text-white"
            outlined
            to="/calendar"
            tag="router-link"
          >
            Bekijk kalender
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import moment from 'moment';
import { gameModule } from '~/store';
import Game from '~/models/Game';

@Component({
  name: 'NextWeekCalendar',
})
export default class NextWeekCalendar extends Vue {
  loading = true;
  saturday = moment().endOf('week').format('DD/MM/YYYY');

  get nextWeekGames(): Game[] {
    return gameModule.nextWeekGames;
  }

  beforeMount() {
    const saturday = moment().endOf('week').format('YYYY-MM-DD');
    const sunday = moment(saturday).add(1, 'd').format('YYYY-MM-DD');
    gameModule
      .getNextWeekGames({ from: saturday, till: sunday })
      .finally(() => {
        this.loading = false;
      });
  }
}
</script>

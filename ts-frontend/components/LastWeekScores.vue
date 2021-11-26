<template>
  <div class="content">
    <p class="title has-text-black">Laatste uitslagen</p>
    <div class="box has-background-black has-text-white is-relative">
      <b-loading :is-full-page="false" :active.sync="loading"></b-loading>
      <div class="level has-text-weight-bold">
        {{ saturday }}
      </div>
      <div v-if="lastWeekGames.length < 1">
        <p class="has-text-white">Geen wedstrijden om weer te geven.</p>
      </div>
      <div
        v-for="game in lastWeekGames"
        v-else
        :key="game.id"
        class="columns border-bottom-green is-mobile"
      >
        <div class="column" :class="winningClass(game, true)">
          {{ game.home_team.name }}
        </div>
        <div class="column is-narrow has-text-centered">
          {{ game.homeTeamScore }} - {{ game.outTeamScore }}
        </div>
        <div class="column has-text-right" :class="winningClass(game, false)">
          {{ game.out_team.name }}
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
  name: 'LastWeekScores',
})
export default class LastWeekScores extends Vue {
  loading = true;
  saturday = moment().subtract(7, 'd').endOf('week').format('DD/MM/YYYY');

  beforeMount() {
    const saturday = moment()
      .subtract(7, 'd')
      .endOf('week')
      .format('YYYY-MM-DD');
    const sunday = moment(saturday).add(1, 'd').format('YYYY-MM-DD');
    gameModule
      .getLastWeekGames({ from: saturday, till: sunday })
      .finally(() => {
        this.loading = false;
      });
  }

  get lastWeekGames(): Game[] {
    return gameModule.lastWeekGames;
  }

  winningClass(game: Game, home: boolean) {
    if (home) {
      if (game.homeTeamScore > game.outTeamScore) return 'has-text-primary';
    } else {
      if (game.homeTeamScore < game.outTeamScore) return 'has-text-primary';
    }
    return '';
  }
}
</script>

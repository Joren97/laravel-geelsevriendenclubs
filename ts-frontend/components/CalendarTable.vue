<template>
  <div class="">
    <div v-for="date in dates" :key="date" class="mb-3 fixture">
      <div class="columns fixture-heading">
        <div class="column">
          <h5 class="mb-0">{{ date | toDate('nl-BE', 'Europe/Amsterdam') }}</h5>
        </div>
      </div>
      <div
        v-for="game in matchesOnDate(date)"
        :key="game.id"
        class="columns is-mobile fixture-row"
      >
        <div class="column">
          <div class="columns is-mobile">
            <div class="column">
              <article class="media">
                <div class="media-content">{{ game.home_team.name }}</div>
                <div class="media-right">
                  <img
                    v-if="game.home_team.icon"
                    :src="require(`~/assets/images/${game.home_team.icon}`)"
                    class="image is-24x24"
                  />
                </div>
              </article>
            </div>
            <div class="column is-narrow has-text-centered">
              {{ game.homeTeamScore }} - {{ game.outTeamScore }}
            </div>
            <div class="column has-text-right">
              <article class="media">
                <div class="media-left">
                  <img
                    v-if="game.out_team.icon"
                    :src="require(`~/assets/images/${game.out_team.icon}`)"
                    class="image is-24x24"
                  />
                </div>
                <div class="media-content">{{ game.out_team.name }}</div>
              </article>
            </div>
          </div>
        </div>
        <div class="column is-hidden-mobile pl-3 is-4">
          {{ game.home_team.address }}, {{ game.home_team.postalCode }}
          {{ game.home_team.city }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import moment from 'moment';
import { GameDto } from '~/models/Game';

@Component({
  name: 'CalendarTable',
})
export default class CalendarTable extends Vue {
  @Prop({
    type: Array,
    required: true,
    default: () => {
      return [];
    },
  })
  // @ts-ignore
  games: Array<GameDto>;

  get dates() {
    let datetimes = this.games.map((x) => {
      return moment(x.dateTime).format('YYYY-MM-DD');
    });
    let uniques: string[] = [];
    for (var i = 0; i < datetimes.length; i++) {
      if (!uniques.includes(datetimes[i])) {
        uniques.push(datetimes[i]);
      }
    }
    return uniques;
  }

  getXMatchOnDate(date: string, i: number, j: number): GameDto {
    let games = this.matchesOnDate(date);
    games = games.slice((i - 1) * 3, games.length);
    return games[j - 1];
  }

  matchesOnDate(date: string) {
    return this.games.filter(
      (x: GameDto) => moment(x.dateTime).format('YYYY-MM-DD') === date,
    );
  }

  matchesOnDayUppedToMultipleOfThree(date: string) {
    let amountOfMatches = this.matchesOnDate(date).length;
    let multiple = amountOfMatches + 3 - 1;
    multiple -= multiple % 3;
    return multiple;
  }
}
</script>
<style lang="scss" scoped>
$border-color: #dbdbdb;

.fixture-row {
  border-bottom: 1px solid $border-color;
}

.fixture-heading {
  border-bottom: 2px solid $border-color;
}
</style>

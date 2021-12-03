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
            <div class="column">{{ game.home_team.name }}</div>
            <div class="column is-narrow has-text-centered">
              {{ game.homeTeamScore }} - {{ game.outTeamScore }}
            </div>
            <div class="column has-text-right">{{ game.out_team.name }}</div>
          </div>
        </div>
        <div class="column is-hidden-mobile pl-3">
          {{ game.home_team.address }}, {{ game.home_team.postalCode }}
          {{ game.home_team.city }}
        </div>
      </div>
    </div>

    <table
      v-for="date in dates"
      :key="date"
      class="table is-striped is-hoverable"
    >
      <thead>
        <tr>
          <th>{{ date | toDate('nl-BE', 'Europe/Amsterdam') }}</th>
          <th></th>
          <th></th>
          <th class="is-hidden-mobile"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="game in matchesOnDate(date)" :key="game.id">
          <!-- <td>
            <div class="columns">
              <div class="column">{{ game.home_team.name }}</div>
              <div class="column is-narrow">
                {{ game.homeTeamScore }} - {{ game.outTeamScore }}
              </div>
              <div class="column">{{ game.out_team.name }}</div>
            </div>
          </td> -->
          <td style="min-width: 9rem" class="has-text-right">
            {{ game.home_team.name }}
          </td>
          <td>{{ game.homeTeamScore }} - {{ game.outTeamScore }}</td>
          <td>{{ game.out_team.name }}</td>
          <td style="min-width: 9rem" class="has-text-right is-hidden-mobile">
            {{ game.home_team.address }}, {{ game.home_team.postalCode }}
            {{ game.home_team.city }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- <table
      v-for="date in dates"
      :key="date"
      class="table is-bordered is-hidden-touch"
      style="table-layout: fixed"
    >
      <thead>
        <tr>
          <th colspan="3">
            {{ date | toDate('nl-BE', 'Europe/Amsterdam') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in matchesOnDayUppedToMultipleOfThree(date) / 3" :key="i">
          <td v-for="j in 3" :key="j">
            <div v-if="getXMatchOnDate(date, i, j)" class="columns">
              <div class="column">
                <div class="columns">
                  <div class="column has-text-grey is-narrow">
                    {{
                      getXMatchOnDate(date, i, j).dateTime
                        | toTime('nl-BE', 'Europe/Amsterdam')
                    }}
                  </div>
                  <div v-if="getXMatchOnDate(date, i, j).isCup" class="column">
                    <b-icon icon="trophy" size="is-small" type="is-grey" />
                  </div>
                </div>
                <div class="columns mb-0">
                  <div class="column">
                    {{ getXMatchOnDate(date, i, j).home_team.name }}
                  </div>
                  <div class="column is-narrow">
                    {{ getXMatchOnDate(date, i, j).homeTeamScore }}
                  </div>
                </div>
                <div class="columns">
                  <div class="column">
                    {{ getXMatchOnDate(date, i, j).out_team.name }}
                  </div>
                  <div class="column is-narrow">
                    {{ getXMatchOnDate(date, i, j).outTeamScore }}
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table> -->
    <div
      v-for="(date, index) in dates"
      :key="index"
      class="columns is-hidden-desktop is-multiline"
    >
      <div class="column is-12">
        <h3>{{ date | toDate('nl-BE', 'Europe/Amsterdam') }}</h3>
      </div>
      <div
        v-for="game in matchesOnDate(date)"
        :key="game.id"
        class="column is-12"
      >
        <div class="box py-0">
          <div class="columns is-mobile mb-0">
            <div class="column has-text-grey is-narrow">
              {{ game.dateTime | toTime('nl-BE', 'Europe/Amsterdam') }}
            </div>
            <div v-if="game.isCup" class="column">
              <b-icon icon="trophy" size="is-small" type="is-grey" />
            </div>
          </div>
          <div class="columns is-mobile mb-0">
            <div class="column mb-0 pb-0">
              {{ game.home_team.name }}
            </div>
            <div class="column is-narrow mb-0 pb-0">
              {{ game.homeTeamScore }}
            </div>
          </div>
          <div class="columns is-mobile mb-0 pb-0">
            <div class="column mb-0">
              {{ game.out_team.name }}
            </div>
            <div class="column is-narrow mb-0 pb-0">
              {{ game.outTeamScore }}
            </div>
          </div>
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

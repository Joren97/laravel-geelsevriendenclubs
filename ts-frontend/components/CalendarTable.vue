<template>
  <div class="content">
    <table
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
                    {{ getXMatchOnDate(date, i, j).homeTeam.name }}
                  </div>
                  <div class="column is-narrow">
                    {{ getXMatchOnDate(date, i, j).homeTeamScore }}
                  </div>
                </div>
                <div class="columns">
                  <div class="column">
                    {{ getXMatchOnDate(date, i, j).outTeam.name }}
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
    </table>
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
        :key="game.index"
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
              {{ game.homeTeam.name }}
            </div>
            <div class="column is-narrow mb-0 pb-0">
              {{ game.homeTeamScore }}
            </div>
          </div>
          <div class="columns is-mobile mb-0 pb-0">
            <div class="column mb-0">
              {{ game.outTeam.name }}
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
<script>
import moment from 'moment';
export default {
  props: {
    games: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  computed: {
    dates() {
      let datetimes = this.games.map((x) => {
        return moment(x.dateTime).format('YYYY-MM-DD');
      });
      let uniques = [];
      for (var i = 0; i < datetimes.length; i++) {
        if (!uniques.includes(datetimes[i])) {
          uniques.push(datetimes[i]);
        }
      }
      return uniques;
    },
  },
  methods: {
    getXMatchOnDate(date, i, j) {
      let games = this.matchesOnDate(date);
      games = games.slice((i - 1) * 3, games.length);
      return games[j - 1];
    },
    matchesOnDate(date) {
      return this.games.filter(
        (x) => moment(x.dateTime).format('YYYY-MM-DD') === date,
      );
    },
    matchesOnDayUppedToMultipleOfThree(date) {
      let amountOfMatches = this.matchesOnDate(date).length;
      let multiple = amountOfMatches + 3 - 1;
      multiple -= multiple % 3;
      return multiple;
    },
  },
};
</script>

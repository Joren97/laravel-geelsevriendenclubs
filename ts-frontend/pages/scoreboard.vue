<template>
  <section class="content">
    <h1>Rangschikking</h1>
    <b-table :data="scoreBoard" striped mobile-cards :loading="loading">
      <template>
        <b-table-column v-slot="props" field="index" label="Positie">
          {{ props.row.index }}.
        </b-table-column>
        <b-table-column v-slot="props" field="name" label="Naam">
          {{ props.row.team.name }}
        </b-table-column>
        <b-table-column
          v-slot="props"
          field="gamesPlayed"
          label="Gespeeld"
          numeric
          centered
        >
          {{ props.row.gamesPlayed }}
        </b-table-column>
        <b-table-column
          v-slot="props"
          field="gamesWon"
          label="Gewonnen"
          numeric
          centered
        >
          {{ props.row.gamesWon }}
        </b-table-column>
        <b-table-column
          v-slot="props"
          field="gamesTied"
          label="Gelijk"
          numeric
          centered
        >
          {{ props.row.gamesTied }}
        </b-table-column>
        <b-table-column
          v-slot="props"
          field="gamesLost"
          label="Verloren"
          numeric
          centered
        >
          {{ props.row.gamesLost }}
        </b-table-column>
        <b-table-column
          v-slot="props"
          field="goalsScored"
          label="Doelpunten"
          numeric
          centered
        >
          {{ props.row.goalsScored }}
        </b-table-column>
        <b-table-column
          v-slot="props"
          field="goalsReceived"
          label="Tegendoelpunten"
          numeric
          centered
        >
          {{ props.row.goalsReceived }}
        </b-table-column>
        <b-table-column
          v-slot="props"
          field="points"
          label="Punten"
          numeric
          centered
        >
          {{ props.row.points }} ptn
        </b-table-column>
      </template>
    </b-table>
  </section>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { teamModule } from '~/store';

@Component({
  layout: 'guest',
})
export default class Scoreboard extends Vue {
  async fetch() {
    teamModule.getScoreboard(false);
  }
  get scoreBoard() {
    let counter = 0;
    const scoreBoard = teamModule.scoreBoard;
    return scoreBoard.map((x: any) => {
      counter++;
      return { index: counter, ...x };
    });
  }

  get loading() {
    return teamModule.loading;
  }
}
</script>

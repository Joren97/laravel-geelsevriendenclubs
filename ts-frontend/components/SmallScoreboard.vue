<template>
  <div class="content">
    <p class="title has-text-black">Rangschikking</p>
    <div class="box has-background-black has-text-white is-relative">
      <b-loading :is-full-page="false" :active.sync="loading"></b-loading>
      <div
        v-for="(team, index) in scoreBoard"
        :key="team.id"
        class="columns border-bottom-green is-mobile"
      >
        <div class="column is-narrow">{{ index + 1 }}.</div>
        <div class="column">{{ team.team.name }}</div>
        <div class="column is-narrow">{{ team.points }} ptn</div>
      </div>
      <div class="level mt-1">
        <div class="level-item">
          <b-button
            type="is-success"
            class="has-text-white"
            to="/scoreboard"
            tag="router-link"
            outlined
          >
            Volledig klassement
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { teamModule } from '~/store';

@Component({
  name: 'SmallScoreboard',
})
export default class SmallScoreboard extends Vue {
  loading = true;

  get scoreBoard() {
    return teamModule.scoreBoard;
  }

  beforeMount() {
    teamModule.getScoreboard(true).finally(() => {
      this.loading = false;
    });
  }
}
</script>

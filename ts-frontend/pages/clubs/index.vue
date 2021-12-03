<template>
  <section class="content">
    <div class="columns">
      <div class="column is-narrow">
        <h1>Clubinfo</h1>
      </div>
    </div>
    <div class="columns is-multiline">
      <div v-for="club in clubs" :key="club.id" class="column is-3">
        <club-card :club="club"></club-card>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { TeamDto } from '~/models/Team';
import { gameModule, teamModule } from '~/store';
import ClubCard from '~/components/ClubCard.vue';
@Component({
  layout: 'guest',
  name: 'Clubs',
  components: { ClubCard },
})
export default class Clubs extends Vue {
  async fetch() {
    teamModule.getAll();
  }

  get clubs(): TeamDto[] {
    return teamModule.items;
  }

  get players() {
    return [];
  }

  destroyed() {
    gameModule.setItem(null);
  }
}
</script>

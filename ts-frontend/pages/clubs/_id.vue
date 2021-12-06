<template>
  <section class="content">
    <div class="columns">
      <div class="column">
        <h1 v-if="loadingActive || !club"><b-skeleton></b-skeleton></h1>
        <h1 v-else>{{ club ? club.name : '' }}</h1>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <h4>Algemene informatie</h4>
        <table class="table is-fullwidth">
          <tr>
            <td>Terrein</td>
            <td v-if="loadingActive || !club"><b-skeleton></b-skeleton></td>
            <td v-else>
              {{ club.address }}, {{ club.postalCode }} {{ club.city }}
            </td>
          </tr>
          <tr>
            <td>Kleuren</td>
            <td v-if="loadingActive || !club"><b-skeleton></b-skeleton></td>
            <td v-else>
              {{ club.color1 }}
              {{ club.color2 ? `- ${club.color2}` : `` }}
              {{ club.color3 ? `- ${club.color3}` : `` }}
            </td>
          </tr>
          <tr>
            <td>Voorzitter</td>
            <td v-if="loadingActive || !club"><b-skeleton></b-skeleton></td>
            <td v-else>Lorem, ipsum.</td>
          </tr>
          <tr>
            <td>Secretaris</td>
            <td v-if="loadingActive || !club"><b-skeleton></b-skeleton></td>
            <td v-else>Lorem, ipsum.</td>
          </tr>
          <tr>
            <td>Contact</td>
            <td v-if="loadingActive || !club"><b-skeleton></b-skeleton></td>
            <td v-else>Lorem, ipsum.</td>
          </tr>
        </table>
        <section v-if="players.length > 0">
          <h4>Spelers</h4>
          <div class="columns is-multiline is-mobile">
            <div
              v-for="p in players"
              :key="p.id"
              class="column is-2-desktop is-3-tablet is-6-mobile"
            >
              <person-card
                :name="p.firstName + ' ' + p.lastName"
                :color1="club ? club.color1Hex : '#000000'"
                :color2="club ? club.color2Hex : ''"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import PersonCard from '~/components/PersonCard.vue';
import { teamModule } from '~/store';
@Component({
  layout: 'guest',
  name: 'ClubDetail',
  components: { PersonCard },
  head: {
    title: 'Clubinfo',
  },
})
export default class ClubDetail extends Vue {
  beforeMount() {
    teamModule.get(this.$route.params.id);
  }

  get club() {
    return teamModule.item;
  }

  get players() {
    if (teamModule.item) return teamModule.item.people;
    return [];
  }

  get loadingActive() {
    return teamModule.loading;
  }

  destroyed() {
    teamModule.setItem(null);
  }
}
</script>

<template>
  <section class="content">
    <div class="columns">
      <div class="column is-narrow">
        <h1>{{ club ? club.name : '' }}</h1>
      </div>
    </div>
    <div class="columns">
      <div v-if="club" class="column">
        <h4>Algemene informatie</h4>
        <table class="table is-fullwidth">
          <tr>
            <td>Terrein</td>
            <td>{{ club.address }}, {{ club.postalCode }} {{ club.city }}</td>
          </tr>
          <tr>
            <td>Kleuren</td>
            <td>
              {{ club.color1 }}
              {{ club.color2 ? `- ${club.color2}` : `` }}
              {{ club.color3 ? `- ${club.color3}` : `` }}
            </td>
          </tr>
          <tr>
            <td>Voorzitter</td>
            <td>Lorem, ipsum.</td>
          </tr>
          <tr>
            <td>Secretaris</td>
            <td>Lorem, ipsum.</td>
          </tr>
          <tr>
            <td>Contact</td>
            <td>Lorem, ipsum.</td>
          </tr>
        </table>
        <h4>Spelers</h4>
        <div class="columns is-multiline">
          <div v-for="p in players" :key="p.id" class="column is-2">
            <person-card
              :name="p.firstName + ' ' + p.lastName"
              :color1="club.color1Hex"
              :color2="club.color2Hex"
            />
          </div>
        </div>
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
})
export default class ClubDetail extends Vue {
  async fetch() {
    teamModule.get(this.$route.params.id);
  }

  get club() {
    return teamModule.item;
  }

  get players() {
    if (teamModule.item) return teamModule.item.people;
    return [];
  }

  destroyed() {
    teamModule.setItem(null);
  }
}
</script>

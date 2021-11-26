<template>
  <div v-if="!$store.state.team.loading" class="content">
    <div class="title">Team details - {{ team.name }}</div>
    <div class="columns">
      <div class="column">
        <p class="subtitle">Spelers</p>
        <ul>
          <li v-for="(person, index) in players" :key="index">
            {{ person.firstName }} {{ person.lastName }}
          </li>
        </ul>
      </div>
      <div class="column">
        <p class="subtitle">Secretaris</p>
        <ul>
          <li v-for="(person, index) in secretaries" :key="index">
            {{ person.firstName }} {{ person.lastName }}
          </li>
        </ul>
      </div>
      <div class="column">
        <p class="subtitle">Voorzitter</p>
        <ul>
          <li v-for="(person, index) in presidents" :key="index">
            {{ person.firstName }} {{ person.lastName }}
          </li>
        </ul>
      </div>
      <div class="column">
        <p class="subtitle">Contact</p>
        <ul>
          <li v-for="(person, index) in contacts" :key="index">
            {{ person.firstName }} {{ person.lastName }}
          </li>
        </ul>
      </div>
      <div class="column is-narrow">
        <div class="content">
          <table class="table">
            <p class="subtitle">Algemene info</p>
            <tbody>
              <tr>
                <td>Naam:</td>
                <td>{{ team.name }}</td>
              </tr>
              <tr>
                <td>Adres:</td>
                <td>{{ team.address }}</td>
              </tr>
              <tr>
                <td>Postcode:</td>
                <td>{{ team.postalCode }}</td>
              </tr>
              <tr>
                <td>Stad:</td>
                <td>{{ team.city }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
export default {
  async fetch({ store, params }) {
    store.dispatch('team/get', params.uuid);
  },
  data() {
    return {
      tabOpen: 1,
    };
  },
  computed: {
    ...mapGetters({
      players: 'team/playersInCurrentTeam',
      secretaries: 'team/secretariesInCurrentTeam',
      presidents: 'team/presidentsInCurrentTeam',
      contacts: 'team/contactsInCurrentTeam',
    }),
    ...mapState({
      team: (state) => state.team.currentTeam,
    }),
  },
};
</script>

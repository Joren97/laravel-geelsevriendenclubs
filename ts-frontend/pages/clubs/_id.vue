<template>
  <section class="content">
    <div class="columns">
      <div class="column is-narrow">
        <h1>{{club ? club.name: ''}}</h1>
      </div>
    </div>
    <!-- <div class="columns is-hidden-desktop">
      <div class="column">
        <b-field>
          <b-select
            placeholder="Selecteer een club"
            expanded
            @input="getCurrentTeam"
          >
            <option
              v-for="team in $store.state.team.teams"
              :key="team.id"
              :value="team.id"
            >
              {{ team.name }}
            </option>
          </b-select>
        </b-field>
      </div>
    </div> -->

    <!-- <div class="columns">
      <div v-if="currentTeam" class="column">
        <div class="columns">
          <div class="column">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">{{ currentTeam.name }}</p>
              </header>
              <div class="card-content">
                <div class="columns">
                  <div class="column">
                    <p class="is-size-4">Informatie</p>
                    <p>
                      {{ currentTeam.address }}
                      <br />
                      {{ currentTeam.postalCode }} {{ currentTeam.city }}
                    </p>
                    <p>
                      {{ currentTeam.color1 }}
                      {{ currentTeam.color2 ? `- ${currentTeam.color2}` : `` }}
                      {{ currentTeam.color3 ? `- ${currentTeam.color3}` : `` }}
                    </p>
                  </div>
                  <div class="column">
                    <h3>Staf</h3>
                    <p>
                      Secretaris:
                      {{ secretary && secretary.firstName | slashIfEmpty }}
                      {{ secretary && secretary.lastName }}
                    </p>
                    <p>
                      Voorzitter:
                      {{ president && president.firstName | slashIfEmpty }}
                      {{ president && president.lastName }}
                    </p>
                    <p>
                      Contact: {{ contact && contact.firstName | slashIfEmpty }}
                      {{ contact && contact.lastName }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="column">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">Spelers</p>
              </header>
            </div>
            <b-table v-if="players.length > 0" :data="players" sticky-header>
              <b-table-column
                v-slot="props"
                field="playerNumber"
                label="Spelersnummer"
              >
                {{ props.row.playerNumber }}
              </b-table-column>
              <b-table-column v-slot="props" field="firstName" label="Voornaam">
                {{ props.row.firstName }}
              </b-table-column>
              <b-table-column
                v-slot="props"
                field="lastName"
                label="Familienaam"
              >
                {{ props.row.lastName }}
              </b-table-column>
            </b-table>
            <p v-else>Geen spelers gevonden.</p>
          </div>
        </div>
      </div>
      <div v-else class="column">
        <p>Selecteer een club om de info te bekijken.</p>
      </div>
    </div> -->
  </section>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { TeamDto } from '~/models/Team';
import { gameModule, teamModule } from '~/store';
import ClubCard from '~/components/ClubCard.vue';
@Component({
  layout: 'guest',
  name: 'ClubDetail',
  components: { ClubCard },
})
export default class ClubDetail extends Vue {
  async fetch() {
    teamModule.get(this.$route.params.id);
  }

  get club(): TeamDto {
    return teamModule.item!;
  }

  destroyed() {
    teamModule.setItem(null);
  }
}
</script>

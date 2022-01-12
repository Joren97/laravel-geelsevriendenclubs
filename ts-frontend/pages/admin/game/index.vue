<template>
  <div>
    <div class="columns">
      <div class="column">
        <div class="content">
          <div class="title">Overzicht van de wedstrijden</div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <b-table :data="games" :loading="loading">
          <template>
            <b-table-column v-slot="props" label="Thuisploeg">
              {{ props.row.homeTeam && props.row.homeTeam.name | slashIfEmpty }}
            </b-table-column>
            <b-table-column v-slot="props" label="Uitploeg">
              {{ props.row.outTeam && props.row.outTeam.name | slashIfEmpty }}
            </b-table-column>
            <b-table-column v-slot="props" label="Datum">
              {{ props.row.dateTime | toDateTime('nl-BE', 'Europe/Amsterdam') }}
            </b-table-column>
            <b-table-column v-slot="props" label="Uitslag" centered>
              <span
                v-if="editingGuid == null || editingGuid != props.row.id"
                class="is-hover"
                @click="enableEditing(props.row)"
              >
                <span
                  v-if="
                    props.row.homeTeamScore != null &&
                    props.row.outTeamScore != null
                  "
                >
                  {{ props.row.homeTeamScore }} - {{ props.row.outTeamScore }}
                </span>
                <span v-else>/</span>
              </span>
              <span v-else class="is-flex is-justify-content-center">
                <b-field>
                  <b-input
                    v-model="homeTeamScore"
                    style="max-width: 3rem"
                  ></b-input>
                  <p class="control">
                    <b-button disabled type="is-dark">-</b-button>
                  </p>
                  <b-input
                    v-model="outTeamScore"
                    style="max-width: 3rem"
                  ></b-input>
                  <p class="control">
                    <b-button
                      type="is-success"
                      icon-left="content-save"
                      @click="saveScore(props.row)"
                    />
                  </p>
                  <p class="control">
                    <b-button
                      type="is-danger"
                      icon-left="cancel"
                      @click="disableEditing"
                    />
                  </p>
                </b-field>
              </span>
            </b-table-column>
            <b-table-column v-slot="props" label="Bekerwedstrijd" centered>
              <b-icon v-if="props.row.isCup" icon="check" />
            </b-table-column>
            <b-table-column v-slot="props">
              <b-button
                size="is-small"
                type="is-primary"
                icon-left="pencil"
                @click="$router.push(`/admin/game/${props.row.id}/edit`)"
              />
              <b-button
                size="is-small"
                type="is-danger"
                icon-left="delete-forever"
                @click="deleteGame(props.row)"
              />
            </b-table-column>
          </template>
          <template slot="empty">
            <section class="section">
              <div class="content has-text-grey has-text-centered">
                <p>Er werden geen wedstrijden gevonden.</p>
              </div>
            </section>
          </template>
          <template slot="footer">
            <Pagination :total="total" :current="page" :per-page="perPage" />
          </template>
        </b-table>
      </div>
      <div class="column is-3 has-text-centered">
        <b-datepicker
          v-model="month"
          type="month"
          icon="calendar-today"
          inline
          trap-focus
        ></b-datepicker>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
import { mapState } from 'vuex';
export default {
  watchQuery: true,
  async beforeMount({ store, query }) {
    await store.commit('game/setQueryParams', query);
    store.dispatch('game/getAll');
  },
  data: () => {
    return {
      editingGuid: null,
      homeTeamScore: 0,
      outTeamScore: 0,
    };
  },
  computed: {
    ...mapState({
      loading: (state) => state.game.loading,
      games: (state) => state.game.games,
      total: (state) => state.game.total,
      page: (state) => state.game.page,
      perPage: (state) => state.game.perPage,
    }),
    month: {
      get() {
        return new Date(this.$store.state.game.filterDates[0]);
      },
      set(value) {
        const start = moment(value).startOf('month').format('YYYY-MM-DD');
        const end = moment(value).endOf('month').format('YYYY-MM-DD');
        this.$router.push(`?from=${start}&till=${end}`);
      },
    },
  },
  methods: {
    enableEditing(game) {
      this.homeTeamScore = game.homeTeamScore;
      this.outTeamScore = game.outTeamScore;
      this.editingGuid = game.id;
    },
    disableEditing() {
      this.homeTeamScore = 0;
      this.outTeamScore = 0;
      this.editingGuid = null;
    },
    saveScore(game) {
      const obj = {
        ...game,
        homeTeamId: game.homeTeam.id,
        outTeamId: game.outTeam.id,
        homeTeamScore: this.homeTeamScore,
        outTeamScore: this.outTeamScore,
      };
      this.$store.dispatch('game/update', obj);
      this.editingGuid = null;
      this.homeTeamScore = 0;
      this.outTeamScore = 0;
    },
    deleteGame(game) {
      let t = game;
      this.$buefy.dialog.confirm({
        title: 'Wedstrijd verwijderen',
        message: 'Ben je zeker dat je deze wedstrijd wilt verwijderen?',
        confirmText: 'Verwijderen',
        cancelText: 'Annuleren',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.$store.dispatch('game/delete', t.id);
        },
      });
    },
  },
};
</script>

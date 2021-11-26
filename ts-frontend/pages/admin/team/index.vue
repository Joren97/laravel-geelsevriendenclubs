<template>
  <div class="content">
    <div class="title">Overzicht van de teams</div>
    <b-table :data="teams" :loading="loading">
      <template>
        <b-table-column v-slot="props" label="Naam">
          {{ props.row.name }}
        </b-table-column>
        <b-table-column v-slot="props" label="Adres">
          {{ props.row.address }}
        </b-table-column>
        <b-table-column v-slot="props" label="Postcode">
          {{ props.row.postalCode }}
        </b-table-column>
        <b-table-column v-slot="props" label="Stad">
          {{ props.row.city }}
        </b-table-column>
        <b-table-column v-slot="props" label="Kleuren">
          {{ props.row.color1 }}
          {{ props.row.color2 ? `- ${props.row.color2}` : `` }}
          {{ props.row.color3 ? `- ${props.row.color3}` : `` }}
        </b-table-column>
        <b-table-column v-slot="props" label="Saldo">
          {{ props.row.balance | toEuroCurrency }}
        </b-table-column>
        <b-table-column v-slot="props">
          <b-button
            type="is-success"
            icon-left="magnify"
            @click="$router.push(`/admin/team/${props.row.id}`)"
          />
          <b-button
            type="is-primary"
            icon-left="pencil"
            @click="$router.push(`/admin/team/${props.row.id}/edit`)"
          />
          <b-button
            type="is-danger"
            icon-left="delete-forever"
            @click="deleteTeam(props.row)"
          />
        </b-table-column>
      </template>
      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>Er zijn nog geen teams.</p>
          </div>
        </section>
      </template>
      <template slot="footer">
        <Pagination :total="total" :current="page" :per-page="perPage" />
      </template>
    </b-table>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  watchQuery: true,
  async fetch({ store, query }) {
    await store.commit('team/setQueryParams', query);
    store.dispatch('team/getAll');
  },
  computed: {
    ...mapState({
      loading: (state) => state.team.loading,
      teams: (state) => state.team.teams,
      total: (state) => state.team.total,
      page: (state) => state.team.page,
      perPage: (state) => state.team.perPage,
    }),
  },
  methods: {
    deleteTeam(team) {
      let t = team;
      this.$buefy.dialog.confirm({
        title: 'Team verwijderen',
        message: `Ben je zeker dat je ${team.name} wilt verwijderen?`,
        confirmText: 'Verwijderen',
        cancelText: 'Annuleren',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.$store.dispatch('team/delete', t.id);
        },
      });
    },
  },
};
</script>

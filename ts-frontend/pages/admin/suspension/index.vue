<template>
  <div class="content">
    <div class="columns">
      <div class="column">
        <div class="title">Boetes</div>
      </div>
    </div>
    <b-table :data="suspensions" detailed :loading="loading">
      <template>
        <b-table-column v-slot="props" label="Naam">
          {{ props.row.player.firstName }} {{ props.row.player.lastName }}
        </b-table-column>
        <b-table-column v-slot="props" label="Boetebedrag" centered>
          {{ props.row.fine | toEuroCurrency }}
        </b-table-column>
        <b-table-column v-slot="props" label="Wedstrijden geschorst" centered>
          {{ props.row.amountOfGames }}
        </b-table-column>
        <b-table-column v-slot="props">
          <b-button
            type="is-primary"
            icon-left="pencil"
            @click="$router.push(`/suspension/${props.row.id}/edit`)"
          />
          <b-button
            type="is-danger"
            icon-left="delete-forever"
            @click="deleteSuspension(props.row)"
          />
        </b-table-column>
      </template>
      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>Er zijn nog geen suspensionen.</p>
          </div>
        </section>
      </template>
      <template slot="detail" slot-scope="props">
        <div class="columns">
          <div class="column is-narrow">
            <article class="media">
              <div class="media-content">
                <div class="content">
                  <p>
                    <span class="has-text-weight-bold">Reden van de boete</span>
                    <br />
                    {{ props.row.reason | slashIfEmpty }}
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </template>
      <template slot="footer">
        <Pagination :total="total" :current="page" :per-page="perPage" />
      </template>
    </b-table>
  </div>
</template>
<script>
import { getName } from '@/utils/enum.js';
import { mapState } from 'vuex';
export default {
  watchQuery: true,
  async beforeMount({ store, query }) {
    await store.commit('suspension/setQueryParams', query);
    store.dispatch('suspension/getAll');
  },
  computed: {
    ...mapState({
      suspensions: (state) => state.suspension.suspensions,
      loading: (state) => state.suspension.loading,
      total: (state) => state.suspension.total,
      page: (state) => state.suspension.page,
      perPage: (state) => state.suspension.perPage,
    }),
  },
  methods: {
    onSearchInput(e) {
      this.$router.push(`?searchString=${e}`);
    },
    getFunctionName(number) {
      return getName(number);
    },
    deleteSuspension(suspension) {
      let t = suspension;
      this.$buefy.dialog.confirm({
        title: 'Suspension verwijderen',
        message: 'Ben je zeker dat je deze boete wilt verwijderen?',
        confirmText: 'Verwijderen',
        cancelText: 'Annuleren',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.$store.dispatch('suspension/delete', t.id);
        },
      });
    },
  },
};
</script>

<template>
  <div class="content">
    <div class="columns">
      <div class="column">
        <div class="title">Overzicht van de personen</div>
      </div>
      <div class="column is-narrow">
        <b-input placeholder="Zoeken.." @input="onSearchInput"></b-input>
      </div>
    </div>
    <b-table :data="persons" detailed :loading="loading">
      <template>
        <b-table-column v-slot="props" label="Naam">
          {{ props.row.firstName }} {{ props.row.lastName }}
        </b-table-column>
        <b-table-column v-slot="props" label="Email">
          {{ props.row.email }}
        </b-table-column>
        <b-table-column v-slot="props" label="Team">
          {{ props.row.team && props.row.team.name | slashIfEmpty }}
        </b-table-column>
        <b-table-column v-slot="props" label="Type">
          {{ getFunctionName(props.row.function) }}
        </b-table-column>
        <b-table-column v-slot="props">
          <b-button
            type="is-primary"
            icon-left="pencil"
            @click="$router.push(`/person/${props.row.id}/edit`)"
          />
          <b-button
            type="is-danger"
            icon-left="delete-forever"
            @click="deletePerson(props.row)"
          />
        </b-table-column>
      </template>
      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>Er zijn nog geen personen.</p>
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
                    <span class="has-text-weight-bold">Adres</span>
                    <br />
                    {{ props.row.address }}
                    <br />
                    {{ props.row.postalCode }} {{ props.row.city }}
                  </p>
                </div>
              </div>
            </article>
          </div>
          <div v-if="props.row.function == 0" class="column is-narrow">
            <article class="media">
              <div class="media-content">
                <div class="content">
                  <p>
                    <span class="has-text-weight-bold">Spelersnummer</span>
                    <br />
                    {{ props.row.playerNumber }}
                  </p>
                </div>
              </div>
            </article>
          </div>
          <div class="column"></div>
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
  async fetch({ store, query }) {
    await store.commit('person/setQueryParams', query);
    store.dispatch('person/getAll');
  },
  computed: {
    ...mapState({
      persons: (state) => state.person.persons,
      loading: (state) => state.person.loading,
      total: (state) => state.person.total,
      page: (state) => state.person.page,
      perPage: (state) => state.person.perPage,
    }),
  },
  methods: {
    onSearchInput(e) {
      this.$router.push(`?searchString=${e}`);
    },
    getFunctionName(number) {
      return getName(number);
    },
    deletePerson(person) {
      let t = person;
      this.$buefy.dialog.confirm({
        title: 'Person verwijderen',
        message: `Ben je zeker dat je ${person.firstName} ${person.lastName} wilt verwijderen?`,
        confirmText: 'Verwijderen',
        cancelText: 'Annuleren',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.$store.dispatch('person/delete', t.id);
        },
      });
    },
  },
};
</script>

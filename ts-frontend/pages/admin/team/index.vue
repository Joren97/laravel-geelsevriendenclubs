<template>
  <div class="content">
    <div class="title">Overzicht van de teams</div>
    <b-table :data="teams" :loading="loadingActive">
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
        <Pagination
          :total="total"
          :current="pagination.page"
          :per-page="pagination.perPage"
        />
      </template>
    </b-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator';
import { TeamDto } from '~/models/Team';
import { teamModule } from '~/store';

@Component({
  name: 'TeamOverview',
})
export default class TeamOverview extends Vue {
  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(
    to: { query: { page: number } },
    from: { query: { page: number } },
  ) {
    if (!to || !from) return;

    let trigger = false;
    if (to.query.page !== from.query.page) {
      teamModule.setPaginationParams({ page: to.query.page });
      trigger = true;
    }

    if (trigger) teamModule.getAll();
  }

  async fetch() {
    teamModule.setPaginationParams({});
    teamModule.getAll();
  }

  get loadingActive() {
    return teamModule.loading;
  }

  get teams() {
    return teamModule.items;
  }

  get total() {
    return teamModule.totalCount;
  }

  get pagination() {
    return teamModule.paginationParams;
  }

  deleteTeam(team: TeamDto) {
    let t = team;
    this.$buefy.dialog.confirm({
      title: 'Team verwijderen',
      message: `Ben je zeker dat je ${team.name} wilt verwijderen?`,
      confirmText: 'Verwijderen',
      cancelText: 'Annuleren',
      type: 'is-danger',
      hasIcon: true,
      onConfirm: () => {
        teamModule.delete(t.id);
      },
    });
  }
}
</script>

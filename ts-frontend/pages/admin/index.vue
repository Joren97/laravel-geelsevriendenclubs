<template>
  <section class="section">
    <div class="columns is-mobile">
      <card title="Wedstrijden" icon="calendar-today">
        <nuxt-link to="/admin/game" class="card-footer-item has-text-black">
          Alle wedstrijden
        </nuxt-link>
        <nuxt-link to="/admin/game/new" class="card-footer-item has-text-black">
          Nieuwe wedstrijd
        </nuxt-link>
      </card>

      <card title="Teams" icon="account-supervisor">
        <nuxt-link to="/admin/game" class="card-footer-item has-text-black">
          Alle teams
        </nuxt-link>
        <nuxt-link to="/admin/game/new" class="card-footer-item has-text-black">
          Nieuw team
        </nuxt-link>
      </card>

      <card title="Personen" icon="account-multiple">
        <nuxt-link to="/admin/game" class="card-footer-item has-text-black">
          Alle personen
        </nuxt-link>
        <nuxt-link to="/admin/game/new" class="card-footer-item has-text-black">
          Nieuwe persoon
        </nuxt-link>
      </card>

      <card title="Boetes" icon="currency-eur">
        <nuxt-link to="/admin/game" class="card-footer-item has-text-black">
          Alle boetes
        </nuxt-link>
        <nuxt-link to="/admin/game/new" class="card-footer-item has-text-black">
          Nieuwe boete
        </nuxt-link>
      </card>
    </div>
  </section>
</template>

<script>
import Card from '~/components/Card';

export default {
  name: 'HomePage',

  components: {
    Card,
  },
};
</script>

<template>
  <section class="content">
    <h1>Schorsingen &amp; boetes</h1>
    <div class="columns">
      <div class="column is-3">
        <nav class="panel">
          <p class="panel-heading mb-0">
            {{ category == 0 ? 'Clubs' : 'Spelers' }}
          </p>
          <p class="panel-tabs mb-0">
            <a
              :class="category == 0 ? `is-active` : ``"
              @click="setCategory(0)"
            >
              Clubs
            </a>
            <a
              :class="category == 1 ? `is-active` : ``"
              @click="setCategory(1)"
            >
              Spelers
            </a>
          </p>
          <a
            v-for="item in items"
            :key="item.id"
            class="panel-block"
            @click="setSelected(item.id)"
          >
            {{ display(item) }}
          </a>
        </nav>
      </div>
      <div v-if="category == 0" class="column">
        <div v-if="currentItem" class="content">
          <h2>{{ currentItem.name }}</h2>
          <p>
            <span class="has-text-weight-bold">Resterend saldo</span>
          </p>
          <p>
            {{ currentItem.balance | toEuroCurrency }}
          </p>
          <p>
            <span class="has-text-weight-bold">Boetes</span>
          </p>
          <p v-if="suspensionsForTeam.length < 1">
            Geen boetes om weer te geven.
          </p>
          <div
            v-for="sus in suspensionsForTeam"
            v-else
            :key="sus.id"
            class="columns is-mobile my-0 py-0 is-12 is-vcentered"
          >
            <div class="column my-0 py-0">
              {{ sus.player.firstName }} {{ sus.player.lastName }} zal voor
              {{ sus.amountOfGames }} wedstrijd{{
                sus.amountOfGames != 1 ? 'en' : ''
              }}
              geschorst worden vanaf
              {{ sus.startDate | toDate('nl-BE', 'Europe/Amsterdam') }}:
              {{ sus.reason }}
            </div>
            <div v-if="sus.fine != 0" class="column is-narrow my-0 py-0">
              {{ sus.fine | toEuroCurrency }}
            </div>
          </div>
        </div>
      </div>
      <div v-else class="column">
        <p>Selecteer een club of speler om de boetes te bekijken.</p>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  layout: 'guest',
  beforeMount({ store }) {
    store.dispatch('team/getAllUnfiltered');
    store.dispatch('suspension/getAll');
  },
  data() {
    return {
      category: 0,
      selectedId: null,
    };
  },
  computed: {
    items() {
      if (this.category == 0) {
        return this.$store.state.team.teams;
      } else {
        return this.$store.state.suspension.suspensions;
      }
    },
    currentItem() {
      return this.items.find((x) => x.id == this.selectedId);
    },
    suspensionsForTeam() {
      return this.$store.state.suspension.suspensions;
    },
  },
  methods: {
    setCategory(value) {
      this.category = value;
      if (value == 1)
        this.$store.dispatch('suspension/getAll', { teamId: null });
    },
    setSelected(value) {
      this.selectedId = value;
      if (this.category == 0) {
        this.$store.dispatch('suspension/getAll', { teamId: value });
      } else {
        this.$store.dispatch('suspension/getAll', { teamId: null });
      }
    },
    display(item) {
      if (this.category == 0) {
        return item.name;
      } else {
        return `${item.player.firstName} ${item.player.lastName}`;
      }
    },
  },
};
</script>

<template>
  <b-navbar spaced type="is-primary">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="~assets/images/logo.svg" height="200px" />
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item
        v-for="(item, index) in navItems"
        :key="index"
        :to="item.link"
        tag="router-link"
        class="navbar-item has-text-black"
      >
        {{ item.display }}
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
<script>
export default {
  data: function () {
    return {
      navItems: [
        { display: 'Home', link: '/' },
        { display: 'Kalender & uitslagen', link: '/calendar' },
        { display: 'Rangschikking', link: '/scoreboard' },
        // { display: 'Schorsingen & boetes', link: '/suspensions' },
        { display: 'Clubinfo', link: '/clubs' },
        { display: 'Reglement', link: '/rules' },
      ],
    };
  },
};
</script>

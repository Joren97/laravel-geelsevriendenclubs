<template>
  <div>
    <b-navbar spaced type="is-primary">
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img src="~assets/images/logo.svg" height="200px" />
        </b-navbar-item>
      </template>
    </b-navbar>

    <section class="main-content columns">
      <aside class="column is-2 section">
        <b-menu>
          <b-menu-list
            v-for="(menuItem, index) in menu"
            :key="index"
            :label="menuItem.category"
          >
            <b-menu-item
              v-for="(item, index2) in menuItem.items"
              :key="index2"
              :icon="item.icon"
              :label="item.display"
              @click="$router.push(`/admin/${item.link}`)"
            ></b-menu-item>
          </b-menu-list>
        </b-menu>
      </aside>

      <div class="column is-10 section">
        <nuxt />
      </div>
      <Snackbar />
    </section>
    <Footer />
  </div>
</template>

<script>
import Snackbar from '@/components/Snackbar';
import Footer from '@/components/Footer';
export default {
  components: { Snackbar, Footer },
  middleware: 'authenticated',
  data() {
    return {
      menu: [
        {
          category: 'Wedstrijden',
          items: [
            { display: 'Info', icon: 'information-outline', link: 'game' },
            { display: 'Nieuwe wedstrijd', icon: 'plus', link: 'game/new' },
          ],
        },
        {
          category: 'Teams',
          items: [
            { display: 'Info', icon: 'information-outline', link: 'team' },
            { display: 'Nieuw team', icon: 'plus', link: 'team/new' },
          ],
        },
        {
          category: 'Personen',
          items: [
            { display: 'Info', icon: 'information-outline', link: 'person' },
            { display: 'Nieuwe persoon', icon: 'plus', link: 'person/new' },
          ],
        },
        {
          category: 'Boetes',
          items: [
            {
              display: 'Info',
              icon: 'information-outline',
              link: 'suspension',
            },
            { display: 'Nieuwe boete', icon: 'plus', link: 'suspension/new' },
          ],
        },
      ],
    };
  },
};
</script>

<template>
  <div>
    <Navbar />
    <section class="hero is-fullheight main-content">
      <div class="hero-body">
        <div class="container content">
          <div class="columns">
            <div class="column is-7">
              <p class="title has-text-white">Nieuw voetbalseizoen</p>
              <p class="has-text-white">Hallo iedereen!</p>
              <p class="has-text-white">
                Wegens de maatregelen rond COVID-19 zijn wij genoodzaakt om de
                huidige competitie stop te zetten.
                <br />
                Wij hopen opnieuw te kunnen opstarten in februari 2021.
              </p>
              <p class="has-text-white">
                Sportieve groeten
                <br />
                het bestuur
              </p>
            </div>
            <div class="column"></div>
          </div>
        </div>
      </div>
    </section>
    <section class="section container">
      <div class="columns">
        <div class="column"></div>
      </div>
      <div class="columns">
        <div class="column">
          <LastWeekScores />
        </div>
        <div class="column">
          <NextWeekCalendar />
        </div>
        <div class="column">
          <SmallScoreboard />
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import NextWeekCalendar from '@/components/NextWeekCalendar.vue';
import LastWeekScores from '@/components/LastWeekScores.vue';
import SmallScoreboard from '@/components/SmallScoreboard.vue';
import Footer from '@/components/Footer.vue';
import Navbar from '@/components/Navbar.vue';
import { gameModule, teamModule } from '~/store';

@Component({
  components: {
    LastWeekScores,
    NextWeekCalendar,
    SmallScoreboard,
    Footer,
    Navbar,
  },
})
export default class Guesthome extends Vue {
  beforeMount() {
    teamModule.get();
    gameModule.getAll();
  }
}
</script>
<style scoped lang="scss">
.hero {
  background-image: url('~@/assets/images/background.jpg');
  background-blend-mode: multiply;
  background-size: cover;
  background-color: rgba(48, 49, 54, 0.55);
  min-height: calc(60vh - 3.25rem);
  box-shadow: 0 3px 30px 0px #303136;
}
</style>

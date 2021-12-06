<template>
  <div>
    <section class="hero is-fullheight main-content">
      <div class="hero-body">
        <div class="container content">
          <div class="columns">
            <div class="column is-7 is-relative">
              <div v-if="loadingPost">
                <b-skeleton></b-skeleton>
                <b-skeleton></b-skeleton>
                <b-skeleton></b-skeleton>
                <b-skeleton></b-skeleton>
              </div>
              <p class="title has-text-white">
                {{ latestPost.title.rendered }}
              </p>
              <div
                class="has-text-white"
                v-html="latestPost.content.rendered"
              ></div>
            </div>
            <div class="column"></div>
          </div>
        </div>
      </div>
    </section>
    <div class="section container">
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
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import NextWeekCalendar from '@/components/NextWeekCalendar.vue';
import LastWeekScores from '@/components/LastWeekScores.vue';
import SmallScoreboard from '@/components/SmallScoreboard.vue';

@Component({
  layout: 'guest-home',
  head: {
    title: 'Home',
  },
  components: {
    LastWeekScores,
    NextWeekCalendar,
    SmallScoreboard,
  },
})
export default class Homepage extends Vue {
  latestPost = { title: { rendered: '' }, content: { rendered: '' } };
  loadingPost = true;

  async beforeMount() {
    this.$axios
      .get(
        'https://zenithwebdesign.be/projects/wp-geelsevriendenclubs/wp-json/wp/v2/posts',
      )
      .then((res) => {
        this.latestPost = res.data[0];
      })
      .finally(() => {
        this.loadingPost = false;
      });
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

<template>
  <!-- <div class="card is-clickable" @click="openDetail">
    <div class="card-image">
      <figure class="image is-4by3">
        <img
          src="https://bulma.io/images/placeholders/1280x960.png"
          alt="Placeholder image"
        />
      </figure>
    </div>
    <div class="card-content has-text-centered">{{ club.name }}</div>
  </div> -->
  <div class="club-card is-clickable" @click="openDetail">
    <div class="club-card-image">
      <span class="bg-image"></span>
    </div>
    <div class="club-card-badge">
      <div class="badge">
        <img src="~/assets/1.svg" alt="" class="badge-image" />
      </div>
    </div>
    <div class="club-card-info">
      <h4>{{ club.name }}</h4>
      <small>
        {{ club.address }}
        <br />
        {{ club.postalCode }} {{ club.city }}
      </small>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { TeamDto } from '~/models/Team';

@Component({
  name: 'CalendarTable',
})
export default class CalendarTable extends Vue {
  @Prop({
    type: TeamDto,
    required: true,
    default: null,
  })
  club: TeamDto;

  openDetail() {
    console.log('Move to detail');
    this.$router.push(`clubs/${this.club.id}`);
  }
}
</script>
<style lang="scss" scoped>
.club-card {
  box-shadow: 0 1px 4px 0 rgb(0, 0, 0);
  display: block;
  text-align: center;
  position: relative;
  overflow: hidden;
  text-decoration: none;

  .bg-image {
    background-image: url('https://cdn.pixabay.com/photo/2014/10/14/20/24/soccer-488700_960_720.jpg');

    position: relative;
    display: block;
    height: 100%;
    background-position: 50%;
    background-size: cover;
    transition: transform 2s;
  }

  .club-card-image {
    height: 10rem;
    overflow: hidden;
  }

  .club-card-badge {
    box-shadow: 0 1px 3px 0 rgb(0, 0, 0);
    width: 96px;
    height: 96px;
    position: absolute;
    top: 5rem;
    left: 50%;
    margin-left: -50px;
    border-radius: 100%;
    background: #fff;

    .badge {
      left: 50%;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .badge-image {
      width: 7rem;
      height: 7rem;
      vertical-align: middle;
    }
  }

  .club-card-info {
    padding: 3rem 0.5rem 2rem;
    line-height: 1.8;
    background-color: darkcyan;
  }
}
</style>

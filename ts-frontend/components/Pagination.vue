<template>
  <b-pagination
    :total="total"
    :current="currentPage"
    simple
    :per-page="currentPerPage"
    aria-next-label="Next page"
    aria-previous-label="Previous page"
    aria-page-label="Page"
    aria-current-label="Current page"
    @change="onPageChange"
  ></b-pagination>
</template>
<script>
export default {
  props: {
    total: {
      default: 0,
      type: Number,
    },
    current: {
      type: String,
      default: '1',
    },
    perPage: {
      type: String,
      default: '15',
    },
  },
  computed: {
    currentPage() {
      return parseInt(this.current);
    },
    currentPerPage() {
      return parseInt(this.perPage);
    },
  },
  methods: {
    onPageChange(e) {
      this.$router.push(`?page=${e}`);
    },
  },
};
</script>

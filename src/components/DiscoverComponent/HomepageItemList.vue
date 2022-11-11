<template>
  <div class="homepage-content">
    <div v-for="h in HomepageItemList" :key="h.id">
      <div class="homepage-list" @click="gotoRankingListView(h.id)">
        <div class="homepage-icon-title">
          <img class="homepage-icon" v-lazy="h.iconUrl" alt="" />
          <h3>{{ h.name }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    HomepageItemList: Array,
  },
  methods: {
    gotoRankingListView(id) {
      console.log(id);
      if (id == -3) {
        this.$router.push(`/discovr/ranking-list?id=${id}`);
      } else if (id == 13000) {
        this.$router.push(`/discovr/digital-album?id=${id}`);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
::-webkit-scrollbar{
  display: none;
}
.homepage-content {
  height: 10vh;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(142, 142, 142);
  background-color: #222325;
  font-size: 12px;
  overflow-x: auto;

  .homepage-list {
    width: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    text-align: center;
    padding: 0 10px;
    color: #fff;
    .homepage-icon-title {
      width: 100%;
      .homepage-icon {
        width: 50x;
        height: 50px;
      }
    }
  }
}
</style>

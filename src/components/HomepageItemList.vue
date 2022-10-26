<template>
  <div class="recommend-content">
    <div v-for="h in HomepageItemList" :key="h.id">
      <div class="homepage-icon-title">
        <img class="recommend-icon" v-lazy="h.iconUrl" alt="" />
        <h3>{{ h.name }}</h3>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    HomepageItemList: Array,
  },
};
</script>
<style lang="scss" scoped>
.recommend-content {
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #eee;
  background-color: rgb(253, 188, 188);
  font-size: 12px;
  overflow: auto;

  .homepage-icon-title {
    display: flex;
    flex-flow: column;
    justify-content: center;
    text-align: center;
    .recommend-icon {
      width: 50px;
      height: 50px;
    }
  }
}
</style>

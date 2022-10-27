<template>
  <div class="homepage-content">
    <div v-for="h in HomepageItemList" :key="h.id">
      <div class="homepage-list">
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
};
</script>
<style lang="scss" scoped>
.homepage-content {
  height: 10vh;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(142, 142, 142);
  background-color: rgb(253, 188, 188);
  font-size: 12px;
  overflow-x: auto;

  .homepage-list {
    width: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    text-align: center;
    padding: 0 10px;
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

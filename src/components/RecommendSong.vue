<template>
  <div class="recommend-song">
    <div class="recommend-title">
      <h3>推荐歌单</h3>
      <span>更多</span>
    </div>
    <div class="song-content">
      <div class="song-list" v-for="r in RecommendSong" :key="r.id">
        <div class="song-img-title">
          <img class="song-img" v-lazy="r.picUrl" />
          <p class="van-multi-ellipsis--l2">{{ r.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    RecommendSong: Array,
  },
};
</script>
<style lang="scss" scoped>
.recommend-song {
  width: 100vw;
  padding: 15px 0;
  overflow: hidden;
  background-color: #222325;

  .recommend-title {
    padding: 15px;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    color: #fff;
  }

  .song-content {
   background-color: #222325;
    width: 100%;
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .song-img-title {
      margin-bottom: 10px;
      overflow: hidden;
      width: 27vw;
      color: #fff;

      .song-img {
        width: 100%;
        display: block;
        border-radius: 10px;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
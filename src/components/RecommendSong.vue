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

  .recommend-title {
    padding: 0px 15px 15px;
    font-size: 16px;
    font-weight: 400;
    display: flex;
    justify-content: space-between;
  }

  .song-content {
    background-color: rgb(255, 207, 207);
    width: 100%;
    height: 35vh;
    padding: 15px 15px 15px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    overflow: auto;
  
    .song-img-title {
      margin-bottom: 5px;
      border-radius: 10px;
      overflow: hidden;
      width: 25vw;

      .song-img {
        width: 100%;
      }
    }
  }
}
</style>
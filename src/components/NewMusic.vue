<template>
  <div class="new-music">
    <div class="music-title-icon">
      <h3 class="music-title">推荐歌曲</h3>
      <span>更多</span>
    </div>
    <div class="music-list">
      <div v-for="n in NewMusic" :key="n.id">
        <div class="music-img-title">
          <div class="music-mask">
            <img class="music-img" v-lazy="n.picUrl" />
            <div class="mask"></div>
          </div>
          <p class="music-title van-ellipsis">{{ n.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    NewMusic: Array,
  },
};
</script>
<style lang="scss" scoped>
.new-music {
  height: 20vh;

  .music-title-icon {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    font-size: 16px;
    font-weight: bold;
  }

  .music-list {
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: space-between;
    overflow: auto;

    .music-img-title {
      margin: 0 10px;
      width: 100px;
      height: 100%;
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 2px 0 7px 0;

      .music-mask {
        width: 100%;
        position: relative;
        .music-img {
          display: block;
          width: 100%;
        }

        .mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(66, 77, 88, 0.6);
          background-image: url("../assets/imgs/gdt_ic_play.png");
          background-position: center center;
          background-size: 20px;
          background-repeat: no-repeat;
        }
      }

      .music-title {
        text-align: center;
        font-size: 14px;
        white-space: 400;
        padding: 10px ;
      }
    }
  }
}
</style>
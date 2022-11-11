<template>
  <div class="all-song-lists-view">
    <div class="gosong">推荐最好的歌单</div>
    <div class="popular-content">
      <div v-for="p in popularlistdata" :key="p.id">
        <div class="popular-img-title">
          <div class="popular-img" @click="goGedanMusic(p)">
            <img class="imgurl" v-lazy="p.coverImgUrl" />
            <div class="popular-playCount">
              <i class="playCount-icon"></i>
              <span>
                {{
                  p.playCount > 10000
                    ? (p.playCount = Math.floor(p.playCount / 1000) / 10 + "万")
                    : p.playCount
                }}
              </span>
            </div>
          </div>
          <div class="popular-title van-multi-ellipsis--l2">{{ p.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  props: {
    popularlistdata: Array,
  },

  methods: {
    ...mapMutations(["getsongMusictitle"]),
    // 路由跳转到歌单歌曲页
    goGedanMusic(data) {
      this.$router.push(`/gedanmusic/?objid=${data.id}`);
      // 把歌单标题等存进vuex
      this.getsongMusictitle(data);
    },
  },
};
</script>
<style lang="scss" scoped>
.all-song-lists-view {
  width: 100vw;
  height: 100vh;
  padding: 55px 20px 100px;
  background-color: #242121;
  color: #fff;
  overflow: auto;

  .gosong {
    font-size: 16px;
    font-weight: bold;
  }

  .popular-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .popular-img-title {
      width: 42.5vw;
      margin-top: 15px;
      .popular-img {
        width: 100%;
        position: relative;

        .imgurl {
          width: 100%;
          border-radius: 15px;
          display: block;
        }

        .popular-playCount {
          position: absolute;
          bottom: 10px;
          left: 10px;
          padding: 5px 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.6);
          border-radius: 999px;
          transform: scale(0.7);
          transform-origin: bottom left;

          .playCount-icon {
            display: block;
            width: 20px;
            height: 20px;
            margin-right: 5px;
            background-image: url("@/assets/imgs/b7i.png");
            background-position: center center;
            background-size: cover;
            background-repeat: no-repeat;
            content: "";
          }
        }
      }

      .popular-title {
        margin-top: 10px;
        width: 100%;
        height: 35px;
      }
    }
  }
}
</style>
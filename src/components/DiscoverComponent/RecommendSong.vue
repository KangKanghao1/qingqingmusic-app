<template>
  <div class="recommend-song">
    <div class="recommend-title">
      <h3>推荐歌单</h3>
      <span @click="gomusicrecommend">歌单广场</span>
    </div>
    <div class="song-content">
      <div class="song-list" v-for="r in RecommendSong" :key="r.id">
        <div class="song-img-title" @click="goGedanMusic(r)">
          <!-- <img class="song-img" v-lazy="r.picUrl" /> -->
          <van-image lazy-load :src="r.picUrl" class="song-img">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
          <p class="van-multi-ellipsis--l2 song-text">{{ r.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  props: {
    RecommendSong: Array,
  },

  methods: {
    ...mapMutations(["getsongMusictitle"]),
    // 跳转到歌单页面
    gomusicrecommend() {
      this.$router.push(`/musicrecommend`);
    },
    // 跳转到歌单歌曲页面
    goGedanMusic(data) {
      
      this.$router.push(`/gedanmusic/?objid=${JSON.stringify(data)}`);
      // 把歌单标题等存进vuex
      this.getsongMusictitle(data);

    },
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
      .song-text {
        font-size: 12px;
        line-height: 15px;
        text-align: center;
      }
    }
  }
}
</style>
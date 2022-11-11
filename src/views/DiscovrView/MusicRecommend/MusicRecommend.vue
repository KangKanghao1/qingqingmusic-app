<template>
  <transition name="anime" appear>
    <div>
      <div class="popular-nav">
        <i class="quit-popular-icon" @click="quitmusicrecommend"></i>
        <div>歌单广场</div>
        <div>搜索</div>
      </div>
      <AllSongListsView :popularlistdata="popularlistdata" />
    </div>
  </transition>
</template>
<script>
import { popularplaylistdata } from "@/apis/index";
import AllSongListsView from "@/components/MusicRecommendComponent/AllSongListsView.vue";
export default {
  data() {
    return {
      popularlistdata: [],
    };
  },

  mounted() {
    this.getpopularplaylistdata();
  },
  methods: {
    // 获取歌单
    async getpopularplaylistdata() {
      let { data } = await this.$axios(popularplaylistdata);
      this.popularlistdata = data.playlists.map((p) => {
        return {
          coverImgUrl: p.coverImgUrl,
          coverStatus: p.coverStatus,
          description: p.description,
          id: p.id,
          name: p.name,
          tags: p.tags,
          playCount: p.playCount,
          trackCount: p.trackCount,
          subscribedCount: p.subscribedCount,
          shareCount: p.shareCount,
        };
      });
      console.log(data.playlists);
    },

    quitmusicrecommend() {
      this.$router.go(-1);
    },
  },
  components: {
    AllSongListsView,
  },
};
</script>
<style lang="scss" scoped>
.popular-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 54px;
  padding: 20px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  background-color: #242121;
  text-align: center;
  line-height: 54px;
  z-index: 20;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .quit-popular-icon {
    display: block;
    width: 20px;
    height: 20px;
    margin-right: 5px;
    background-image: url("@/assets/imgs/leftdci.png");
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    content: "";
  }
}
// 进入退出动画
.anime-enter,
.anime-leave-to {
  transform: translateX(100%);
}
.anime-enter-active,
.anime-leave-active {
  transition: all 0.25s linear;
}
.anime-enter-to,
.anime-leave {
  transform: translateX(0);
}
</style>
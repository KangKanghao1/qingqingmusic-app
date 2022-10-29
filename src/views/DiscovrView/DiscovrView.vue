<template>
  <div class="discover-view">
    <div class="search-tab">
      <van-search
        class="search-input"
        shape="round"
        background="#fff"
        placeholder="搜索歌曲"
      />
      <div class="music-img"></div>
    </div>

    <discover-content :bannerimgdata="bannerimgdata" />
    
  </div>
</template>
<script>
import { getBannerList } from "../../apis/discover.js";
import DiscoverContent from "./DiscoverContent.vue";
export default {
  components: { DiscoverContent },
  data() {
    return {
      bannerimgdata: [],
    };
  },
  mounted() {
    this.getBannerList();
  },
  methods: {
    async getBannerList() {
      let { data } = await this.$axios(getBannerList);
      this.bannerimgdata = data.banners.map((b) => {
        return {
          id: b.encodeId,
          img: b.pic,
          song: b.song,
          targetId: b.targetId,
          typeTitle: b.typeTitle,
        };
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.discover-view {

  padding:50px 0 50px;
  overflow: auto;
=======

  .search-tab {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    overflow: auto;
    z-index: 10;
    width: 100vw;
    background-color: #fff;

    .van-search {
      width: 85vw;
    }

    .music-img {
      width: 35px;
      height: 35px;
      background-color: rgb(227, 111, 111);
      border-radius: 999px;
    }
  }
}
</style>
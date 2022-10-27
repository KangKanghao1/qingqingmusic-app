<template>
  <div class="discover-content">
    <DiscoverBanner :bannerimgdata="bannerimgdata" />
    <HomepageItemList :HomepageItemList="HomepageItemList" />
    <NewMusic :NewMusic="NewMusic"/>
    <RecommendSong :RecommendSong="RecommendSong" />
  </div>
</template>
<script>
import DiscoverBanner from "@/components/DiscoverBanner.vue";
import RecommendSong from "@/components/RecommendSong.vue";
import NewMusic from "@/components/NewMusic.vue";

import HomepageItemList from "@/components/HomepageItemList.vue";
// nav icon
import { getHomepageItemList } from "../../apis/discover.js";
// 推荐歌单
import { getPlaylistdata } from "../../apis/index.js";
// 新音乐
import { NEWSONGSAPI } from "../../apis/play.js";
// 电台
import { getRadioStationData } from "../../apis/radiostation.js";
export default {
  data() {
    return {
      // nav icon
      HomepageItemList: [],
      // 推荐歌单
      RecommendSong: [],
      // 新音乐
      NewMusic: [],
      // 电台
      radioStation: [],
    };
  },

  props: {
    bannerimgdata: Array,
  },

  mounted() {
    //
    this.getHomepageItemList();
    this.getPlaylistdata();
    this.getnewsongsapi();
    this.getradiostation();
  },

  methods: {
    // nav icon
    async getHomepageItemList() {
      let { data } = await this.$axios(getHomepageItemList);
      this.HomepageItemList = data.data;
      // console.log(data.data);
    },
    // 推荐歌单
    async getPlaylistdata() {
      let { data } = await this.$axios(getPlaylistdata);
      this.RecommendSong = data.result;
      // console.log(data.result);
    },
    // 新音乐
    async getnewsongsapi() {
      let { data } = await this.$axios(NEWSONGSAPI);
      this.NewMusic = data.result;
      console.log("1", data.result);
    },
    // 电台
    async getradiostation() {
      let { data } = await this.$axios(getRadioStationData);
      this.radioStation = data.categories;
      console.log(this.radioStation);
    },
  },

  components: {
    DiscoverBanner,
    HomepageItemList,
    RecommendSong,
    NewMusic,
  },
};
</script>

<style lang="scss" scoped>
.discover-content {
  padding: 55px 0 0;
}
</style>
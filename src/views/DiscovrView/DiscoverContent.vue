<template>
  <div class="discover-content">
    <DiscoverBanner :bannerimgdata="bannerimgdata" />
    <HomepageItemList :HomepageItemList="HomepageItemList" />
    <NewMusic :NewMusic="NewMusic" />
    <RecommendSong :RecommendSong="RecommendSong" />
    <PersonalizedMv :personalizedmv="personalizedmv" />
  </div>
</template>
<script>
import DiscoverBanner from "@/components/DiscoverBanner.vue";
import RecommendSong from "@/components/RecommendSong.vue";
import NewMusic from "@/components/NewMusic.vue";
import PersonalizedMv from "@/components/PersonalizedMv.vue";
import HomepageItemList from "@/components/HomepageItemList.vue";
// nav icon
import { getHomepageItemList } from "../../apis/discover.js";
// 推荐歌单
import { getPlaylistdata } from "../../apis/index.js";
// 新音乐
import { NEWSONGSAPI } from "../../apis/play.js";
// 推荐mv
import { getpersonalizedmv } from "../../apis/play.js";
// 歌手
import { gettoplistartistData } from "../../apis/singer.js";

export default {
  data() {
    return {
      // nav icon
      HomepageItemList: [],
      // 推荐歌单
      RecommendSong: [],
      // 新音乐
      NewMusic: [],
      // 推荐mv
      personalizedmv: [],

      // 歌手
      toplistartistData:[]
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
    this.getpersonalizedmv();
    // 歌手
    this.gettoplistartistData();
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
    },
    // 每日推荐
    async getpersonalizedmv() {
      let { data } = await this.$axios(getpersonalizedmv);
      this.personalizedmv = data.result;

      // 取前三个数据
      // for (let i = 0; i < 3; i++) {
      //   if (this.radioStation.indexOf(data.categories[i]) == -1) {
      //     this.radioStation.push(data.categories[i]);
      //   }
      // }
    },

    async gettoplistartistData() {
      let { data } = await this.$axios(gettoplistartistData);
      console.log(data.list);
    },
  },

  components: {
    DiscoverBanner,
    HomepageItemList,
    RecommendSong,
    NewMusic,
    PersonalizedMv,
  },
};
</script>

<style lang="scss" scoped>
.discover-content {
  padding: 55px 0 0;
}
</style>
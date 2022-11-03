<template>
  <div class="discover-content">
    <DiscoverBanner :bannerimgdata="bannerimgdata" />
    <HomepageItemList :HomepageItemList="HomepageItemList" />
    <NewMusic :NewMusic="NewMusic" />
    <RecommendSong :RecommendSong="RecommendSong" />
    <PersonalizedMv :personalizedmv="personalizedmv" />
    <BangSinger :toplistartistData="toplistartistData" />
    <van-list
    van-clearfixz
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
  
      class="van-clearfix"
    >
    </van-list>
  </div>
</template>
<script>
import DiscoverBanner from "@/components/DiscoverBanner.vue";
import RecommendSong from "@/components/RecommendSong.vue";
import NewMusic from "@/components/NewMusic.vue";
import PersonalizedMv from "@/components/PersonalizedMv.vue";
import HomepageItemList from "@/components/HomepageItemList.vue";
import BangSinger from "@/components/BangSinger.vue";
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
// mapMutations
import { mapActions } from "vuex";

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
      toplistartistData: [],
      // 控制每次获取10个歌手
      toplistdata: 0,

      // 加载list: [],
      loading: false,
      finished: false,
    };
  },

  props: {
    bannerimgdata: Array,
  },

  mounted() {
    
    this.getHomepageItemList();
    this.getPlaylistdata();
    this.getnewsongsapi();
    this.getpersonalizedmv();
    // 歌手
    // this.gettoplistartistData();
  },

  methods: {
    ...mapActions(["getNewSong"]),
    // ...mapMutations(["setSongsList"]),
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
      // 存到本地缓存
      localStorage.songsList = JSON.stringify(this.NewMusic);
      // this.setSongsList(this.NewMusic);
    },
    // 每日推荐mv
    async getpersonalizedmv() {
      let { data } = await this.$axios(getpersonalizedmv);
      this.personalizedmv = data.result;
    },

    // 歌手
    async gettoplistartistData() {
      this.toplistdata += 10;
      let { data } = await this.$axios(gettoplistartistData);

      // 每次调用请求都会给  this.toplistartistData 添加10个数据
      for (let i = 0; i < this.toplistdata; i++) {
        //
        if (this.toplistartistData.indexOf(data.list.artists[i]) == -1) {
          this.toplistartistData.push(data.list.artists[i]);
        }
      }
      // console.log(this.toplistartistData);
    },

    // 加载
    onLoad() {
      // 歌手数据
      this.gettoplistartistData();
      // 加载状态结束
      this.loading = false;
      // 数据全部加载完成

      if (this.toplistartistData) {
        this.finished = true;
      }
    },
  },

  components: {
    DiscoverBanner,
    HomepageItemList,
    RecommendSong,
    NewMusic,
    PersonalizedMv,
    BangSinger,
  },
};
</script>

<style lang="scss" scoped>
.discover-content {

  padding: 55px 0 55px;
}
</style>
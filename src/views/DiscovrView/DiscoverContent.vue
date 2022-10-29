<template>
  <div class="discover-content">
    <DiscoverBanner :bannerimgdata="bannerimgdata" />
    <HomepageItemList :HomepageItemList="HomepageItemList" />
    <RecommendSong :RecommendSong="RecommendSong" />
  </div>
</template>
<script>
import DiscoverBanner from "@/components/DiscoverBanner.vue";
import RecommendSong from "@/components/RecommendSong.vue";
import HomepageItemList from "@/components/HomepageItemList.vue";
import { getHomepageItemList } from "../../apis/discover.js";
import { getPlaylistdata } from "../../apis/index.js";
export default {
  data() {
    return {
      HomepageItemList: [],
      RecommendSong: [],
    };
  },

  props: {
    bannerimgdata: Array,
  },

  mounted() {
    this.getHomepageItemList();
    this.getPlaylistdata();
  },

  methods: {
    async getHomepageItemList() {
      let { data } = await this.$axios(getHomepageItemList);
      this.HomepageItemList = data.data;
      console.log(this.HomepageItemList);
    },

    async getPlaylistdata() {
      let { data } = await this.$axios(getPlaylistdata);
      this.RecommendSong = data.result;
      console.log(data.result);
    },
  },

  components: {
    DiscoverBanner,
    HomepageItemList,
    RecommendSong,
  },
};
</script>

<style lang="scss" scoped>
.discover-content {
  padding: 55px 0 0;
}
</style>
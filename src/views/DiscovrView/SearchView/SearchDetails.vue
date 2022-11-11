<template>
  <div class="details">
    <van-tabs
      v-model="active"
      @click="onClick"
      offset-top="45px"
      sticky
      background="#2c2c2c"
      lazy-render
      ref="tabs"
      swipeable
      color="#fb736f"
      @before-change="change"
      title-inactive-color="#d6d6d6"
      title-active-color="#e7e7e7"
    >
      <van-tab :title="navTab[0].title" :name="navTab[0].id"
        ><SynthesisView :tabsTitle="active"
      /></van-tab>
      <van-tab :title="navTab[1].title" :name="navTab[1].id"
        ><SingleView :tabsTitle="active"
      /></van-tab>
      <van-tab :title="navTab[2].title" :name="navTab[2].id"
        ><AlbumView :tabsTitle="active"
      /></van-tab>
      <van-tab :title="navTab[3].title" :name="navTab[3].id"
        ><SingerView :tabsTitle="active"
      /></van-tab>
      <van-tab :title="navTab[4].title" :name="navTab[4].id"
        ><SonglistView :tabsTitle="active"
      /></van-tab>
      <van-tab :title="navTab[5].title" :name="navTab[5].id"
        ><MvView :tabsTitle="active"
      /></van-tab>
      <van-tab :title="navTab[6].title" :name="navTab[6].id"
        ><TransceiverView :tabsTitle="active"
      /></van-tab>
      <van-tab :title="navTab[7].title" :name="navTab[7].id"
        ><VideoView :tabsTitle="active"
      /></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { SEARCH_TAB } from "@/Tools/defaultSearch";
import SynthesisView from "@/components/SearchComponent/SynthesisView.vue";
import SingleView from "@/components/SearchComponent/SingleView.vue";
import AlbumView from "@/components/SearchComponent/AlbumView.vue";
import SingerView from "@/components/SearchComponent/SingerView.vue";
import SonglistView from "@/components/SearchComponent/SonglistView.vue";
import MvView from "@/components/SearchComponent/MvView.vue";
import TransceiverView from "@/components/SearchComponent/TransceiverView.vue";
import VideoView from "@/components/SearchComponent/VideoView.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      tab: 0,
      active: "1018",
      activeTab: 1018,
      navTab: SEARCH_TAB,
    };
  },

  computed: {
    ...mapState(["synthesisData"]),
  },
  methods: {
    change() {},
    onClick(title) {
      this.active = title;
    },
  },

  watch: {
    synthesisData(newVal) {
      console.log("1", newVal);
      this.$refs.tabs.resize();
    },
  },

  components: {
    SynthesisView,
    SingleView,
    AlbumView,
    SingerView,
    SonglistView,
    MvView,
    TransceiverView,
    VideoView,
  },
};
</script>

<style lang="scss" scoped>
.details {
  height: 100%;
  background-color: #131313;
  z-index: 21;
  overflow: auto;

  .van-tabs__wrap {
    border: none !important;
  }
  .van-tabs__nav--card {
    border: none !important;
  }
}
</style>
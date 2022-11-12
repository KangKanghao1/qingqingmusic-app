<template>
  <div class="singer-mv-view">
    <div class="mv-nav-icon">
      <i class="goto-1-icon"></i>
    </div>
    <van-loading
      v-show="showloading"
      class="spinnerloading"
      type="spinner"
      color="red"
    />
    <VideoView :mvdatalist="mvdatalist" />
  </div>
</template>
<script>
import { getmvplay } from "@/apis/play";
import VideoView from "@/components/VideoView.vue";

export default {
  data() {
    return {
      mvid: "",
      mvdatalist: "",
      showloading:true
    };
  },
  created() {
    this.mvid = this.$route.query.mvid;
    this.getmvplaydata();
  },

  methods: {
    async getmvplaydata() {
      let { data } = await this.$axios(getmvplay(this.mvid));
      this.mvdatalist = data.data.url;
      console.log(data);
      this.showloading = !this.showloading
    },
  },
  computed: {},
  components: {
    VideoView,
  },
};
</script>
<style lang="scss" scoped>
.singer-mv-view {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  color: #fff;
  background-color: black;
  z-index: 50;

  .mv-nav-icon {
    width: 100vw;
    height: 50px;
    padding: 20px;

    .goto-1-icon {
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
}
</style>
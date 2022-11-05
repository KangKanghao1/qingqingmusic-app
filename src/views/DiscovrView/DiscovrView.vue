<template>
  <div class="discover-view">
    <div class="search-tab">
      <van-search
        class="search-input"
        shape="round"
        background="#fff"
        :placeholder="placeholder"
        @click="searchSong"
      />
      <div class="music-img">
        <img class="home-img" :src="playingMusic?.picUrl" alt="" />
      </div>
    </div>

    <discover-content :bannerimgdata="bannerimgdata" />

    <transition name="drawer">
      <router-view />
    </transition>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { getBannerList } from "../../apis/discover.js";
import DiscoverContent from "./DiscoverContent.vue";
import { SEARCH_PLACEHOLDER } from "@/Tools/defaultSearch";
export default {
  components: { DiscoverContent },
  data() {
    return {
      bannerimgdata: [],
      timer: null,
      placeholder: "原谅我改变 经典老歌",
      searchPlaceholderIndex: 0
    };
  },
  created() {
    this.randomPlaceholder();
  },
  mounted() {
    // 轮播图
    this.getBannerList();
  },
  // 销毁计时器
  beforeDestroy() {

    clearInterval(this.timer)
  },

  beforeRouteUpdate(to, from, next) {
    next()
    if (to.path !== "/discovr" || from.path == "/discovr") {

      clearInterval(this.timer);
    } else {
      //开启计时器
      this.randomPlaceholder();
    }
  },
  // 计算属性
  computed: {
    // 引入vuex playingMusic 数据
    ...mapState(["playingMusic"]),

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

    // 搜索
    searchSong() {
      this.$router.push(`/discovr/search?keywords=${this.placeholder}`);
    },

    // 切换推荐搜索关键字
    randomPlaceholder() {
      this.timer = setInterval(() => {
        
        this.searchPlaceholderIndex = (1 + this.searchPlaceholderIndex) % SEARCH_PLACEHOLDER.length; 
        
        this.placeholder = SEARCH_PLACEHOLDER[this.searchPlaceholderIndex];


      }, 2500);

     
  },
  }
};
</script>

<style lang="scss" scoped>
.discover-view {
  background-color: #222325;
  overflow: auto;
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
    background-color: #222325;
    .search-input {
      background-color: #222325 !important;
    }
    .van-search {
      width: 85vw;
      background-color: #222325;
    }

    .music-img {
      width: 35px;
      height: 35px;
      // background-color: rgb(227, 111, 111);
      border-radius: 999px;
      overflow: hidden;
      border: 1px solid #ddd;

      .home-img {
        display: block;
        width: 100%;
      }
    }
  }
}

// 路由动画
.drawer-enter,
.drawer-leave-to {
  transform: translateY(100%);
}
.drawer-enter-active,
.drawer-leave-active {
  transition: all 0.15s linear;
}
.drawer-enter-to,
.drawer-leave {
  transform: translateY(0);
}
</style>
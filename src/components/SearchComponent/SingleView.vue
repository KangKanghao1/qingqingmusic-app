<template>
  <div class="single-box" :class="{ 'all-single': allStyle }">
    <div class="un-single" v-show="!show">{{ title }} 暂无搜索结果</div>
    <div class="single" v-show="onShowFailure">
      <div class="single-nav">
        <span class="title">{{ title }}</span
        ><span class="play">播放全部</span>
      </div>

        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          offset="300"
          class="single-list"
        >
          <div
            @click="toPlayControl(s)"
            class="single-item"
            v-for="s in onSingleData"
            :key="s.id"
          >
            <div class="sing-name">
              <div class="song_n">{{ s.name }}</div>
              <div class="singer_n">{{ singerName(s.ar) }}</div>
            </div>
            <div class="mv" v-if="s.mv">
              <img src="@/assets/imgs/home_dq_bof.png" />
            </div>
            <van-icon color="#808080" class="ellipsis" name="ellipsis" />
          </div>
        </van-list>
      <div v-show="allSingleShow" class="play-all">
        查看全部{{ singleCount }}首单曲
      </div>
    </div>
    <van-loading
      class="single-loading"
      type="spinner"
      size="26px"
      color="red"
      v-show="onShowSucceed"
      >加载中...</van-loading
    >
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { SEARCH_TABS_CONTENT } from "@/Tools/defaultSearch";
export default {
  props: {
    tabsTitle: {
      type: String,
      default: "1018",
    },
  },
  data() {
    return {
      allSingle: [],
      synthesisSingle: [],
      singleCount: "",
      title: "",
      show: false,
      allSingleShow: false,
      loadingShow: false,
      allStyle: false,
      timer: null,
      loading: false,
      finished: false,
      offset: 0, // 偏移数量
      limit: 20, //限制获取歌曲的数量
      index: 0, // 记录请求轮次
    };
  },

  created() {
    if (this.tabsTitle == "1018") {
      this.allSingleShow = true;
    } else {
      this.allSingleShow = false;
    }

    if (this.synthesisData.length >= 1) {
      this.onSynthesisSingle();
    }

    this.onAllSingleFun();
  },
  methods: {
    ...mapMutations(["changeoverMusci"]),
    // 延迟加载
    loadingTime() {
      return new Promise((resolve) => {
        this.timer = setTimeout(() => {
          resolve("loading...");
        }, 500);
      });
    },
    // 跳转播放详情页
    toPlayControl(s) {
      this.changeoverMusci(s);
      this.$router.push(`/songdata/${s.id}`);
    },

    // 获取所有专辑数据
    async onAllSingleFun() {
      if (this.tabsTitle !== "1018") {
        this.allStyle = true;
        this.loadingShow = true;
        await SEARCH_TABS_CONTENT({
          $axios: this.$axios,
          id: this.tabsTitle,
          val: this.keywords,
        }).then((data) => {
          this.allSingle = data?.result?.songs;
        });
        await this.loadingTime();
        clearTimeout(this.timer);

        this.loadingShow = false;
      }

      this.index += 1;
    },
    singerName(arr) {
      return arr
        .map((n) => {
          return n.name;
        })
        .join("/");
    },
    onSynthesisSingle() {
      let songListArr = this.synthesisData.filter((s) => {
        return s.type == "single";
      });
      this.title = songListArr[0].title;
      if (songListArr[0].data?.songs) {
        this.show = true;

        this.synthesisSingle = songListArr[0].data?.songs.slice(0, 5);

        this.singleCount = songListArr[0].data?.songCount;
      } else {
        this.show = false;
      }
    },
    //
    onLoad() {
      if (this.tabsTitle == "1018") {
        this.loading = false
        return 
      }
      // 28  10 * 0 = 0 + 10 = 10
      // 28 10 * 1 = 10 + 10 = 20
      // 28 10 * 2 = 20 + 10 = 30
      // 28 - 20 = 8
      let offset = this.limit * this.index;
      let limitNum = (this.offset * this.index) + this.limit;

      if (limitNum > this.singleCount) {
          this.limit = this.singleCount - this.limit * this.index;
      }
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      SEARCH_TABS_CONTENT({
        $axios: this.$axios,
        id: this.tabsTitle,
        val: this.keywords,
        limit: this.limit,
        offset
      }).then((data) => {
        console.log(data);
        let res = data?.result?.songs;
        if(res){
          this.allSingle = [...this.allSingle, ...res];
        } 
        
        this.loading = false;

        if (!res || res?.length < 1) {
          this.finished = true;
        }
      });

      this.index += 1;
    },
  },
  watch: {
    synthesisData() {
      this.onSynthesisSingle();
    },

    tabsTitle(newVal) {
      this.onSynthesisSingle();

      if (newVal == "1018") {
        this.allSingleShow = true;
      } else {
        this.allSingleShow = false;
      }
    },
  },
  computed: {
    ...mapState(["synthesisData", "keywords"]),

    onSingleData() {
      if (this.tabsTitle == "1018") {
        return this.synthesisSingle;
      } else {
        return this.allSingle;
      }
    },

    // 请求数据为undefined
    onShowFailure() {
      let singleArr = this.synthesisData.filter((s) => {
        return s.type == "single";
      });
      if (!singleArr[0]?.data) {
        return this.show;
      } else {
        return !this.loadingShow;
      }
    },

    onShowSucceed() {
      let singleArr = this.synthesisData.filter((s) => {
        return s.type == "single";
      });

      if (!singleArr[0]?.data) {
        return this.show;
      } else {
        return this.loadingShow;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.single-box {
  &.all-single {
    padding-bottom: 80px;
  }
  .single-loading {
    position: fixed;
    left: 50%;
    top: 20%;
    z-index: 44;
    transform: translateX(-50%);
  }
  .un-single {
    margin-top: 10px;
    margin-left: 10px;
    font-size: 14px;
    color: #bbb;
  }
  .single {
    margin-top: 10px;
    width: 100%;
    border-radius: 4px;
    margin-bottom: 10px;
    background-color: #2b2b2b;

    .single-nav {
      padding: 20px 10px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;

      &::after {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        display: block;
        content: "";
        overflow: hidden;
        height: 1px;
        width: calc(100% - 20px);
        background-color: rgba(0, 0, 0, 0.1);
      }
      .title {
        font-weight: 600;
        font-size: 14px;
        color: #ececec;
        letter-spacing: 1px;
      }
      .play {
        font-size: 12px;
        color: rgba(242, 60, 66, 0.85);
        letter-spacing: 1px;
        padding: 5px 4px;
        border: 1px solid rgb(203, 118, 118);
        border-radius: 999px;
        margin-left: 5px;
        display: flex;
        width: 75px;
        justify-content: space-evenly;

        &::before {
          width: 0;
          height: 0;
          content: "";
          display: block;
          overflow: hidden;
          border-left: 7px solid red;
          border-top: 5px solid red;
          border-right: 7px solid red;
          border-bottom: 5px solid red;
          border-right-style: none;
          border-top-color: transparent;
          border-bottom-color: transparent;
          border-radius: 2px;
        }
      }
    }

    .single-item {
      padding: 10px 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;

      &::after {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        display: block;
        content: "";
        overflow: hidden;
        height: 1px;
        width: calc(100% - 30px);
        background-color: rgba(255, 255, 255, 0.15);
      }

      &:last-child ::after {
        background-color: transparent;
      }

      .sing-name {
        width: 80%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        .song_n {
          font-size: 13px;
          color: #6183ac;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .singer_n {
          color: rgba(161, 161, 161);
          font-size: 12px;
          margin-top: 6px;
        }
      }

      .mv {
        width: 22px;
        height: 22px;

        img {
          width: 100%;
          display: block;
        }
      }

      .ellipsis {
        transform: rotate(90deg);
      }
    }

    .play-all {
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #999;
      font-size: 12px;
      letter-spacing: 1px;
    }
  }
}
</style>
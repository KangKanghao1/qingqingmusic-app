<template>
  <div class="mv-box" :class="{ 'all-mv':allStyle}">
    <div class="un-mv" v-show="!show">{{title}}暂无搜索结果</div>
    <div class="mv" v-show="onShowFailure">
      <div class="mv-nav">
        <span class="title">{{ title }}</span>
      </div>

      <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          offset="300"
          class="mv-list"
        >
        <div class="mv-item" v-for="s in onMvData" :key="s.id">
          <div class="mv-img">
            <img :src="s.cover" alt="" />
          </div>

          <div class="sing-name">
            <div class="song_n">{{ s?.name }}</div>
            <div class="singer_n">
              <span class="name"
                ><MvDuration :duration="s.duration" /> ,by {{ s.artistName }},
                <PlayCount :p_count="s.playCount" />播放</span
              >
            </div>
          </div>
      </div>
      </van-list>
      <div v-show="allMvShow" class="play-all">查看全部{{ mvCount }}个MV</div>
    </div>
     <van-loading
        class="mv-loading"
        type="spinner"
        size="26px"
        color="red"
        v-show="onShowSucceed"
        >加载中...</van-loading
      >
  </div>
</template>

<script>
//  duration MvDuration
import PlayCount from "@/components/SearchComponent/PlayCount.vue";
import MvDuration from "@/components/SearchComponent/MvDuration.vue";
import { mapState } from "vuex";
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
      allMv: [],
      synthesisMv: [],
      mvCount: "",
      title: "",
      show: false,
      allMvShow: false,
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
      this.allMvShow = true;
    } else {
      this.allMvShow = false;
    }
    if (this.synthesisData.length >= 1) {
      this.onSynthesisData();
    }

    this.onAllMvFun();
  },
  methods: {
    // 延迟加载
    loadingTime(){
      return new Promise((resolve)=>{

         this.timer = setTimeout(()=>{
          resolve('loading...')
        },500)

      })
     
    },
        // 获取所有mv数据
   async onAllMvFun(){
      
      if (this.tabsTitle !== "1018") {

      this.allStyle = true;
      this.loadingShow = true;
     await SEARCH_TABS_CONTENT({
        $axios: this.$axios,
        id: this.tabsTitle,
        val: this.keywords,
      }).then((data) => {
        this.allMv = data?.result?.mvs;
        
      });
      await this.loadingTime();
      clearTimeout(this.timer)

      this.loadingShow = false;
    }
    this.index += 1;

    },
    onSynthesisData() {
      let mvArr = this.synthesisData.filter((s) => {
        return s.type == "MV";
      });
      this.title = mvArr[0].title;
      if (mvArr[0].data.mvs) {
        this.show = true;
        // this.allMv = mvArr[0].data.mvs;
        this.synthesisMv = mvArr[0].data.mvs.slice(0, 3);
        this.mvCount = mvArr[0].data.mvCount;
      } else {
        this.show = false;
      }
    },
    onLoad() {
      if (this.tabsTitle == "1018") {
        this.loading = false
        return 
      }
      let offset = this.limit * this.index;
      let limitNum = (this.offset * this.index) + this.limit;

      if (limitNum > this.mvCount) {
          this.limit = this.mvCount - this.limit * this.index;
      }
      SEARCH_TABS_CONTENT({
        $axios: this.$axios,
        id: this.tabsTitle,
        val: this.keywords,
        limit: this.limit,
        offset
      }).then((data) => {
        
        let res = data?.result?.mvs;
        if(res){
          this.allMv = [...this.allMv, ...res];
        } 
        
        this.loading = false;

        if (!res || res.length < 1) {
          this.finished = true;
        }
      });

      this.index += 1;
    },
  },
  watch: {
    synthesisData() {
      this.onSynthesisData();
    },

    tabsTitle(newVal) {
      if (newVal == "1018") {
        this.allMvShow = true;
      } else {
        this.allMvShow = false;
      }
    },
  },
  computed: {
    ...mapState(["synthesisData", "keywords"]),
    onMvData() {
      if (this.tabsTitle == "1018") {
        return this.synthesisMv;
      } else {
        return this.allMv;
      }
    },
    // 请求数据为undefined
    onShowFailure() {
      
       let mvArr = this.synthesisData.filter((s) => {
        return s.type == "MV";
      });
      if (!mvArr[0]?.data) {
        
        return this.show;
      } else {
        
        return !this.loadingShow;
      }
    },

    onShowSucceed() {
      let mvArr = this.synthesisData.filter((s) => {
        return s.type == "MV";
      });

      if (!mvArr[0]?.data) {
     
        return this.show;
      } else {
      
        return this.loadingShow;
      }
    },
  },
  components: {
    PlayCount,
    MvDuration,
  },
};
</script>
<style lang="scss" scoped>
.mv-box {
  &.all-mv{
    padding-bottom: 80px;
  }
   .mv-loading {
    position: fixed;
    left: 50%;
    top: 20%;
    z-index: 44;
    transform: translateX(-50%);
  }
.un-mv {
  margin-top: 10px;
  margin-left: 10px;
  font-size: 14px;
  color: #bbb;
}
.mv {
  margin-top: 10px;
  width: 100%;
  border-radius: 4px;
  margin-bottom: 10px;
  background-color: #2b2b2b;

  .mv-nav {
    padding: 20px 10px 0px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;

    .title {
      font-weight: 600;
      font-size: 14px;
      color: #ececec;
    }
  }

  .mv-item {
    padding: 10px 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;

    .mv-img {
      position: relative;
      &::after {
        position: absolute;
        overflow: hidden;
        content: "";
        display: block;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 20px;
        height: 20px;
        background-image: url("@/assets/imgs/b7i.png");
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
        z-index: 22;
      }
      img {
        width: 100px;
        height: 100%;
        border-radius: 4px;
        overflow: hidden;
        position: relative;
      }
    }

    .sing-name {
      width: 100%;
      height: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .song_n {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 13px;
        color: #6183ac;
        height: 17px;
      }

      .singer_n {
        width: 170%;
        color: rgba(161, 161, 161);
        transform: scale(0.5);
        transform-origin: left bottom;

        .name {
          font-size: 20px;
        }
      }
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
    border-top: 1px solid rgba(255, 255, 255, .15);
  }
}
}
</style>
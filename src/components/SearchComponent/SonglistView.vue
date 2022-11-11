<template>
  <div class="playlist-box" :class="{ 'all-playlist': allStyle }">
    
    <div class="un-playlist" v-show="!show">{{ title }}暂无搜索结果</div>
    
    <div class="playlist" v-show="onShowFailure">
      <div class="playlist-nav">
        <span class="title">{{ title }}</span>
      </div>

        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          offset="300"
          class="playlist-list"
        >
        <div class="playlist-item" v-for="s in onSonglistData" :key="s.id">
          <div class="playlist-img">
            <img :src="s.coverImgUrl" />
          </div>

          <div class="sing-name">
            <div class="song_n">{{ s.name }}</div>
            <div class="singer_n">
              <span class="name"
                >{{ s.trackCount }}首 ,by {{ s.creator.nickname }},
                {{s?.playCount}}
                播放<PlayCount :p_count="s?.playCount" />次</span
              >
            </div>
          </div>
        </div>
        </van-list>
      <div v-show="allSonglistShow" class="play-all">
        查看全部{{ playlistCount }}个歌单
      </div>
    </div>
     <van-loading
        class="playlist-loading"
        type="spinner"
        size="26px"
        color="red"
        v-show="onShowSucceed"
        >加载中...</van-loading
      >
  </div>
</template>
<script>
import PlayCount from "@/components/SearchComponent/PlayCount.vue";
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
      allSonglist: [],
      synthesisSonglist: [],
      playlistCount: "",
      title: "",
      // playCount: "", // 播放数量
      show: false, // 数据存在
      allSonglistShow: false,
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
      this.allSonglistShow = true;
    } else {
      this.allSonglistShow = false;
    }
    if (this.synthesisData.length >= 1) {
      this.onSynthesisData();
    }

    this.onAllSonglistFun();
  },
  methods: {
    // 延迟加载
    loadingTime(){
      return new Promise((resolve)=>{

         this.timer = setTimeout(()=>{
          console.log('等待...');
          resolve('loading...')
        },500)

      })
     
    },
    // 获取所有专辑数据
   async onAllSonglistFun(){

      if (this.tabsTitle !== "1018") {

      this.allStyle = true;
      this.loadingShow = true;
     await SEARCH_TABS_CONTENT({
        $axios: this.$axios,
        id: this.tabsTitle,
        val: this.keywords,
      }).then((data) => {
        this.allSonglist = data?.result?.playlists;
        
      });
      await this.loadingTime();
      clearTimeout(this.timer)

      this.loadingShow = false;
    }
      this.index += 1;
    },
    onSynthesisData() {
      let songListArr = this.synthesisData.filter((s) => {
        return s.type == "songlist";
      });
      this.title = songListArr[0].title;

      if (songListArr[0].data.playlists) {
        this.show = true;
        // this.allSonglist = songListArr[0].data.playlists;
        this.synthesisSonglist = songListArr[0].data.playlists.slice(0, 5);
        this.playlistCount = songListArr[0].data.playlistCount;
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

      if (limitNum > this.playlistCount) {
          this.limit = this.playlistCount - this.limit * this.index;
      }
      SEARCH_TABS_CONTENT({
        $axios: this.$axios,
        id: this.tabsTitle,
        val: this.keywords,
        limit: this.limit,
        offset
      }).then((data) => {
        
        let res = data?.result?.playlists;
        if(res){
          this.allSonglist = [...this.allSonglist, ...res];
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
        this.allSonglistShow = true;
      } else {
        this.allSonglistShow = false;
      }
    },
  },
  computed: {
    ...mapState(["synthesisData", "keywords"]),
    onSonglistData() {
      if (this.tabsTitle == "1018") {
        return this.synthesisSonglist;
      } else {
        return this.allSonglist;
      }
    },
     // 请求数据为undefined
    onShowFailure() {
      
       let songListArr = this.synthesisData.filter((s) => {
        return s.type == "songlist";
      });
      if (!songListArr[0]?.data) {
        
        return this.show;
      } else {
        
        return !this.loadingShow;
      }
    },

    onShowSucceed() {
      let songListArr = this.synthesisData.filter((s) => {
        return s.type == "songlist";
      });

      if (!songListArr[0]?.data) {
     
        return this.show;
      } else {
      
        return this.loadingShow;
      }
    },
  },
  components: {
    PlayCount,
  },
};
</script>
<style lang="scss" scoped>
.playlist-box {
  &.all-playlist {
    padding-bottom: 80px;
  }
  .playlist-loading {
      position: fixed;
      left: 50%;
      top: 20%;
      z-index: 44;
      transform: translateX(-50%);
    }

  .un-playlist {
    margin-top: 10px;
    margin-left: 10px;
    font-size: 14px;
    color: #bbb;
  }
  .playlist {
    margin-top: 10px;
    width: 100%;
    border-radius: 4px;
    margin-bottom: 10px;
    background-color: #2b2b2b;
    
    .playlist-nav {
      padding: 20px 10px 10px;
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

    .playlist-item {
      padding: 10px 15px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      position: relative;

      .playlist-img {
        width: 40px;
        height: 40px;
        margin-right: 10px;
        border-radius: 5px;
        overflow: hidden;
        img {
          width: 100%;
          display: block;
        }
      }

      .sing-name {
        width: 80%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .song_n {
          font-size: 13px;
          color: #ececec;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .singer_n {
          width: 160%;
          color: #b0b0b0;
          height: 20px;
          // font-size: 12px;
          transform: scale(0.5);
          transform-origin: left;

        }
      }

      .ellipsis {
        transform: rotate(90deg);
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
</style>
<template>
  <div class="album-box" :class="{ 'all-single': allStyle }">
    <div class="un-single" v-show="!show">{{title}}暂无搜索结果</div>
    <div class="album" v-show="onShowFailure">
      <div class="album-nav">
        <span class="title">{{ title }}</span>
      </div>

        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          offset="300"
          class="album-list"
        >
        <div class="album-item" v-for="s in onAlbumData" :key="s.id">
          <div class="album-img">
            <img :src="s.blurPicUrl" alt="" />
          </div>

          <div class="sing-name">
            <div class="song_n">{{ s.name }}</div>
            <div class="singer_n">
              <span class="name">{{ singerName(s.artists) }}</span
              ><span class="time">{{ onPublishTime(s.publishTime) }}</span>
            </div>
          </div>
        </div>
        </van-list>

      <div v-show="allAlbumShow" class="play-all">
        查看全部{{ albumCount }}个专辑
      </div>
      
    </div>
    <van-loading
        class="album-loading"
        type="spinner"
        size="26px"
        color="red"
        v-show="onShowSucceed"
        >加载中...</van-loading
      >
  </div>
</template>

<script>
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
      allAlbum: [],
      synthesisAlbum: [],
      albumCount: "",
      title: "",
      show: false,
      allAlbumShow: false,
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
      this.allAlbumShow = true;
    } else {
      this.allAlbumShow = false;
    }
    if (this.synthesisData.length >= 1) {
      this.onSynthesisData();
    }

    this.onAllAlbumFun();
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
   async onAllAlbumFun(){

      if (this.tabsTitle !== "1018") {

      this.allStyle = true;
      this.loadingShow = true;
     await SEARCH_TABS_CONTENT({
        $axios: this.$axios,
        id: this.tabsTitle,
        val: this.keywords,
      }).then((data) => {
        this.allAlbum = data?.result?.albums;
        
      });
      await this.loadingTime();
      clearTimeout(this.timer)

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
    onSynthesisData() {
      let albumArr = this.synthesisData.filter((s) => {
        return s.type == "album";
      });
      this.title = albumArr[0].title;
      if (albumArr[0].data.albums) {
        this.show = true;
        
        // this.allAlbum = albumArr[0].data.albums;
        this.synthesisAlbum = albumArr[0].data.albums.slice(0, 3);
        this.albumCount = albumArr[0].data.albumCount;
      } else {
        this.show = false;
      }
    },
    onPublishTime(d) {
      let y = new Date(d);

      let year = y.getFullYear();

      let month = y.getMonth() + 1;

      let date = y.getDate();

      return `${year}.${month}.${date}`;
    },
     onLoad() {
      if (this.tabsTitle == "1018") {
        this.loading = false
        return 
      }
      let offset = this.limit * this.index;
      let limitNum = (this.offset * this.index) + this.limit;

      if (limitNum > this.albumCount) {
          this.limit = this.albumCount - this.limit * this.index;
      }
      SEARCH_TABS_CONTENT({
        $axios: this.$axios,
        id: this.tabsTitle,
        val: this.keywords,
        limit: this.limit,
        offset
      }).then((data) => {
        
        let res = data?.result?.albums;
       
        if(res){
          this.allAlbum = [...this.allAlbum, ...res];
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
        this.allAlbumShow = true;
      } else {
        this.allAlbumShow = false;
      }
    },
  },
  computed: {
    ...mapState(["synthesisData", "keywords"]),
    onAlbumData() {
      if (this.tabsTitle == "1018") {
        return this.synthesisAlbum;
      } else {
        return this.allAlbum;
      }
    },
        // 请求数据为undefined
    onShowFailure() {
        
       let albumArr = this.synthesisData.filter((s) => {
        return s.type == "album";
      });

      if (albumArr[0]?.data.albumCount == "0") {
    
        return this.show;
      } else {
 
        return !this.loadingShow;
      }
    },

    onShowSucceed() {
      let albumArr = this.synthesisData.filter((s) => {
        return s.type == "album";
      });

      if (albumArr[0]?.data.albumCount == "0") {
      
        return this.show;
      } else {
 
        return this.loadingShow;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.album-box {
  &.all-single {
    padding-bottom: 80px;
  }
  .un-album {
    margin-top: 10px;
    margin-left: 10px;
    font-size: 14px;
    color: #bbb;
  }
  .album {
    margin-top: 10px;
    width: 100%;
    border-radius: 4px;
    margin-bottom: 10px;
    background-color: #2b2b2b;

    .album-nav {
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

    .album-item {
      padding: 10px 15px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      position: relative;

      .album-img {
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
          color: #6183ac;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .singer_n {
          width: 194%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: rgba(161, 161, 161);
          height: 20px;
          // font-size: 12px;
          transform: scale(0.5);
          transform-origin: left;

          .name {
            font-size: 20px;
          }

          .time {
            margin-left: 10px;
            font-size: 20px;
          }
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

  .album-loading {
      position: fixed;
      left: 50%;
      top: 20%;
      z-index: 996;
      transform: translateX(-50%);
    }
}
</style>
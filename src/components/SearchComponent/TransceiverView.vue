<template>
  <div class="transceiver-box" :class="{ 'all-transceiver':allStyle}">
    <div class="un-transceiver" v-show="!show">{{ title }}暂无搜索结果</div>
    <div class="transceiver" v-show="onShowFailure">
      <div class="transceiver-nav">
        <span class="title">{{ title }}</span>
      </div>

      <div class="transceiver-list">
        <div
          class="transceiver-item"
          v-for="s in onTransceiverData"
          :key="s.id"
        >
          <div class="transceiver-img">
            <van-image lazy-load :src="s.picUrl" width="50" height="100%">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
          </div>

          <div class="sing-name">
            <div class="song_n">{{ s.name }}</div>
            <div class="singer_n">
              <div class="name"
                >{{ s.programCount }}声音 , 播放
                <PlayCount :p_count="s.playCount" />次,by
                <span class="s_name"> {{ s.dj.nickname }}</span></div
              >
            </div>
          </div>
        </div>
      </div>

      <div v-show="allTransceiverShow" class="play-all">
        查看全部{{ transceiverCount }}个电台
      </div>
      
    </div>
    <van-loading
        class="transceiver-loading"
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
      allTransceiver: [],
      synthesisTransceiver: [],
      transceiverCount: "",
      title: "",
      playCount: "", // 播放数量
      show: false,
      allTransceiverShow: false,
      loadingShow: false,
      allStyle: false,
      timer: null
    };
  },
  created() {
   
    if (this.tabsTitle == "1018") {
      this.allTransceiverShow = true;
    } else {
      this.allTransceiverShow = false;
    }
    if (this.synthesisData.length >= 1) {
      this.onSynthesisData();
    }

    this.onAllTransceiverFun();
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
   async onAllTransceiverFun(){

      if (this.tabsTitle !== "1018") {

      this.allStyle = true;
      this.loadingShow = true;
     await SEARCH_TABS_CONTENT({
        $axios: this.$axios,
        id: this.tabsTitle,
        val: this.keywords,
      }).then((data) => {
        this.allTransceiver = data?.result?.djRadios;
        
      });
      await this.loadingTime();
      clearTimeout(this.timer)

      this.loadingShow = false;
    }

    },
    onSynthesisData() {
      let transceivertArr = this.synthesisData.filter((s) => {
        return s.type == "transceiver";
      });
      this.title = transceivertArr[0].title;
      if (transceivertArr[0].data?.djRadios) {
        this.show = true;
        // this.allTransceiver = transceivertArr[0].data.djRadios;
        
        this.synthesisTransceiver = transceivertArr[0].data?.djRadios.slice(
          0,
          3
        );
        this.transceiverCount = transceivertArr[0].data?.djRadiosCount;
      } else {
        this.show = false;
      }
    },
  },
  watch: {
    synthesisData() {
      this.onSynthesisData();
    },

    tabsTitle(newVal) {
      if (newVal == "1018") {
        this.allTransceiverShow = true;
      } else {
        this.allTransceiverShow = false;
      }
    },
  },
  computed: {
    ...mapState(["synthesisData", "keywords"]),
    onTransceiverData() {
      if (this.tabsTitle == "1018") {
        return this.synthesisTransceiver;
      } else {
        return this.allTransceiver;
      }
    },
    // 请求数据为undefined
    onShowFailure() {
      
        let transceivertArr = this.synthesisData.filter((s) => {
        return s.type == "transceiver";
      });

      if (!transceivertArr[0]?.data?.djRadios) {
        
        return this.show;
      } else {
        
        return !this.loadingShow;
      }
    },

    onShowSucceed() {
       let transceivertArr = this.synthesisData.filter((s) => {
        return s.type == "transceiver";
      });
      
      if (!transceivertArr[0]?.data?.djRadios) {
     
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
.transceiver-box {
  &.all-transceiver{
    padding-bottom: 80px;
  }

   .transceiver-loading {
    position: fixed;
    left: 50%;
    top: 20%;
    z-index: 44;
    transform: translateX(-50%);
  }
.un-transceiver {
  margin-top: 10px;
  margin-left: 10px;
  font-size: 14px;
  color: #bbb;
}
.transceiver {
  margin-top: 10px;
  width: 100%;
  border-radius: 4px;
  margin-bottom: 10px;
  background-color: #2b2b2b;

  .transceiver-nav {
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

  .transceiver-item {
    padding: 10px 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;

    .transceiver-img {
      img {
        width: 50px;
        height: 100%;
        border-radius: 4px;
        overflow: hidden;
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
      }

      .singer_n {
        color: rgba(161, 161, 161);
        transform: scale(0.5);
        transform-origin: left bottom;

        .name {
          color: rgba(161, 161, 161);
          font-size: 20px;

          .s_name{
            color: #6183ac;
          }
        }
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
</style>
<template>
<div class="singer-box" :class="{ 'all-singer':allStyle}">
  <div class="un-singer" v-show="!show">{{actor}} 暂无搜索结果</div>
  <div class="singer" v-show="show">
    <div class="singer-nav">
      <span class="title">{{ actor }}</span>
    </div>

    <div class="singer-list">
      <div class="singer-item" v-for="s in synthesisSinger" :key="s.id">
        <div class="singer-info">
          <div class="singer-img">
            <van-image lazy-load :src="s.img1v1Url" width="45" height="45">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
          </div>

          <div class="sing-name">
            <div class="sing_n">{{ s.name }}</div>
            <div class="fans">粉丝: {{ s.fansCount }}</div>
          </div>
        </div>

        <div class="close-fill" @click="onAttentionSinger(s)">
              <i v-if="s.attention == 0" class="close-guanzhu-icon"></i>
              <i v-if="s.attention == 1" class="yiguanzhu"></i>
              <span style="color:#ddd" v-if="s.attention == 0">关注</span>
              <span style="color:#ddd" v-if="s.attention == 1">已关注</span>
            </div>
      </div>
    </div>
  </div>
</div>
  
</template>

<script>
import { mapState } from "vuex";
import { singerFansCount } from "@/Tools/defaultSearch";

export default {
  props: {
    tabsTitle:{
      type: String,
      default: "1018"
    }
  },
  data() {
    
    return {
      synthesisSinger: [],
      title: "",
      singerCount: "", // 歌手数量
      actor: "艺人",
      show: false,
      allStyle: false,
    };
  },
  created(){
        if (this.tabsTitle !== "1018") {
      this.allStyle = true;
    }
    if(this.synthesisData.length >= 1){
      this.onSynthesisData();
    }
  },
  methods: {

    // 为综合歌手数据添加歌手粉丝数量
    fansCountFun(fansCount, i) {
      this.synthesisSinger = this.synthesisSinger.map((s, index) => {
        if (index == i) {
          return {
            ...s,
            fansCount,
          };
        } else {
          return {
            ...s,
          };
        }
      });
    },

     onSynthesisData() {
      
      let singerArr = this.synthesisData.filter((s) => {
        return s.type == "singer";
      });
   
      if (singerArr[0].data.artists) {
        this.show = true;
        this.title = singerArr[0].title;
        this.synthesisSinger = singerArr[0].data.artists;
        this.singerCount = singerArr[0].data.artistCount;
      } else {
        this.show = false;
        return;
      }

      let songerId = singerArr[0].data.artists.map((s) => {
        return s.id;
      });
      // 为synthesisSinger数据添加歌手粉丝数量
      for (let i = 0; i < songerId.length; i++) {
         this.$axios.get(singerFansCount(songerId[i])).then(({ data }) => {
          let fansCount = "";
          let count = data.data.fansCnt;

          if (count >= 10000 && count < 100000) {
            fansCount = Math.floor(count / 1000) / 10 + "万";

            this.fansCountFun(fansCount, i);
          } else if (count >= 100000) {
            fansCount = Math.floor(count / 10000) + "万";

            this.fansCountFun(fansCount, i);
          } else {
            this.synthesisSinger = this.synthesisSinger.map((s, index) => {

              if (index == i) {
                return {
                  ...s,
                  fansCount: count,
                };
              } else {
                return {
                  ...s,
                };
              }
            });
          }
        });
      }

      // 本地数据
      let singer = JSON.parse(localStorage.getItem("ATTENTION_SINGER") ?? "[]");
      for (let i = 0; i < this.synthesisSinger.length; i++) {
        let res = singer.find((s) => s.id == this.synthesisSinger[i]?.id);
        // attention 1 关注
        if (res) {
          this.synthesisSinger = this.synthesisSinger.map((s) => {
            if (s.id == this.synthesisSinger[i].id) {
              return {
                ...s,
                attention: 1
              };
            }
            return {
              ...s
            };
          });
        }

        if (!res) {
          this.synthesisSinger = this.synthesisSinger.map((s) => {
            if (s.id == this.synthesisSinger[i].id) {
              return {
                ...s,
                attention: 0
              };
            }
            return {
              ...s
            };
          });
        }
        
      }
    },

     onAttentionSinger(s) {

      let singer = JSON.parse(localStorage.getItem("ATTENTION_SINGER") ?? "[]");
      let result = s?.attention;
      if (result == 1) {

        // this.unAttention = false;
        this.synthesisSinger = this.synthesisSinger.map(item => {

          if (item.id == s.id) {
              return {
                ...item,
                attention: 0
              }
          }
          return {
            ...item
          }

        })
      
        let newSingerList = singer.filter((c) => c.id !== s.id);
        localStorage.ATTENTION_SINGER = JSON.stringify(newSingerList);
      } else {
        // this.unAttention = true;
        this.synthesisSinger = this.synthesisSinger.map(item => {

          if (item.id == s.id) {
              return {
                ...item,
                attention: 1
              }
          }
          return {
            ...item
          }

        })

        if (singer.length < 1) {
          // 更新歌手数据
          let obj = {...s, attention: 1};
         
          localStorage.ATTENTION_SINGER = JSON.stringify([obj]);
        }

        let res = singer.find((r) => r?.id == s.id);
        if (!res) {
          let obj = {...s, attention: 1};
          localStorage.ATTENTION_SINGER = JSON.stringify([obj, ...singer]);
        } else {
          let data = singer.filter((r) => r.id !== s.id);
          let obj = {...s, attention: 1};
          localStorage.ATTENTION_SINGER = JSON.stringify([obj, ...data]);
        }
      }
    },
  },
  watch: {
     synthesisData() {
      this.onSynthesisData();
    },
  },
  computed: {
    ...mapState(["synthesisData"]),
  },
};
</script>
<style lang="scss" scoped>
.singer-box {
  &.all-singer{
    padding-bottom: 80px;
  }
.un-singer{
  margin-top: 10px;
  margin-left: 10px;
  font-size: 14px;
  color: #bbb;
}
.singer {
  margin-top: 10px;
  width: 100%;
  border-radius: 4px;
  margin-bottom: 10px;
  background-color: #2b2b2b;

  .singer-nav {
    padding: 20px 10px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    .title {
      font-weight: 600;
      font-size: 14px;
      color: #ececec;
    }
  }

  .singer-item {
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    height: 65px;

    .singer-info {
      width: 80%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .singer-img {
        width: 45px;
        height: 45px;

        img {
          width: 45px;
          height: 45px;
          border-radius: 999px;
          overflow: hidden;
          display: block;
        }
      }

      .sing-name {
        width: 80%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-left: 10px;

        .sing_n {
          width: 80%;
          font-size: 13px;
          color: #ebebeb;
          margin-bottom: 5px;
          letter-spacing: 3px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .fans {
          letter-spacing: 1px;
          transform-origin: left;
          transform: scale(0.6);
          font-size: 16px;
          color: #b4b4b4;
        }
      }
    }

    .close-fill {
          width: 40px;
          text-align: center;
          margin-left: auto;
          font-size: 12px;

          .close-guanzhu-icon {
            margin: auto;
            display: block;
            width: 20px;
            height: 20px;
            background-image: url("@/assets/imgs/guanzhu.png");
            background-position: center center;
            background-size: cover;
            background-repeat: no-repeat;
            content: "";
          }
          .yiguanzhu {
            margin: auto;
            display: block;
            width: 20px;
            height: 20px;
            // margin-left: 2px;
            background-position: center center;
            background-size: cover;
            background-repeat: no-repeat;
            content: "";
              background-image: url("@/assets/imgs/yiguanzhu.png");
            }
        }
  }
}
}
</style>
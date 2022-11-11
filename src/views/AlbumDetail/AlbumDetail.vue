<template>
  <div class="box">
    <nav>
      <div @click="goto" class="arrow-left" v-show="show2">
        <van-icon name="arrow-left" size="24" />
      </div>
      <div class="more" v-show="show2">
        <img src="../../assets/imgs/more.png" />
      </div>
    </nav>

    <header>
      <div class="info">
        <div class="singer-img">
          <img class="img" :src="album.picUrl" alt="" />
        </div>
        <div class="detail">
          <div class="song-name">{{ album.name }}</div>
          <div class="singer">
            <span>歌手</span>: {{ artistsStr(album.artists)
            }}<van-icon name="arrow" size="12px" />
          </div>
          <div class="time">
            发行时间: {{ onPublishTime(album.publishTime) }}
            
          </div>
          <div class="title"><span>{{ album.description }}</span><van-icon name="arrow" size="12px" /></div>
        </div>
      </div>
      <div class="header-mini-box">
        <div class="frame">
          <div class="frame-icon">
            <img src="../../assets/imgs/cqc.png" />
          </div>
          <div class="amount">{{ playCountLabel(album.info?.likedCount) }}</div>
        </div>
        <span>|</span>
        <div class="frame">
          <div class="frame-icon">
            <van-icon name="chat-o" size="21" color="#ffffffc9" />
          </div>
          <div class="amount">{{ playCountLabel(album.info?.commentCount) }}</div>
        </div>
        <span>|</span>
        <div class="frame" @click="showShare = true">
          <div class="frame-icon">
            <van-icon name="share-o" size="21" color="#ffffffc9" />
          </div>
          <div class="amount">
            {{ playCountLabel(album.info?.shareCount) }}
         
          </div>
        </div>
      </div>
    </header>
    <!-- <van-sticky :offset-top="38">
      <div class="play-all-box" v-show="showChoose">
        <van-checkbox
          v-model="checked"
          checked-color="#ee0a24"
          @click="checkAll"
        >
          <span>全选</span>
        </van-checkbox>
        <div class="complete" @click="showPopup">完成</div>
      </div>
      <div class="play-all-box" v-show="showChoose == false">
        <div class="play-icon">
          <van-icon name="play-circle-o" size="22" color="red" />
        </div>
        <div class="text">播放全部</div>
        <div class="amount">({{ trackCount }})</div>
        <div class="download">
          <img src="../../assets/imgs/asf.png" alt="" />
        </div>
        <div class="list" @click="showPopup">
          <img src="../../assets/imgs/cnc.png" />
        </div>
      </div>
    </van-sticky> -->

    <main>
      <div
        class="play-box"
        v-for="(t, i) in songList"
        :key="i"
        :class="{ selected: show == false }"
      >
        <div v-show="show == false" class="voice-icon">
          <i></i>
          <i></i>
          <i></i>
        </div>
        <div v-show="showChoose">
          <van-checkbox-group v-model="result" ref="checkboxGroup">
            <van-checkbox
              :name="i"
              class="yuan"
              checked-color="#ee0a24"
              v-model="checked"
            ></van-checkbox>
          </van-checkbox-group>
        </div>
        <div v-show="showChoose == false">
          <div class="ranking" v-show="show">
            {{ i < 9 ? "0" + (i + 1) : i + 1 }}
          </div>
        </div>
        <div ref="current" class="works-box" @click="selectPlay(i)">
          <div class="name">
            {{ t?.name }}
            <span v-if="t?.tns">{{ t?.tns[0] ? `(${t?.tns[0]})` : "" }}</span>
            <span v-if="t?.alia">{{ t.alia[0] ? `(${t?.alia[0]})` : "" }}</span>
          </div>
          <div class="author">{{ artistsStr(t.ar) }}</div>
        </div>

        <div class="mv" v-show="showChoose == false">
          <img src="../../assets/imgs/d1c.png" alt="" />
        </div>
        <div class="more" v-show="showChoose == false">
          <img src="../../assets/imgs/more.png" />
        </div>
      </div>
    </main>

    <van-popup
      v-model="showChoose"
      position="bottom"
      :style="{ height: '50px' }"
      :overlay="false"
      class="popup"
    >
      <div class="bottom-minibox">
        <div class="icon"><van-icon name="play" size="25" /></div>
        <div class="text">下一首播放</div>
      </div>
      <div class="bottom-minibox">
        <div class="icon"><van-icon name="add-square" size="25" /></div>
        <div class="text">收藏到歌单</div>
      </div>
      <div class="bottom-minibox">
        <div class="icon"><van-icon name="down" size="25" /></div>
        <div class="text">下载</div>
      </div>
      <div class="bottom-minibox">
        <div class="icon"><van-icon name="delete" size="25" /></div>
        <div class="text">删除下载</div>
      </div>
    </van-popup>

    <!-- <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
      class="share"
    /> -->
  </div>
</template>
<script>
import { getAlbumDetails } from "@/Tools/defaultSearch";
import { Toast } from "vant";

export default {
  data() {
    return {
      //榜的id
      standingsid: "",
      //获取数据
      ListDetailsdata: [],
      //作品数据
      tracksname: [],
      tns: [],
      //播放全部数量
      trackCount: "",
      Press: false,
      show: true,
      show2: true,
      search: false,
      value: "",
      showShare: false,
      album: [],
      //分享页面的数据
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "朋友圈", icon: "wechat-moments" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
        ],
        [{ name: "复制链接", icon: "link" }],
      ],
      //显示选择内容
      showChoose: false,
      //选择款
      checked: false,
      result: [],
      songList: [],
    };
  },

  created() {
    this.standingsid = this.$route.query.i;
  },
  mounted() {
    this.getListDetails();
  },
  computed: {},
  methods: {
    onPublishTime(d) {
      let y = new Date(d);

      let year = y.getFullYear();

      let month = y.getMonth() + 1;

      let date = y.getDate();

      return `${year}.${month}.${date}`;
    },
    //获取多个作者名字
    artistsStr(n) {
      console.log(n);
      return n?.map((ar) => {
          return ar.name;
        })
        .join("/");
    },

    async getListDetails() {
      let id = this.$route.query.id;
      let { data } = await this.$axios(getAlbumDetails(id));
      this.album = data.album;
      this.songList = data.songs;
      console.log(this.album, this.songList);

      // //获取播放全部的数量
      // this.trackCount = this.ListDetailsdata.trackCount;
      
    },

    playCountLabel(Count) {
      if(Count == 0 || !Count){
        return ''
      }
      let res = Count;

      if (Count >= 10000 && Count < 100000) {
        // 大于1万 小于 10万 7.3万
        res = Math.floor(res / 1000) / 10 + "万";
      } else if (Count >= 100000) {
        res = Math.floor(res / 10000) + "万";
      }
      
      return res;
    },

    selectPlay(i) {
      console.log(this.$refs.current[i]);
      if (this.$refs.current[i]) {
        this.show = !this.show;
      }
    },
    showPopup() {
      this.showChoose = !this.showChoose;
    },
    OpenSearch() {
      this.search = true;
      this.show2 = false;
    },
    onSearch(val) {
      Toast(val);
    },
    onCancel() {
      Toast("取消");
      this.search = false;
      this.show2 = true;
    },
    onSelect(option) {
      Toast(option.name);
      if (option.name == "复制链接") {
        Toast(this.$route.fullPath);
      }
      this.showShare = false;
    },
    checkAll() {
      console.log("  this.$refs.checkboxGroup", this.$refs.checkboxGroup);
    },

    goto() {
      this.$router.go(-1);
    },
    dd() {
      console.log("this.standingsid==>", this.standingsid);
    },
  },
};
</script>
<style lang="scss" scoped>
.yuan {
  margin-right: 10px;
}
.van-field__control {
  color: #fff !important;
}
.share {
  color: #000;
}
.popup {
  display: flex;
  align-items: center;
  background-color: #222325;

  .bottom-minibox {
    width: 25%;
    color: #ffffff6e;

    text-align: center;

    .icon {
      margin-bottom: 5px;
    }

    .text {
      font-size: 12px;
    }
  }
}
.box {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #222325;
  z-index: 99;
  color: #fff;
  overflow: auto;

  nav {
    position: fixed;
    display: flex;
    padding: 10px;
    left: 0;
    top: 0;
    width: 100%;
    height: 39px;
    align-items: center;
    z-index: 2;
    overflow: hidden;
    background-image: linear-gradient(30deg, #565151 0%, #4a4a4a 100%);

    .form {
      z-index: 14;
      .van-search {
        background-color: transparent;
        .van-search__content {
          width: 300px;
          background-color: #f7f8fa33;
          .van-cell {
            color: #222325;
          }
        }
        .van-search__action {
          color: #fff;
        }
      }
    }

    .bgi {
      .nav-img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 160px;
        display: inline-block;
      }
    }

    .arrow-left {
      margin-right: auto;
    }

    .search {
      margin-right: 15px;
    }

    .more {
      z-index: 2;
    }
  }

  .notice-swipe {
    height: 40px;
    line-height: 40px;
  }

  header {
    position: relative;
    padding-top: 10px;
    margin-bottom: 35px;
    width: 100%;
    // height: 160px;
    background-image: linear-gradient(30deg, #3d3939 0%, #4a4a4a 100%);

    .info {
      width: 100%;
      margin-top: 40px;
      padding: 20px 20px 40px 20px;
      display: flex;

      .singer-img {
        width: 130px;
        height: 130px;
        position: relative;
        &::before {
          display: inline-block;
          content: "";
          overflow: hidden;
          position: absolute;
          top: -64px;
          left: 53px;
          width: 33px;
          height: 92px;
          z-index: 44;
          background-image: url("@/assets/imgs/e0g.png");
          background-position: center center;
          background-repeat: no-repeat;
          transform: rotateZ(-90deg);
        }
        .img {
          border-radius: 8px;
          overflow: hidden;
          width: 100%;
          display: block;
        }
      }
      .detail {
        padding: 10px;
        margin-left: 20px;
        .song-name {
          color: #fff;
          font-size: 14px;
          letter-spacing: 2px;
        }

        .singer {
          margin-bottom: 30px;
          line-height: 40px;
          font-size: 13px;
          color: #bbb;
          span {
            font-size: 12px;
          }
        }
        .time {
          color: #bbb;
          font-size: 12px;
        }
        .title {
          margin-top: 10px;
           color: #bbb;
          span {
           display: inline-block;
            font-size: 12px;
            width: 150px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }

    img {
      width: 100%;
      display: block;
      height: 100%;
    }

    .header-mini-box {
      position: absolute;
      display: flex;
      width: 70%;
      height: 40px;
      left: 0;
      bottom: -20px;
      right: 0;
      margin: 0 auto;
      font-size: 12px;
      border-radius: 999px;
      background-color: rgb(59, 59, 59);
      justify-content: space-around;
      align-items: center;

      .frame {
        display: flex;
        align-items: center;

        .frame-icon {
          margin-right: 2px;

          img {
            width: 22px;
            height: 22px;
          }
        }
      }
    }
  }

  .play-all-box {
    padding: 0 15px;
    width: 100%;
    height: 40px;
    display: flex;
    margin-bottom: 5px;
    align-items: center;
    background-color: #222325;
    justify-content: space-between;

    span {
      color: #fff;
    }

    .text {
      margin: 0 5px;
    }

    .complete {
      color: red;
    }
    .amount {
      margin-top: 3px;
      font-size: 12px;
      margin-right: auto;
      color: #5a5a5a;
    }

    .download {
      img {
        width: 20px;
        height: 20px;
      }
    }

    .list {
      margin: 0 7px;

      img {
        width: 20px;
        height: 20px;
      }
    }
  }

  main {
    padding: 0 15px;

    .play-box {
      display: flex;
      align-items: center;
      margin-bottom: 15px;

      &.selected {
        i {
          color: red;
        }

        .name {
          color: red;
          font-weight: 600;
        }
      }

      .voice-icon i {
        &:nth-child(1) {
          animation: besmall 2s linear infinite;
        }

        &:nth-child(2) {
          animation: besmall 2s linear 0.65s infinite;
        }

        &:nth-child(3) {
          animation: besmall 2s linear 1.2s infinite;
        }
      }

      .voice-icon {
        display: flex;
        justify-content: space-between;
        flex: 0 0 13px;
        margin-right: 15px;
        padding-bottom: 2px;
        width: 13px;

        i {
          display: block;
          width: 3px;
          height: 8px;
          background: red;
          transform-origin: left bottom;

          &:nth-child(1) {
            transform: scaleY(1.8);
          }

          &:nth-child(3) {
            transform: scaleY(0.5);
          }
        }
      }

      .ranking {
        margin-right: 10px;
      }

      .works-box {
        margin-right: auto;

        // line-height: 17px;

        .name {
          font-size: 16px;
          margin-bottom: 4px;

          span {
            color: #a3a3a3;
          }
        }

        .author {
          font-size: 12px;
          color: #a3a3a3;
        }

        .name,
        .author {
          width: 255px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}

@keyframes besmall {
  0% {
    transform: scaleY(1.8);
  }

  50% {
    transform: scaleY(0.5);
  }

  100% {
    transform: scaleY(1.8);
  }
}
</style>

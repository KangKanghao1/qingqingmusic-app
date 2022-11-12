<template>
  <div class="singer-mv-view">
    <div class="mv-nav-icon">
      <i class="goto-1-icon" @click="goqiutUpperlevel"></i>
      <p class="van-ellipsis">
        {{ mvdatacontent.artistName }}-{{ mvdatacontent.name }}
      </p>
    </div>
    <van-loading
      v-show="showloading"
      class="spinnerloading"
      type="spinner"
      color="red"
    />
    <div class="mv-posti">
      <div class="all-posti-icon">
        <div class="posti-good" @click="clickgoodicon">
          <div class="posti-good-icon" :class="{ clickgood: goodicon }"></div>
          <p class="good-count">{{ goodcount }}</p>
        </div>
        <div class="posti-love" @click="clickloveicon">
          <p class="posti-love-icon" :class="{yiloveicon :loveicon}"></p>
          <p class="good-love">{{lovecount}}</p>
        </div>
        <div class="posti-commment" @click="showPopup">
          <p class="posti-commment-icon"></p>
          <p class="good-commment">{{ mvcomment.length }}</p>
        </div>

        <div class="share-icon">
          <p class="share-icon-icon"></p>
        </div>
      </div>
    </div>
    <van-popup
      v-model="show"
      class="commment-popup"
      position="bottom"
      :style="{ height: '60%' }"
      round
    >
      <div>评论({{ mvcomment.length }})</div>
      <div v-for="m in mvcomment" :key="m.id">
        <div class="all-mvcomment">
          <div class="mvcomment-user">
            <img class="userhead-portrait" :src="m.user.avatarUrl" alt="" />
            <div class="user-nickname">
              <p class="user-title">{{ m.user.nickname }}</p>
              <p>{{ m.timeStr }}-{{ m.ipLocation.location }}</p>
            </div>
            <i class="user-good-icon"></i>
          </div>
          <div class="user-content">{{ m.content }}</div>
        </div>
      </div>
    </van-popup>
    <VideoView :mvdatalist="mvdatalist" />
  </div>
</template>
<script>
import { getmvplay, getmvdata, getmvcomment } from "@/apis/play";
import VideoView from "@/components/VideoView.vue";

export default {
  data() {
    return {
      mvid: "",
      // mv 播放数据
      mvdatalist: "",
      // mv 加载 loading
      showloading: true,
      // mv 基本数据
      mvdatacontent: {},
      // 评论
      mvcomment: [],
      // popup 显示隐藏
      show: false,
      // 点赞icon
      goodicon: false,
      loveicon: false,
      // 假点赞数量
      goodcount: 10,
      lovecount:210
    };
  },
  created() {
    this.mvid = this.$route.query.mvid;
    this.getmvplaydata();
    this.getmvdata();
    this.getmvcommentdata();
  },

  methods: {
    showPopup() {
      this.show = true;
    },
    // mv 播放数据
    async getmvplaydata() {
      let { data } = await this.$axios(getmvplay(this.mvid));
      this.mvdatalist = data.data.url;
      this.showloading = !this.showloading;
    },
    // mv 基本数据
    async getmvdata() {
      let { data } = await this.$axios(getmvdata(this.mvid));
      this.mvdatacontent = data.data;
    },
    // 评论
    async getmvcommentdata() {
      let { data } = await this.$axios(getmvcomment(this.mvid));
      this.mvcomment = data.comments;
      console.log(data);
    },

    clickgoodicon() {
      this.goodicon = !this.goodicon;
      if (this.goodicon) {
        this.goodcount += 1;
      } else {
        this.goodcount -= 1;
      }
    },
    clickloveicon() {
      this.loveicon = !this.loveicon;
      if (this.loveicon) {
        this.lovecount += 1;
      } else {
        this.lovecount -= 1;
      }
    },

    // 退出到上一页
    goqiutUpperlevel() {
      this.$router.go(-1);
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
    width: 100%;
    height: 50px;
    padding: 20px;
    display: flex;
    align-items: center;
    font-size: 16px;

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

  .spinnerloading {
    margin: 200px;
  }

  .mv-posti {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100vw;
    height: 35vh;
    padding: 20px;

    .all-posti-icon {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      .posti-good {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 15px;
        .posti-good-icon {
          width: 30px;
          height: 30px;
          background-image: url("@/assets/imgs/dianzan.png");
          background-position: center center;
          background-size: cover;
          background-repeat: no-repeat;

          &.clickgood {
            background-image: url("@/assets/imgs/yidianzan.png");
            animation: goodanime 0.5s linear;
          }
        }
        .good-count {
          font-size: 12px;
        }
      }

      .posti-commment {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 15px;
        .posti-commment-icon {
          width: 30px;
          height: 30px;
          background-image: url("@/assets/imgs/pinglun.png");
          background-position: center center;
          background-size: cover;
          background-repeat: no-repeat;
        }
        .good-commment {
          font-size: 12px;
        }
      }

      .posti-love {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 15px;
        .posti-love-icon {
          width: 30px;
          height: 30px;
          background-image: url("@/assets/imgs/love.png");
          background-position: center center;
          background-size: cover;
          background-repeat: no-repeat;

          &.yiloveicon {
            background-image: url("@/assets/imgs/yilove.png");
            animation: goodanime 0.5s linear;
          }
        }
        .good-love {
          font-size: 12px;
        }
      }

      .share-icon {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 15px;
        .share-icon-icon {
          width: 30px;
          height: 30px;
          background-image: url("@/assets/imgs/shengluehao.png");
          background-position: center center;
          background-size: cover;
          background-repeat: no-repeat;
        }
      }
    }
  }

  .commment-popup {
    background-color: rgb(29, 27, 27);
    padding: 20px;

    .all-mvcomment {
      padding: 10px;
      border-bottom: 1px solid rgba(221, 221, 221, 0.101);
      .mvcomment-user {
        display: flex;
        align-items: center;
        padding: 10px;
        font-size: 12px;

        .userhead-portrait {
          width: 30px;
          height: 30px;
          display: block;
          border-radius: 999px;
          margin-right: 10px;
        }
        .user-title {
          font-size: 14px;
          color: #ddd;
          margin-bottom: 3px;
        }

        .user-good-icon {
          margin-left: auto;
          display: block;
          width: 20px;
          height: 20px;
          background-image: url("@/assets/imgs/dianzan.png");
          background-position: center center;
          background-size: cover;
          background-repeat: no-repeat;
          content: "";
        }
      }
      .user-content {
        padding: 5px 0;
        margin-left: 50px;
        font-size: 14px;
      }
    }
  }
}
@keyframes goodanime {
  0% {
    transform: scaleY(1.2);
    transform: scaleX(1.2);
  }
  66% {
    transform: scaleY(0.8);
    transform: scaleX(0.8);
  }

  77% {
    transform: scaleY(1.2);
    transform: scaleX(1.2);
  }
  100% {
    transform: scaleY(1);
    transform: scaleX(1);
  }
}
</style>
<template>
  <div class="more-singer-view">
    <div class="singer-nav">
      <i class="singer-quit-icon" @click="goquitsonger"></i>
      <div>歌手分类</div>
    </div>

    <div class="singer-class">
      <div class="all-songer">
        <span>全部歌手</span>
        <div is-link @click="showPopup">筛选</div>
      </div>
      <div class="songer-title-text">热门歌手</div>

      <div class="songer-class-list">
        <ul class="songer-img-title">
          <li v-for="s in singerdata" :key="s.id">
            <img class="singer-img" v-lazy="s.picUrl" alt="" />
            <div class="singer-name">
              <p class="s-name">{{ s.name }}</p>
              <span class="s-fanscount"
                >粉丝：{{
                  s.fansCount > 10000 ? s.fansCount / 1000 + "万" : s.fansCount
                }}</span
              >
            </div>
            <div class="close-fill">
              <i
                class="close-guanzhu-icon"
             
              ></i>
              关注
            </div>
          </li>
        </ul>
      </div>

      <van-popup class="singerclass-popup" v-model="show" position="top">
        <div class="pop-title">歌手分类</div>
        <div class="songerclass-title">
          <div class="allcalss list">
            <div v-for="(a, i) in artisttype" :key="i">
              <div
                class="select-title"
                :class="{ selectcolor: a.type == type }"
                @click="modifytype(a)"
              >
                {{ a.title }}
              </div>
            </div>
          </div>
          <div class="region-calss list">
            <div v-for="(b, i) in artistarea" :key="i">
              <div
                class="artist-title"
                :class="{ selectcolor: b.types == types }"
                @click="modifytypes(b)"
              >
                {{ b.title }}
              </div>
            </div>
          </div>
          <div class="surname-calss list">
            <div v-for="(c, i) in songsurname" :key="i">
              <div
                class="songsur-title"
                :class="{ selectcolor: c.typea == songclass }"
                @click="modifysongclass(c)"
              >
                {{ c.title }}
              </div>
            </div>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { getSongtypeareaList } from "@/apis/index";
import { mapState } from "vuex";

export default {
  data() {
    return {
      // title 分类标题
      artisttype: [
        {
          title: "全部",
          type: -1,
        },
        {
          title: "男歌手",
          type: 1,
        },
        {
          title: "女歌手",
          type: 2,
        },
        {
          title: "乐队",
          type: 3,
        },
      ],
      artistarea: [
        {
          title: "全部",
          types: -1,
        },
        {
          title: "华语",
          types: 7,
        },
        {
          title: "欧美",
          types: 96,
        },
        {
          title: "日本",
          types: 8,
        },
        {
          title: "韩国",
          types: 16,
        },
        {
          title: "其他",
          types: 0,
        },
      ],
      songsurname: [
        {
          title: "热",
          typea: "-1",
        },
        {
          title: "A",
          typea: "a",
        },
        {
          title: "B",
          typea: "b",
        },
        {
          title: "C",
          typea: "c",
        },
        {
          title: "D",
          typea: "d",
        },
        {
          title: "E",
          typea: "e",
        },
        {
          title: "F",
          typea: "f",
        },
        {
          title: "G",
          typea: "g",
        },
        {
          title: "H",
          typea: "h",
        },
        {
          title: "I",
          typea: "i",
        },
        {
          title: "J",
          typea: "j",
        },
        {
          title: "K",
          typea: "k",
        },
        {
          title: "L",
          typea: "l",
        },
        {
          title: "M",
          typea: "m",
        },
        {
          title: "M",
          typea: "m",
        },
        {
          title: "N",
          typea: "n",
        },
        {
          title: "O",
          typea: "o",
        },
        {
          title: "P",
          typea: "p",
        },
        {
          title: "Q",
          typea: "q",
        },
        {
          title: "R",
          typea: "r",
        },
        {
          title: "S",
          typea: "s",
        },
        {
          title: "T",
          typea: "t",
        },
        {
          title: "U",
          typea: "u",
        },
        {
          title: "V",
          typea: "v",
        },
        {
          title: "W",
          typea: "W",
        },
        {
          title: "X",
          typea: "x",
        },
        {
          title: "Y",
          typea: "y",
        },
        {
          title: "Z",
          typea: "z",
        },
      ],
      // 关注显示
      showguanzhu: false,

      id: null,
      //   控制popup 栏显示隐藏
      show: false,
      // 默认请求数据data
      type: -1,
      types: 7,
      songclass: -1,

      //分类歌手数据
      singerdata: [],
    };
  },
  created() {
    this.getSongtypeareadata();
  },

  methods: {
    // 歌手分类 默认为 type: -1,types: 7,songclass: -1,
    async getSongtypeareadata() {
      let { data } = await this.$axios(this.getSongtype);
      this.singerdata = data.artists;
      console.log("gesu", data.artists);
    },

    // popup显示
    showPopup() {
      this.show = true;
    },

    goquitsonger() {
      this.$router.go(-1);
    },
    // 全部歌手 男女歌手
    modifytype(data) {
      this.type = data.type;
    },
    // 地区歌手
    modifytypes(data) {
      this.types = data.types;
    },
    // 热门|| 姓氏开头
    modifysongclass(data) {
      this.songclass = data.typea;
    },
  },

  computed: {
    ...mapState(["AllSingers"]),
    // 计算属性监听网址请求变化
    getSongtype() {
      return getSongtypeareaList(this.type, this.types, this.songclass);
    },
  },
  // 监听计算属性有没有变化根据计算属性里的数据来再次做网络请求
  watch: {
    // newurl 新值
    getSongtype(newurl) {
      this.getSongtypeareadata(newurl);
    },
  },
};
</script>
<style lang="scss" scoped>
.more-singer-view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  color: #fff;
  background-color: #242121;
  overflow: auto;
  z-index: 3;

  .singer-nav {
    position: fixed;
    top: 0;
    left: 0%;
    width: 100vw;
    height: 54px;
    padding: 20px;
    background-color: rgb(22, 22, 22);
    display: flex;
    align-items: center;

    .singer-quit-icon {
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

  .singer-class {
    padding-top: 54px;

    .songer-img-title {
      padding-bottom: 50px;
      li {
        display: flex;
        align-items: center;
        padding: 10px 20px 0;
        .singer-img {
          width: 50px;
          height: 50px;
          margin-right: 10px;
          border-radius: 999px;
          display: block;
        }

        .singer-name {
          .s-fanscount {
            font-size: 12px;
            color: rgb(193, 193, 193);
          }
        }
        .close-fill {
          margin-left: auto;
          font-size: 12px;
          // font-weight: 600;
          // padding: 7px;
          // border-radius: 999px;
          // background-color: rgb(69, 66, 66);

          .close-guanzhu-icon {
            display: block;
            width: 20px;
            height: 20px;
            margin-left: 2px;
            background-image: url("@/assets/imgs/guanzhu.png");
            background-position: center center;
            background-size: cover;
            background-repeat: no-repeat;
            content: "";

            &.yiguanzhu {
              background-image: url("@/assets/imgs/yiguanzhu.png");
            }
          }
        }
      }
    }

    .all-songer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 15px;
    }
    .songer-title-text {
      padding: 5px 15px;
      font-size: 12px;
      background-color: rgb(107, 107, 107);
    }

    .singerclass-popup {
      padding: 20px;
      background-color: #242121;

      .pop-title {
        text-align: center;
      }

      .list {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;

        .select-title {
          // color: aqua;
          &.selectcolor {
            color: aqua;
          }
        }
      }
      .region-calss {
        .artist-title {
          &.selectcolor {
            color: aqua;
          }
        }
      }

      .surname-calss {
        overflow: auto;
        .songsur-title {
          padding: 0 10px;
          &.selectcolor {
            color: aqua;
          }
        }
      }
    }
  }
}
</style>
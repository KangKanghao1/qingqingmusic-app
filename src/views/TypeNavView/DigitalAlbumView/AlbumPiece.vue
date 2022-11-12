<template>
  <div class="album-box">
    <div class="nav-box">
      <van-icon name="arrow-left" size="20" @click="gotoPreviousPage" />
      <div class="text">{{ artistNames }}《{{ albumName }}》</div>
      <van-icon name="share-o" size="21" @click="showShare = true" />
    </div>

    <div class="albumpiece-box">
      <div class="production">
        <div class="production-img">
          <img class="auto-img" :src="coverUrl" alt="" />
          <img class="butterfly" src="@/assets/imgs/e0g.png" alt="" />
        </div>
        <div class="name">{{ albumName }}</div>
        <div class="author">{{ artistNames }}</div>
      </div>
      <div class="support">
        <div class="price">￥{{ price }}</div>
        <van-button
          class="button"
          round
          color="linear-gradient(to right, rgb(77 74 255 / 64%), rgb(255 0 0 / 82%))"
          @click="showPopup"
          v-show="!pay"
        >
          立即支持
        </van-button>
        <van-button round type="info" disabled  class="button" color='red' v-show="pay">感谢支持</van-button>
      </div>
      <div class="tags">
        <div class="text" v-for="(t, i) in tags" :key="i">
          <van-icon name="passed" /> {{ t }}
        </div>
      </div>
    </div>

    <div class="detailed-information">
      <van-tabs scrollspy sticky :offset-top="40" background="#d5d5d5">
        <van-tab :title="'专辑详情'" class="aaa">
          <div class="text" v-for="(d, i) in descr" :key="i">
            {{ d.resource }}
          </div>
          <div class="video">
            <video v-if="mvPlayUrl" :src="mvPlayUrl" width="100%" height="300px"  controls></video>
          </div>
        </van-tab>

        <van-tab :title="'评论'">
          <div class="comments-section-box">
            <div class="text">评论区</div>
            <div
              class="comments-box"
              v-for="(c, i) in hotComments"
              :key="c.commentId"
            >
              <div class="comments-section-header">
                <div class="head-portrait">
                  <img :src="c.user.avatarUrl" alt="" />
                </div>
                <div class="user-box">
                  <div class="username">{{ c.user.nickname }}</div>
                  <div class="date">
                    {{ c.timeStr }} {{ c?.ipLocation.location }}
                  </div>
                </div>
                <div class="praise-box">
                  <div class="praise-amount">
                    {{ c?.likedCount ? c?.likedCount : "" }}
                  </div>
                  <div class="praise-icon">
                    <van-icon
                      name="good-job-o"
                      size="17"
                      :class="{ 'praise-color': i }"
                      color=" rgba(169, 169, 169, 0.663)"
                    />
                  </div>
                </div>
              </div>

              <div class="comment-content">{{ c.content }}</div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
      class="share"
    />

    <van-popup
      v-model="show"
      closeable
      close-icon="close"
      position="bottom"
      :style="{ height: '40%' }"
      round
      @close='onclose'
    >
      <div class="popup-box">
        <div class="name">{{ albumName }}</div>
        <div class="commodity">
          <div>价格</div>
          <div>￥{{price}}</div>
        </div>

        <div class="commodity">
          <div>数量</div>
          <div class="buttom-box">
            <button @click="subtract">-</button>
            <div>{{quantity}}</div>
            <button @click="add">+</button>
          </div>
        </div>

        <div class="commodity">
          <div>支付金额</div>
          <div class="price">￥{{price*quantity}}</div>
        </div>

        <van-button round type="info" block @click="payment">支付</van-button>

      </div>
    </van-popup>
  </div>
</template>
<script>
import { getProductiondata } from "@/apis/rankinglist";
import { getalbumComments } from "@/apis/rankinglist";
import { Toast } from "vant";
export default {
  data() {
    return {
      albumid: "",
      descr: [],
      tags: [],
      albumName: [],
      artistNames: [],
      price: [],
      coverUrl: [],
      //评论区的内容
      hotComments: [],
      showShare: false,
      show: false,
      pay:false,
      quantity:1,
      mvPlayUrl:'',
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
    };
  },
  created() {
    this.albumid = this.$route.query.id;
  },
  mounted() {
    this.getProductiondata();
    this.getalbumComments();
  },
  methods: {
    async getProductiondata() {
      let { data } = await this.$axios(getProductiondata(this.albumid));
      this.price = data.product.price;
      this.artistNames = data.album.artistNames,
      this.albumName = data.album.albumName;
      this.descr = data.product.descr;
      this.tags = data.product.tags;
      this.coverUrl = data.album.coverUrl;
      this.mvPlayUrl=data.product.mvPlayUrl
    },
    async getalbumComments() {
      let { data } = await this.$axios(getalbumComments(this.albumid));
      console.log(data);
      this.hotComments = data.hotComments;
    },
    gotoPreviousPage() {
      this.$router.go(-1);
    },
    onSelect(option) {
      Toast(option.name);
      if (option.name == "复制链接") {
        Toast(this.$route.fullPath);
      }
      this.showShare = false;
    },
    showPopup() {
      this.show = true;
    },
    subtract(){
      if (this.quantity!=1) {
         this.quantity--
      }

    },
    add(){
this.quantity++
    },
    payment(){
     this.show=false
     this.pay=true
     Toast('成功支付'+this.price*this.quantity+'元')
    },
    onclose(e){
      console.log(e);
    }
  },
};
</script>
<style lang="scss" scoped>
.van-popup {
  background-color: #fff;

}

.album-box {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #222325;
  overflow: auto;
  z-index: 21;

  .popup-box {
    padding: 15px;
    .name {
      font-weight: bolder;
    }
   .commodity{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
    .buttom-box{
        display: flex;
        align-items: center;
    }
    .price{
      color: red;
    }
   }
  }
  .nav-box {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 40px;
    padding: 0 15px;
    display: flex;
    align-items: center;
    color: #fff;
    background-color: #222325;
    z-index: 2;
    overflow: auto;
    justify-content: space-around;
    .text{
      width: 250px;
      overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    }
  }

  .albumpiece-box {
    padding: 0 10px;
    margin-top: 40px;
    margin-bottom: 10px;
    width: 100%;
    background-color: rgb(69, 69, 69);
    .production {
      padding: 25px 0 15px 0;
      text-align: center;
      .production-img {
        position: relative;
        margin: 0 auto;
        width: 160px;
        height: 160px;
        .auto-img {
          width: 100%;
          display: block;
        }
        .butterfly {
          position: absolute;
          right: -36px;
          top: 0;
        }
      }
      .name {
        margin-top: 10px;
        color: #fff;
      }
      .author {
        margin-top: 5px;
        font-size: 13px;
        color: #ffffff8a;
      }
    }
    .support {
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #ffffff17;
      border-bottom: 1px solid #ffffff17;
      .price {
        font-size: 18px;
        font-weight: bolder;
        color: #ad1313;
      }
      .button {
        height: 30px;
      }
    }
    .tags {
      padding: 10px 0;
      display: flex;
      line-height: 20px;
      flex-wrap: wrap;
      justify-content: space-around;

      .text {
        font-size: 12px;
        color: #fff6;
      }
    }
  }
  .detailed-information {
    padding: 15px;
    width: 100%;
    background-color: rgb(69, 69, 69);
    font-size: 13px;
    color: #fff !important;

    .text {
      line-height: 20px;
      margin-top: 20px;
    }
  }
  .comments-section-box {
    padding: 15px;
    width: 100%;
    background-color: rgb(69, 69, 69);
    font-size: 13px;
    color: #fff;
    .text {
      margin-bottom: 15px;
    }
    .comments-box {
      margin-bottom: 15px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      .comments-section-header {
        display: flex;
        align-items: center;
        .head-portrait {
          width: 35px;
          height: 35px;

          margin-right: 10px;
          img {
            display: block;
            width: 100%;
            border-radius: 999px;
          }
        }
        .user-box {
          .username {
            color: rgb(241, 229, 229);
          }
          .date {
            font-size: 18px;
            transform: scale(0.5);
            transform-origin: left center;
            color: rgba(169, 169, 169, 0.663);
          }
        }
        .praise-box {
          margin-left: auto;
          display: flex;
          align-items: flex-end;
          .praise-amount {
            color: rgba(169, 169, 169, 0.663);
            margin-right: 5px;
          }
        }
      }
      .comment-content {
        line-height: 20px;
        margin: 10px 0 15px 45px;
      }
    }
  }
}
</style>
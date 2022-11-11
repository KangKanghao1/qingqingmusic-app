<template>
  <div class="box">
    <div class="nav">
      <van-icon name="arrow-left" size="20" @click="gotoPreviousPage" />
      <div class="text">数字专辑</div>
    </div>

    <div class="new-arrival-box">
      <div class="new-arrival-header">
        <div class="text">最新上架 <van-icon name="arrow" /></div>
      </div>

      <div class="new-arrival-content">
        <div class="new-arrival-minibox" v-for="p in products" :key="p.albumId">
          <div class="new-arrival-img">
            <img class="auto-img" :src="p.coverUrl" />
            <img class="dei" src="@/assets/imgs/e0g.png" alt="" />
          </div>
          <div class="name">{{ p.albumName }}</div>
          <div class="author">{{ p.artistName }}</div>
          <div class="price">￥{{ p.price }}</div>
        </div>
      </div>
    </div>

    <div class="number-announcement-box">
      <div class="number-announcement-header">
        <div class="text">数字专辑榜 <van-icon name="arrow" /></div>
      </div>

      <van-tabs animated>
        <van-tab
          class="vantab"
          :title="n.name"
          :name="n.type"
          v-for="n in navtab"
          :key="n.type"
        >
     <swiper  :options="swiperOption">
          <swiper-slide class="swiper">
          <div
            class="album-box"
            v-for="(d, i) in DigitalAlbumdata"
            :key="d.albumId"
          >
            <div class="album-img">
              <img class="auto-img" :src="d.coverUrl" alt="" />
              <img class="dei" src="@/assets/imgs/e0g.png" />
            </div>
            <div class="ranking">{{ i + 1 }}</div>
            <div class="album-name">{{ d.albumName }}</div>
          </div>
          </swiper-slide>
           <swiper-slide>     </swiper-slide>
            <swiper-slide>     </swiper-slide>
                <swiper-slide>     </swiper-slide>
            <swiper-slide>     </swiper-slide>
                <swiper-slide>     </swiper-slide>
            <swiper-slide>     </swiper-slide>
 </swiper>
        </van-tab>
      </van-tabs>
    </div>

    <div class="number-announcement-box">
      <div class="number-announcement-header">
        <div class="text">数字单曲榜 <van-icon name="arrow" /></div>
      </div>

      <van-tabs animated>
        <van-tab title="日榜" name="a">
        
       <div class="album-box">
            <div class="album-img">
              <img
                class="auto-img"
                src="@/assets/imgs/109951167973959576.jpg"
                alt=""
              />
              <img class="dei" src="@/assets/imgs/e0g.png" alt="" />
            </div>
            <div class="ranking">1</div>
            <div class="album-name">if you</div>
          </div>
  
       
        </van-tab>
        <van-tab title="周榜" name="b">内容 2</van-tab>
        <van-tab title="总榜" name="c">内容 3</van-tab>
      </van-tabs>
  
    </div>
  </div>
</template>
<script>
import { getNewDiscShelves } from "@/apis/rankinglist";
import { getDigitalAlbumdata } from "@/apis/rankinglist";
import { ListOptions } from "@/apis/rankinglist";
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'
export default {
  data() {
    return {
      //数据
      products: [],
      navtab: ListOptions,
      DigitalAlbumdata: [],
      swiperOption: {
          slidesPerView: 'auto',
          spaceBetween: 30,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        }
    };
  },
  mounted() {
    this.getNewDiscShelves();
    this.getDigitalAlbumdata();
  },
  methods: {
    gotoPreviousPage() {
      this.$router.go(-1);
    },
    async getNewDiscShelves() {
      let { data } = await this.$axios(getNewDiscShelves);
      this.products = data.products;
      console.log(this.products);
    },
    async getDigitalAlbumdata() {
      let { data } = await this.$axios(
        getDigitalAlbumdata(this.navtab[0].type)
      );
      console.log(data);
      this.DigitalAlbumdata = data.products;
    },
  },
    components: {
      Swiper,
      SwiperSlide
    },
};
</script>
<style lang="scss" scoped>
// .vantab {
//   display: flex;
//   height: 185px;
//   justify-content: space-between;
//   flex-direction: column;
// }
.swiper{
   display: flex;
  height: 185px;
  flex-direction: column;
  flex-wrap: wrap;
}
.box {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: #fff;
  overflow: auto;

  .nav {
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
    .text {
      margin: 0 auto;
      transform: translateX(-16px);
    }
  }

  .new-arrival-box {
    margin-top: 40px;
    padding: 10px;
    font-size: 12px;
    .new-arrival-header {
      margin-bottom: 10px;
      .text {
        font-size: 16px;
        font-weight: 600;
      }
    }
    .new-arrival-content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .new-arrival-minibox {
        width: 25%;
        margin-right: 15px;
        margin-bottom: 15px;
        line-height: 16px;
        .new-arrival-img {
          position: relative;
          width: 100%;
          height: 90px;
          border-radius: 3px;
          .auto-img {
            width: 100%;
            display: block;
          }
          .dei {
            position: absolute;
            right: -24px;
            top: -4px;
            height: 100px;
          }
        }
        .name {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .author {
          width: 130px;
          font-size: 15px;
          transform: scale(0.7);
          transform-origin: left center;
          color: #707070;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .price {
          font-size: 12px;
          color: #e4393c;
        }
      }
    }
  }

  .number-announcement-box {
    padding: 10px;

    .number-announcement-header {
      .text {
        font-weight: 600;
      }
    }

    .album-box {
     
      width: 390px;
      display: flex;
      padding: 5px 0;
      align-items: center;
      border-bottom: 1px solid #0000001f;
      .album-img {
        position: relative;
        width: 50px;
        height: 50px;
        border-radius: 3px;
        margin-right: 20px;
        .auto-img {
          width: 100%;
          display: block;
        }
        .dei {
          position: absolute;
          right: -12px;
          top: 0;
          height: 50px;
        }
      }
      .ranking {
        margin-right: 15px;
      }
    }
  }
}
</style>
<template>
  <div class="ranking">
    <!-- 音乐排行榜 -->
    <div class="music-ranking">
      <div class="history-title">排行榜</div>
      <van-icon name="arrow" color="#828282" />
    </div>
    <swiper class="swiper officiallist-box" :options="swiperOption">
      <swiper-slide
        class="minibox"
        v-for="l in RankingListdata"
        :key="l.id"
        :style="{ backgroundImage: `url(${l.coverImgUrl})` }"
      >
        <div @click="getId(l.id)">
          <div class="minibox-tou">
            <div class="name">{{ l.name }}</div>
            <div class="updateFrequency">{{ l.updateFrequency }}</div>
          </div>

          <div class="minibox-content">
            <div class="tracks">
              <div class="first" v-for="(t, i) in l?.tracks" :key="i">
                {{ i + 1 }} {{ t?.first }}
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

import { getRankingListdata } from "@/apis/rankinglist";
export default {
  //     name: 'swiper-example-free-mode',
  // title: 'Free mode / No fixed positions',
  data() {
    return {
      RankingListdata: [],
      track: [],
      swiperOption: {
        slidesPerView: 2,
        spaceBetween: 15,
        freeMode: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
    };
  },
  mounted() {
    this.getRankingListdata();
  },
  methods: {
    async getRankingListdata() {
      let { data } = await this.$axios(getRankingListdata);
      this.RankingListdata = data.list.slice(0, 4);
    },

    getId(id) {
      this.$router.push(`/discovr/esch-rankingList?i=${id}`);
    },
  },

  components: {
    Swiper,
    SwiperSlide,
  },
};
</script>

<style lang="scss" scoped>
.music-ranking {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 30px;
  color: #f3f3f3;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 3px;
  margin-bottom: 15px;
}
.officiallist-box {
  height: 132px;

  .minibox {
    padding: 15px;
    margin-bottom: 15px;
    width: 100%;
    height: 100%;
    border-radius: 15px;
    background-color: rgb(85, 85, 85);

    .minibox-tou {
      margin-bottom: 5px;
      display: flex;
      justify-content: space-between;

      .name {
        width: 55%;
        font-size: 16px;
        font-weight: bolder;
        color: #fff;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .updateFrequency {
        color: #eee;
        font-size: 20px;
        transform: scale(0.5);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        transform-origin: right top;
      }
    }

    .minibox-content {
      .tracks {
        font-size: 14px;
        margin-top: 10px;
        .first {
          margin-bottom: 10px;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #eee;
        }
      }
    }
  }
}
</style>
<template>
  <!--  background="#da433a" -->
  <div class="search-content">
    <div class="search-history">
      <div class="history-title">搜索历史</div>
      <van-icon name="delete-o" color="#777" />
    </div>

    <!-- 热门搜索 -->
    <div class="hot-search">
      <p>热门搜索</p>
      <div class="hot-list">
        <div class="hot-song" v-for="(h, index) in hotSearchData" :key="index">
          {{ h.searchWord }}
        </div>
      </div>
    </div>
    <!-- 音乐排行榜 -->
    <div class="music-ranking">
      <div class="history-title">排行榜</div>
      <van-icon name="arrow" color="#777" />
    </div>
  </div>
</template>

<script>
import { hotSearchList } from "@/apis/search";
export default {
  data() {
    return {
      hotSearchData: [], // 热门搜索
    }
  },

  created() {
     this.getHotSearchData();
  },

  methods: {
    // 热门搜素数据
    async getHotSearchData() {
      await this.$axios.get(hotSearchList).then(({ data: { data } }) => {
        this.hotSearchData = data.slice(0, 10);

        console.log(this.hotSearchData);
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.search-content {
  width: 100%;
  height: 100%;
  padding: 20px 30px 0px;

  .search-history,
  .music-ranking {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 30px;
    color: #555;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 3px;
  }

  .hot-search {
    margin-top: 20px;

    p {
      margin-bottom: 5px;
      font-size: 16px;
      color: #555;
      letter-spacing: 3px;
      font-weight: 600;
      line-height: 30px;
    }

    .hot-list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      .hot-song {
        font-size: 14px;
        color: #999;
        padding: 5px 7px;
        margin-bottom: 10px;
        margin-right: 10px;
        border-radius: 2px;
        background-color: rgba(225, 213, 213, 0.21);
      }
    }
  }

  .music-ranking {
    margin-top: 20px;
  }
}
</style>
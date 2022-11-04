<template>
  <!--  background="#da433a" -->
  <div class="search-content" v-show="!loadingShow">
    <div class="search-history">
      <div class="history-title">搜索历史</div>
      <van-icon name="delete-o" color="#828282" size="16px" />
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

    <MusicRankingList />
  </div>
</template>

<script>
import MusicRankingList from "./MusicRankingList.vue"
import { hotSearchList } from "@/apis/search";
export default {
  props: {
    loadingShow:Boolean
  },
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

      
      });
    },
  },

  components: {
    MusicRankingList
  }
  
}
</script>

<style lang="scss" scoped>
.search-content {
  position: relative;
  z-index: 26;
  width: 100%;
  height: 100%;
  padding: 20px 15px 0px;


  .search-history,
  .music-ranking {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 30px;
    color: #f3f3f3;
    font-size: 14px;
    font-weight: normal;
    letter-spacing: 3px;
  }

  .hot-search {
    margin-top: 20px;

    p {
      margin-bottom: 5px;
      font-size: 14px;
      color: #f3f3f3;
      letter-spacing: 3px;
      font-weight: 600;
      line-height: 30px;
    }

    .hot-list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      .hot-song {
        font-size: 12px;
        color: #c1c1c1;
        padding: 5px 7px;
        margin-bottom: 10px;
        margin-right: 10px;
        border-radius: 2px;
        background-color:#2d2d2d;
      }
    }
  }

  .music-ranking {
    margin-top: 20px;
  }
}
</style>
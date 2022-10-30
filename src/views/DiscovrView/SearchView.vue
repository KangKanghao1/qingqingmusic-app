 <template>
  <div class="search-view">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        shape="round"
        :placeholder="placeholder"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
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
          <div
            class="hot-song"
            v-for="(h, index) in hotSearchData"
            :key="index"
          >
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
  </div>
</template>
<script>
import { hotSearchList } from "@/apis/search";

export default {
  data() {
    return {
      searchText: "",
      hotSearchData: [], // 热门搜索
      placeholder: ''
    };
  },

  methods: {
    onSearch(val) {
      this.getSearchData(val);
      console.log("a");
    },
    onCancel() {
      this.$router.go(-1);
    },
    // 热门搜素数据
    async getHotSearchData() {
      await this.$axios.get(hotSearchList).then(({ data: { data } }) => {
        this.hotSearchData = data.slice(0, 10);

        console.log(this.hotSearchData);
      });
    },
    
  },

  created() {
    this.getHotSearchData();

   this.placeholder = this.$route.query.keywords

  },
};
</script>
<style lang="scss" scoped>
.search-view {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 11;
  background-color: #fff;

  .van-search__content {
    background-color: #f3f3f3;
  }

  .van-search__action {
    letter-spacing: 2px;
    color: #444;
  }

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
}
</style>
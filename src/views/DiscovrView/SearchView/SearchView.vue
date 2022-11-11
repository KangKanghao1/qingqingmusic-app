 <template>
  <div class="search-view">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        shape="round"
        background="#2c2c2c"
        :placeholder="placeholder"
        @search="onSearch"
        @cancel="onCancel"
        @input="onInput"
        @clear="onClear"
        style="color: #ddd"
      />
    </form>
    <van-loading
      class="search-loading"
      type="spinner"
      size="26px"
      color="red"
      v-show="loadingShow"
      >加载中...</van-loading
    >
    <component
      v-show="show"
      :searchText="searchText"
      :loadingShow="loadingShow"
      @on-loading-show="onloadingShow"
      @onSearchListShow="onSearchListShow"
      @onInexistenceShow="onInexistenceShow"
      @onChangeSearchText="onChangeSearchText"
      :is="
        SearchListShow
          ? 'search-input'
          : componentShow
          ? 'search-details'
          : 'search-list'
      "
    />

    <!-- 搜索加载失败 -->
    <div class="inexistence-box" v-show="inexistenceShow">
      <div class="inexistence">
        <span class="text">搜索</span
        ><a href="https://www.baidu.com/" class="s-word"
          >“{{ searchText }}” - 百度一下</a
        >
      </div>
    </div>

    <router-view />
  </div>
</template>
<script>
import SearchInput from "@/views/DiscovrView/SearchView/SearchInput.vue";
import SearchList from "@/views/DiscovrView/SearchView/SearchList.vue";
import SearchDetails from "@/views/DiscovrView/SearchView/SearchDetails.vue";
import { ALL_SEARCH_CONTENT } from "@/Tools/defaultSearch";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      searchText: "",
      placeholder: "",
      componentShow: JSON.parse(localStorage.componentShow),
      SearchListShow: JSON.parse(localStorage.SearchListShow),
      loadingShow: false,
      inexistenceShow: false, // 搜索加载失败
      show: true,
      songList: [],
    };
  },
  computed: {
    ...mapState(["synthesisData", "keywords"]),
  },
  methods: {
    ...mapMutations(["onSearchKeyword", "onSynthesisData"]),

    // 组件显示、隐藏
    onSearchListShow() {
      localStorage.componentShow = JSON.stringify(true);
      this.componentShow = JSON.parse(localStorage.componentShow);
      localStorage.SearchListShow = JSON.stringify(false);
      this.SearchListShow = JSON.parse(localStorage.SearchListShow);
    },

    // 更改搜索关键字
    onChangeSearchText(val) {
      this.searchText = val;
    },
    onloadingShow() {
      this.loadingShow = !this.loadingShow;
    },
    // 搜索不到数据
    onInexistenceShow(bool) {
      this.inexistenceShow = bool;
    },
    // 点击清除按钮后触发
    onClear() {
      this.searchText = "";
      localStorage.SearchListShow = JSON.stringify(true);
      this.SearchListShow = JSON.parse(localStorage.SearchListShow);
    },
    //确定搜索时触发
    async onSearch(val) {
      localStorage.SearchListShow = JSON.stringify(false);
      this.SearchListShow = JSON.parse(localStorage.SearchListShow);

      localStorage.componentShow = JSON.stringify(true);
      this.componentShow = JSON.parse(localStorage.componentShow);

      if (val == "") {
        this.searchText = this.placeholder;
        this.loadingShow = true;
        this.show = false;
        ALL_SEARCH_CONTENT({ $axios: this.$axios, val: this.searchText }).then(
          (data) => {
            this.onSynthesisData(data);
            this.show = true;
            this.loadingShow = false;
          }
        );

      } else {
        this.loadingShow = true;
        this.show = false;
        ALL_SEARCH_CONTENT({ $axios: this.$axios, val }).then((data) => {
          this.onSynthesisData(data);
          this.show = true;
          this.loadingShow = false;
        });
      }

    //搜索历史本地存储
    let history = JSON.parse(localStorage.getItem("SEARCH_HISTORY") ?? "[]");
    console.log(history);
    if (history.length < 1) {
      localStorage.SEARCH_HISTORY = JSON.stringify([this.searchText]);
    }

    let res = history.find( val => this.searchText == val);
    if (!res) {
      localStorage.SEARCH_HISTORY = JSON.stringify([this.searchText, ...history]);
    } else {
      let data = history.filter(val => val !== this.searchText);
      localStorage.SEARCH_HISTORY = JSON.stringify([this.searchText, ...data]);
    }
      
    },
    // 输入框内容变化时触发
    onInput(val) {
      if (val == "") {
        localStorage.SearchListShow = JSON.stringify(true);
        this.SearchListShow = JSON.parse(localStorage.SearchListShow);
      } else {
        localStorage.SearchListShow = JSON.stringify(false);
        this.SearchListShow = JSON.parse(localStorage.SearchListShow);

        localStorage.componentShow = JSON.stringify(false);
        this.componentShow = JSON.parse(localStorage.componentShow);
      }
    },

    // 点击取消按钮时触发
    onCancel() {
      this.$router.go(-1);
    },
  },

  created() {
    this.placeholder = this.$route.query.keywords;
  },

  watch: {
    searchText(newVal) {
      this.onSearchKeyword(newVal);
    },
  },

  components: {
    SearchInput,
    SearchList,
    SearchDetails,
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
  background-color: #151515;

  .inexistence-box {
    position: fixed;
    left: 0;
    top: 60px;
    width: 100%;
    height: 100%;
    background-color: #151515;
    z-index: 25;
    .inexistence {
      color: #ddd;
      line-height: 45px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 1px solid #bbb;
      padding-left: 10px;

      .text {
        color: #ddd;
        width: 55px;
        letter-spacing: 3px;
        font-size: 15px;
      }

      .s-word {
        font-size: 14px;
        letter-spacing: 1px;
        display: inline-block;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: 100%;
      }
    }
  }

  .search-loading {
    position: fixed;
    left: 50%;
    top: 20%;
    z-index: 44;
    transform: translateX(-50%);
  }

  .van-search__content {
    background: rgb(240, 236, 236);
  }

  .van-search__action {
    letter-spacing: 2px;
    color: #ddd;
  }
}
</style>
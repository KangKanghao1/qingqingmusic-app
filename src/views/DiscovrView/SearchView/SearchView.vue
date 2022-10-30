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
        @input="onInput"
      />
    </form>

    <component :is="componentShow ? 'Search-details' : 'Search-input'" />

    <SearchList />

  </div>
</template>
<script>

import SearchInput from "@/views/DiscovrView/SearchView/SearchInput.vue"
import SearchDetails from "@/views/DiscovrView/SearchView/SearchDetails.vue"
import SearchList from "@/views/DiscovrView/SearchView/SearchList.vue"

export default {
  data() {
    return {
      searchText: "",
      placeholder: "",
      componentShow: false
    };
  },

  methods: {
    onSearch() {
      
      
    },
    onInput(val) {
      console.log(val);
    },
    onCancel() {
      this.$router.go(-1);
    },
    
  },

  created() {
   
   this.placeholder = this.$route.query.keywords

  },

  components: {
    SearchInput,
    SearchDetails,
    SearchList
  }
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


}
</style>
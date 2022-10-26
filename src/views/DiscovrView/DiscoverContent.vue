<template>
  <div class="discover-content">
    <DiscoverBanner :bannerimgdata="bannerimgdata" />
    <HomepageItemList :HomepageItemList="HomepageItemList" />
  </div>
</template>
<script>
import DiscoverBanner from "@/components/DiscoverBanner.vue";
import HomepageItemList from "@/components/HomepageItemList.vue";
import { getHomepageItemList } from "../../apis/discover.js";
export default {
  data() {
    return {
      HomepageItemList: [],
    };
  },

  props: {
    bannerimgdata: Array,
  },

  mounted() {
    this.getHomepageItemList();
  },

  methods: {
    async getHomepageItemList() {
      let { data } = await this.$axios(getHomepageItemList);
      this.HomepageItemList = data.data;
      console.log(data.data);
    },
  },

  components: {
    DiscoverBanner,
    HomepageItemList,
  },
};
</script>

<style lang="scss" scoped>
.discover-content {

  padding: 55px 0 0;
}
</style>
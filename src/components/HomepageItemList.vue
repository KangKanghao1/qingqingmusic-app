<template>
  <div class="recommend-content">
   
    <div v-for="h in HomepageItemList" :key="h.id" >
      <div class="homepage-icon-title" @click="a(h.id)">
        <img class="recommend-icon" v-lazy="h.iconUrl" alt="" />
        <h3>{{ h.name }}</h3>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  props: {
    HomepageItemList: Array,
  },
  methods:{
    a(id){
      console.log(this.$route);
      if (id==-3) {
        this.$router.push(`/discovr/rankinglist?id=${id}`)
      }
   
    }
  }
};
</script>
<style lang="scss" scoped>
.recommend-content {
  padding: 0 20px;
  width: 100vw;
  height: 10vh;
  display: flex;
//   justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid rgb(142, 142, 142);
  background-color: rgb(253, 188, 188);
  font-size: 12px;
  overflow-x: auto;
//   overflow: hidden;

  .homepage-icon-title {
    display: flex;
    flex-flow: column;
    justify-content: center;
    text-align: center;

    .recommend-icon {
      width: 50x;
      height: 50px;
    }
  }
}
</style>

<template>
  <div class="bang-singer">
    <div>歌手</div>
    <div class="bang">
      <div v-for="t in toplistartistData" :key="t.id">
        <div class="bang-img-title">
          <img class="bang-img" v-lazy="t.picUrl" />
          <div class="bang-postition">
            <h3 class="bang-title">{{ t.name }}</h3>
            <div class="bang.alias">
              <div v-for="(a, i) in t.alias" :key="i">
                <p>{{ a }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    toplistartistData: Array,
  },

  compontent: {},
};
</script>

<style lang="scss" scoped>
.bang-singer {
 height: 15vw;
 padding: 50px;

  .bang {
    width: 100%;
    height: 15vh;
    padding: 15px;
    padding: 0 0 50px;

    .bang-img-title {
      position: relative;
      width: 100%;
      box-shadow: 2px 0 7px 0;
      border-radius: 15px;
      overflow: hidden;
      margin-top:20px;

      .bang-img {
        position: relative;
        display: block;
        width: 100%;
        border-radius: 15px;
      }
      .bang-postition {
        position: absolute;
        right: 10px;
        bottom: 10px;
        color: #fff;
      }

    }
  }
}
</style>
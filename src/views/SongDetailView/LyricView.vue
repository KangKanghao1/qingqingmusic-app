<template>

    <div class="lyric-v" ref="lyric">
      <div class="img">
        <!-- <img class="before-bg" v-lazy="picUrl" /> -->
      </div>
      
      <!-- <img class="after-bg" v-lazy="picUrl" /> -->
      <p
        :class="{ active: currentIndex == i }"
        v-for="(l, i) in lyric"
        :key="i"
      >
        {{ l.lrc }}
      </p>
   
  </div>
</template>
<script>
export default {
  props: {
    lyric: Array,
    currentIndex: Number,
  },
  data() {
    return {
      curenntTime: 0,
    };
  },
  methods: {
    getTime(){
      setTimeout(()=> {
        this.curenntTime += 1; 
        this.$refs.lyric.scrollTop = 40 * (this.currentIndex - 6) + this.curenntTime;
        
        if(this.curenntTime < 40) {
          this.getTime(this.$refs.lyric.scrollTop);
        }

      },1)
    }
  },
  watch: {
   async currentIndex() {
     
      if (this.currentIndex > 5) {
       await this.getTime();
       
         this.curenntTime = 0;
       
      }else{
        this.$refs.lyric.scrollTop = 0;
      }
    },
  },
};
</script>
<style lang="scss" scoped>


  .lyric-v {
    overflow-y: scroll;
    height: 100%;
    width: 100%;
    // transition: all .5s linear;
    
    p {
      font-size: 13px;
      color: #fff;
      line-height: 20px;
      text-align: center;
      padding: 10px 10px;
      &.active {
        font-weight: 600;
        color: red;
        font-size: 16px;
      }
    }
  }

</style>
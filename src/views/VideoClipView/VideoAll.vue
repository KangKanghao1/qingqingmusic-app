<template>
    <div class="box">
       123
    </div>
</template>
<script>
import {getVideoAllData} from "../../apis/videoall.js"
export default {
    data() {
        return {

        }
    },
    mounted() {
   
    this.getVideo();
  },
    methods:{
      async  getVideo(){
      let data  = await this.$axios(getVideoAllData)
      console.log(data);
        }
       
    },
}
</script>
<style lang="scss" scoped>
.box{
    width: 100%;
    height: 100%;
    padding: 40px 0;
}
</style>
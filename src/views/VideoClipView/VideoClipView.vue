<template>
<div >
  
    <!-- <div v-for="(m,i) in mvList" :key="i.artistId"  > -->
         
    <div v-for="m in mvList" :key="m.id"  >
      <div  @click="playMV(m.id)"> 视频 {{m.id}}   </div>
        <div>

       
         <video 
         
          :id="m.id"
          :src="mvId.url"
          width="375px" height="270px"
          controls 
         
         >
        </video>
      </div>
    </div>
</div>
   
</template>
<script>

import { getMVList} from "../../apis/mvList";
import {playMV} from "../../apis/mvList";
export default {
    data() {
        return {
            mvList:[],
           mvId:{}
        }
    },
//     created() {
//     this.playMV();
//   },
  mounted(){
      this.getMVList();
  },
     methods:{
        // 获取全部mv
     async getMVList() {
      let { data } = await this.$axios(getMVList);
      this.mvList = data.data;
      console.log(this.mvList);
      // this.playMV(this.mvList.id)
    },

    // 获取MV播放地址
     async   playMV(id) {
      let { data } =  await this.$axios(playMV(id));
      this.mvId = data.data
      console.log( this.mvId);
    },

    },

    
    }

</script>
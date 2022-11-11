<template>
    <div class="login">
        <div class="heade">登录</div>
        <div class="logo"></div>

        <div class="input-content">

            <div class="phone-container">
                <div class="phone-icon"></div>
                  <input 
                    type="text"
                    name="phone"
                    class="phone"
                    v-model="phone"
                    placeholder="请输入手机号码">

            </div>

                <div class="password-container">
                    <div class="password-icon"></div>
                     <input 
                        type="password"
                        name="password"
                        class="password"
                        v-model="password"
                        placeholder="请输入密码"
                        >
                </div>
            
        </div>
        <!-- <div>{{infoUserId}}</div> -->
        <button class="bnt" @click="getLogin({phone:phone,password:password})">登录</button>
        <div class="bottom-icon-container">
            <div class="wechat"></div>
            <div class="weibo"></div>
            <div class="QQ"></div>
            <div class="apple">
                <img src="../../assets/imgs/pingguo.png" alt="">
                <div class="apple-icon-text">通过Apple登录</div>
            </div>
        </div>
    </div>
    
</template>
<script>

// import { mapActions, mapMutations} from "vuex";
import { getPhoneLigin} from "../../apis/login";

export default {
    data () {
        return {
            
            phone:'',//手机号码
            password:'',//密码
            infoUserId:''//用户id
        }
    },
    methods:{
        // ...mapMutations(["setisLogin"]),
        // ...mapActions(["getLogin"]),
  
          async getLogin(value) {
            let data = await this.$axios (getPhoneLigin(value));
            console.log('res ==>',data); 
            
     
            if (data.data.code == 200) {
                this.infoUserId = data.data.account.id
                console.log( this.infoUserId);

              this.isLogin = false
            //   console.log('aaa',this.isLogin);
              this.$toast('登录成功');
                // this.$router.push(`/user?infoId=${id}`).catch(() =>{});
                this.$router.push({name:'user',params:{id:this.infoUserId}}).catch(() =>{});

                return
            }else {
              this.$toast('账号密码错误喔');
                this.password= ''
            }
    },

    }
}
</script>
<style lang="scss" scoped>
    .login {
        position: fixed;
        width: 100vw;
        height: 93vh;
        // background-color: rgb(248, 97, 97);
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 2000;
        .heade {
            width:100vw;
            height: 11vh;background-color: rgb(201, 78, 63);
            font-size: 24px;
            color: #ffff;
            text-align: center;
            line-height: 15vh;
        }
        .logo {
            width: 50px;
            height:50px ;
            background-image: url(../../assets/imgs/logo.png);
            background-size: 50px 50px;
            background-repeat: no-repeat;
            background-position: center center;
        }
        .input-content {
             input {
            height: 28px;
            font-size: 14px;
            background-color: none;
            // border-radius: 999px;
             border: transparent;
         }

            .phone-container {
                display: flex;
                margin: 15px 0;
                border-bottom:1px  solid #dddddd;

                .phone-icon {
                    width: 25px;
                    height:25px ;
                    background-image: url(../../assets/imgs/shouji.png);
                    background-size: 25px 25px;
                    background-repeat: no-repeat;
                    background-position: center center; 
                    margin: 0 10px;
                }
            }
             .password-container {
               display: flex;
               margin: 15px 0;
                border-bottom:1px  solid #dddddd;

               .password-icon {
                    width: 25px;
                    height:25px ;
                    background-image: url(../../assets/imgs/mima.png);
                    background-size: 25px 25px;
                    background-repeat: no-repeat;
                    background-position: center center; 
                    margin: 0 10px;
               }
            }
        }
        
         .bnt {
            
            width: 100px;
            height: 25px;
            margin: 20px 0;
            border-radius: 999px;
            background-color: rgb(201, 78, 63);
            border: none;
            color: #ffff;
         }
         .bottom-icon-container {
            position: fixed;
            width: 100vw;
            height: 150px;
            background-color: #ffff;
            bottom: 50px;
            right: 0;
            display: flex;
            justify-content: space-between;;
            .wechat {
                width: 25px;
                height:25px ;
                background-image: url(../../assets/imgs/WeChat.png);
                background-size: 25px 25px;
                background-repeat: no-repeat;
                background-position: center center; 
                margin: 0 50px;
            }
           
            .weibo {
                width: 25px;
                height:25px ;
                background-image: url(../../assets/imgs/weibo.png);
                background-size: 25px 25px;
                background-repeat: no-repeat;
                background-position: center center; 
                margin: 0 50px;
            }
             .QQ {
                width: 25px;
                height:25px ;
                background-image: url(../../assets/imgs/QQ.png);
                background-size: 25px 25px;
                background-repeat: no-repeat;
                background-position: center center; 
                margin: 0 50px;
            }
            .apple {
                width: 130px;
                height: 24px;
                position: fixed;
                border: 1px solid ;
                border-radius: 5px;
                bottom: 90px;
                right: 123px;
                display: flex;

                img {
                    width: 12px;
                    height: 12px;
                    margin: 4px  5px 0 10px ;
                }
                .apple-icon-text {
                    font-size: 12px;
                    margin-top: 4px;
                }
            }
         }
    }
</style>
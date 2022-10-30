import Vue from 'vue'
import VueRouter from 'vue-router'
import DiscovrView from '@/views/DiscovrView/DiscovrView.vue'
import MyMusic from '@/views/MyMusic/MyMusic.vue'
import VideoClipView from '@/views/VideoClipView/VideoClipView.vue'
import UserView from '@/views/UserView/UserView.vue'
import UserPage from "@/views/UserView/UserPage.vue"


Vue.use(VueRouter)

const routes = [
  {
    // 自定义重定义跳转到主页
    path: '',
    redirect: '/discovr',

  },
  {
    path: '/',
    redirect: '/discovr',

  },
  {
    path: '/discovr',
    name: 'discovr',
    component: DiscovrView,

    children: [{
      path: "ranking-list",
      name: "ranking-list",
      component: () => import("../views/TypeNavView/RankingList.vue")
    }, {
      path: "esch-rankingList",
      name: "esch-rankingList",
      component: () => import("../views/TypeNavView/EschRankingList.vue")
    },

    {
      path: "search",
      name: "search",
      component: ()=> import('@/views/DiscovrView/SearchView/SearchView')
    }
    ]
  },

  {
    path: '/mymusic',
    name: 'mymusic',
    component: MyMusic
  },

  {
    path: '/video',
    name: 'video',
    component: VideoClipView
  },

  {
    path: '/user',
    name: 'user',
    component: UserView,
    children: [{
      path: "user-page",
      name: "user-page",
      component: UserPage
    }]
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

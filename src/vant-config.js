
import {Slider, NavBar, Tabbar, List, TabbarItem, Icon, Search, Swipe, SwipeItem, Lazyload, Tab, Tabs,Popup,Dialog ,NoticeBar,Loading} from 'vant'
const vantCompontents = [
    Slider,
    NavBar,
    Tabbar,
    TabbarItem,
    Icon,
    Search,
    Swipe,
    SwipeItem,
    Lazyload,
    Tab,
    Tabs,
    List,
    Loading ,
    Popup,
    Dialog,
    NoticeBar

]

export default {
    install(Vue) {
        vantCompontents.forEach(Component => {
            Vue.use(Component)
        })
    }
}

// ui 库专用
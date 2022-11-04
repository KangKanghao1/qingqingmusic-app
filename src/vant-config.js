
import {Slider, NavBar, Tabbar, List, TabbarItem, Icon, Search, Swipe, SwipeItem, Lazyload, Tab, Tabs,Popup,NoticeBar,Dialog ,Sticky,ShareSheet,Checkbox,CheckboxGroup,Loading    } from 'vant'


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
    Popup,
    NoticeBar,
    Sticky,
    ShareSheet,
    Checkbox,
    CheckboxGroup,
    Loading ,
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
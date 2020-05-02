<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control class="re-tab" v-show="isTabFixed"
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"/>

    <scroll class="content" ref="scroll"
    :probe-type="3"
    @scroll="contentScroll"
    :pull-up-load="true"
    @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend :recommends="recommends"/>
      <featrue/>
      <tab-control :titles="['流行','新款','精选']"
        @tabClick="tabClick"
        ref="tabControl"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBack"/>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import Recommend from './childComps/Recommend'
  import Featrue from './childComps/Featrue'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll.vue'
  import BackTop from 'components/content/backTop/BackTop'

  import { getHomeMultidata, getHomeGoods } from 'network/home'
  import { debounce } from 'common/utils.js'

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      Recommend,
      Featrue,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data(){
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBack: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0

      }
    },
    computed:{
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    },
    created() {
      // 获取多个数据
      this.getHomeMultidata()

      // 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      // 图片加载完成的事件监听
      const refresh = debounce(this.$refs.scroll.refresh, 500)
      this.$bus.$on('itemImgLoad', () => {
        refresh()
      })
    },
    methods: {
      /**
       * 事件监听的方法
       */
      tabClick(index) {
        switch(index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      backClick() {
        this.$refs.scroll.scrollTo(0,0,600)
      },
      contentScroll(position) {
        // 判断backtop是否显示
        this.isShowBack = (-position.y) > 1000 ? true : false

        // 判断tabcontrol是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop ? true : false
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {

        const time = setTimeout(() => {
          this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
          clearTimeout(time)
        },1000)

      },

      /**
       * 网络请求相关的方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then((res) => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }

  .home-nav {
    color: #fff;
    background-color: var(--color-tint);
    position: relative;
    z-index: 9;
  }

  .content {
    /* height: calc(100% - 93px);*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .re-tab {
    position: relative;
    z-index: 9;
  }
</style>

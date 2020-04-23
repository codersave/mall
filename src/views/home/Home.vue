<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
    <recommend :recommends="recommends"/>
    <featrue/>
    
    <!-- ul>li{列表$}*50 -->

  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import HomeSwiper from './childComps/HomeSwiper'
  import Recommend from './childComps/Recommend'
  import Featrue from './childComps/Featrue'

  import { getHomeMultidata } from 'network/home'

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      Recommend,
      Featrue
    },
    data(){
      return {
        banners: [],
        recommends: []
      }
    },
    created() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
  }

  .home-nav {
    color: #fff;
    background-color: var(--color-tint);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }
</style>

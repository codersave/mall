<template>
  <div class="swiper-item">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "SwiperItem"
  }
</script>

<style scoped>
  .swiper-item {
    width: 100%;
    flex-shrink: 0;
  }

  .swiper-item img {
    width: 100%;
    display: flex;
  }
</style>

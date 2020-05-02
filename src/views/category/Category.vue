<template>
  <div>
    <h2>分类</h2>
    <div @click="csClick()">点击</div>

  </div>
</template>

<script>
  export default {
    name: "Category",
    data() {
      return {
       message: '',
       age: 12

      }
    },
    methods: {
      csClick(event) {
        console.log(event)
      }
    }
  }
</script>

<style scoped>

</style>

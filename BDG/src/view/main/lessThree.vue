<template>
  <div class="out">
      <!-- <div v-for="(item, index) in imgSrcList" :key="index"> -->
          <!-- <img src='@/assets/img/IThree/01.jpg' alt=""> -->
          <!-- {{item.url}} -->
      <!-- </div> -->
      <div class="img">
          <img src="@/assets/img/lThree/01.jpg" alt="">
          <img src="@/assets/img/lThree/02.jpg" alt="">
          <img src="@/assets/img/lThree/03.jpg" alt="">
          <img src="@/assets/img/lThree/04.jpg" alt="">
          <img src="@/assets/img/lThree/05.jpg" alt="">
          <img src="@/assets/img/lThree/06.jpg" alt="">
          <img src="@/assets/img/lThree/07.jpg" alt="">
      </div>
  </div>
</template>

<script>
export default {
   
}
</script>

<style scoped>
.img {
    width: 65%;
    margin: 0 auto;
}
.img > img {
    width:auto;
    height:100%;
    max-width:100%;
    max-height:100%;
    display:block 
}
</style>
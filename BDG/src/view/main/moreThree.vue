<template>
  <div class="out">
      <!-- <div v-for="(item, index) in imgSrcList" :key="index"> -->
          <!-- <img src='@/assets/img/IThree/01.jpg' alt=""> -->
          <!-- {{item.url}} -->
      <!-- </div> -->
      <div class="img">
          <img src="@/assets/img/mThree/01.jpg" alt="">
          <img src="@/assets/img/mThree/02.jpg" alt="">
          <img src="@/assets/img/mThree/03.jpg" alt="">
          <img src="@/assets/img/mThree/04.jpg" alt="">
          <img src="@/assets/img/mThree/05.jpg" alt="">
          <img src="@/assets/img/mThree/06.jpg" alt="">
          <img src="@/assets/img/mThree/07.jpg" alt="">
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
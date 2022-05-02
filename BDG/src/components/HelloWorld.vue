<template lang="pug">
  div haha 
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      
    }
  },
  methods: {
        //初始化
        Index() {
            this.$rq.post('/api/shop/classList')
                .then(res => {
                    console.log(res)
                    this.srcd = require('../../../images/classList' + res.data[0].img_swiper[0])
                    // this.a = this.src
                    console.log(this.a)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        To() {
            console.log('----')
            this.$router.push({
                name: 'head'
            })
        }
  },
  mounted() {
    this.Index()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

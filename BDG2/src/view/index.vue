<template>
    <div class="index">
        初始化页面
        <img :src="srcd" alt="">
        <button @click='To'>点我</button>
    </div>
</template>

<script>
// import {getIndex} from "../api/index"
export default {
    name: 'index',
    components: {},
    data() {
        return{
            a: '',
            srcd: {}
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
<style scoped>
    img {
        width: 100px;
        height: 100px;
    }
</style>
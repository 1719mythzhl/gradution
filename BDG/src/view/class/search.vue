<template>
  <div class="out">
        <div class="content" v-loading="loading">
            <div class="c2">
              <div class="c2_main">
                  <div class="c2_class">
                      <div class='c2_item' v-for='(val, index) in classMsg' :key='index'>
                          <img :src='val.img_swiper[0]' alt="">
                          <div class="c2_content">
                              <div class="c2_c_1">
                                  {{val.c_name}}
                              </div>
                              <div class="c2_c_2">
                                  适用年龄：{{val.age}}
                              </div>
                              <div class="c2_c_3">
                                  <div class="c2_c_3_price">
                                      ￥{{val.c_price}}
                                  </div>
                                  <div class="c2_c_3_buy ishover" @click='toDetail(val.id)'>购买</div>
                              </div>

                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            classMsg: [],
            imgUrl: '/static/images/classList',
            inpVal: '',
            loading: false
        }
    },
    beforeRouteUpdate(to,from,next){
      this.inpVal = to.query.inpVal;
      next();
      this.search()
    },
    methods: {
        search() {
            // console.log(this.$route.query.inpVal)
            this.loading = true
            this.$rq({
                url: '/api/shop/className',
                methods: 'get',
                params: {
                    name: this.inpVal
                }
            })
            .then(res => {
                // console.log(res.data)
                this.classMsg = res.data
                this.classMsg.forEach(element => {
                    for(let i in element.img_swiper) {    
                        element.img_swiper[i] = this.imgUrl + element.img_swiper[i]
                    }
                    for(let i in element.img_content) {
                        element.img_content[i] = this.imgUrl + element.img_content[i]
                    }
                })
                this.loading = false
                this.$message.success('查询成功')
            })
            .catch(err => {
                this.loading = false
                this.$message.error(err.message)
            })
        },
        toDetail(id) {
            this.$router.push({
                path: '/shopList/detail',
                query: {
                    id: id
                }
            })
        }
    },
    mounted() {
        this.inpVal = this.$route.query.inpVal
        this.search()
    }
}
</script>

<style scoped>
.out {
    width: 100%;
    overflow: hidden;
}
.content {
    background-color: rgb(245,244,239);
}
.c2{
    width: 65%;
    margin: 0 auto;
    padding: 25px 0px;
}
.c2_main {
    /* width: 65%; */
    margin: 0 auto;
    padding: 25px 0px;
}
.c2_main > img {
    margin: 20px 0;
    width: 100%;
}
.c2_class {
    display: flex;
    /* justify-content: center; */
    align-items: center;
    flex-wrap: wrap;
    border-radius: 10px;
}
.c2_item {
    margin: 1%;
    width: 23%;
    border-radius: 20px;
    overflow: hidden;
}
.c2_item > img {
    width: 100%;
    margin: 0;
    /* overflow: hidden; */
}
.c2_content {
    background-color: white;
    padding: 20px;
    margin: 0;
}
.c2_c_1 {
    margin: 0;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.c2_c_2 {
    font-size: 6px;
    color: grey;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.c2_c_3 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.c2_c_3 > div:nth-child(1) {
    color: red;
    font-size: 20px;
}
.c2_c_3 > div:nth-child(2) {
    background-color: rgba(254,225,0);
    padding: 0px 10px;
    font-size: 12px;
    line-height: 24px;
    border-radius: 7px;
}
.c2_c_2, .c2_c_3 {
    margin-top: 5px;
}
</style>
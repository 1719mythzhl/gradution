<template>
  <div class="out">
      <div class="swiper">
            <el-carousel :interval="5000" height='550px'>
                <el-carousel-item>
                    <div class="s1"></div>
                </el-carousel-item>
                <el-carousel-item>
                    <div class="s2"></div>
                </el-carousel-item>   
            </el-carousel>
      </div>
      <div class="content">
          <div class="c1">
              <div class="c1_1">
                  <img src="@/assets/img/index/JXTC.png" alt="">
                  <div class="c1_1_1">
                      <img src="@/assets/img/index/less3.gif" alt="" @click="toAgeBetweenThree('lessThree')">
                      <img src="@/assets/img/index/more3.gif" alt="" @click="toAgeBetweenThree('moreThree')">
                  </div>
              </div>
              <div class="c1_2">
                  <img src="@/assets/img/index/interest.png" alt="">
                  <div class="c1_1_1">
                      
                      <div class="c1_1_1_1" @click="toInterest(0,'YY')">
                          <img src="@/assets/img/index/interest_YY.png" alt="">
                          <p>英语</p>
                      </div>
                      <div class="c1_1_1_1" @click="toInterest(1,'ZY')">
                          <img src="@/assets/img/index/interest_ZY.png" alt="">
                          <p>智育</p>
                      </div>
                      <div class="c1_1_1_1" @click="toInterest(2,'SQ')">
                          <img src="@/assets/img/index/interest_QG.png" alt="">
                          <p>社会与情感</p>
                      </div>
                      <div class="c1_1_1_1" @click="toInterest(3,'YC')">
                          <img src="@/assets/img/index/interest_CZ.png" alt="">
                          <p>艺术与创造</p>
                      </div>
                      <div class="c1_1_1_1" @click="toInterest(4,'ZH')">
                          <img src="@/assets/img/index/interest_ZH.png" alt="">
                          <p>综合</p>
                      </div>
                      <div class="c1_1_1_1" @click="toInterest(5,'WJ')">
                          <img src="@/assets/img/index/interest_ALL.png" alt="">
                          <p>舞台纪念品</p>
                      </div>
                  </div>
              </div>
              <div class="c1_3">
                  <img src="@/assets/img/index/age.png" alt="">
                  <div class="c1_1_1 age">
                      <img src="@/assets/img/index/1-2.jpg" alt="" @click="toAge(0, 'oneTwo')">
                      <img src="@/assets/img/index/2-3.jpg" alt="" @click="toAge(1, 'twoThree')">
                      <img src="@/assets/img/index/more3.jpg" alt="" @click="toAge(2, 'moreThree')">
                  </div>
                  <img class='c1_3_img' src="@/assets/img/index/SPLI.jpg" alt="">
              </div>
          </div>
          <div class="c2">
              <div class="c2_main">
                  <img src="@/assets/img/index/hot.png" alt="">
                  <div class="c2_class"  v-loading="loading">
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
                                  <div class="c2_c_3_buy" @click='toDetail(val.id)'>购买</div>
                              </div>

                          </div>
                      </div>
                  </div>
                  <div class="c2_more">
                      查看更多
                      <i class='el-icon-arrow-right'></i>
                  </div>
              </div>
          </div>
          <div class="c3">
              <img src="@/assets/img/index/TYZQ.png" alt="">
              <img src="@/assets/img/index/TY1.jpg" alt="">
              <img src="@/assets/img/index/TY2.png" alt="">
              <img src="@/assets/img/index/TY3.png" alt="">
          </div>
      </div>
  </div>
</template>

<script>
export default {
    // name: 'main',
    data() {
        return {
            classMsg: [],
            loading: false,
            imgUrl: '/static/images/classList',
        }
    },
    methods: {
        getHotClass() {
            this.loading = true
            this.$rq.get('/api/shop/hotClass')
            .then(res => {
                this.classMsg = res.data
                this.classMsg.forEach(element => {
                    for(let i in element.img_swiper) {    
                        element.img_swiper[i] = this.imgUrl + element.img_swiper[i]
                    }
                    for(let i in element.img_content) {
                        element.img_content[i] = this.imgUrl + element.img_content[i]
                    }
                    this.loading = false
                })
            })
            .catch(err => {
                this.$message.error(err)
            })
        },
        //跳转到三岁以上或以下
        toAgeBetweenThree(val) {
                this.$router.push({
                    name: val
                })

        },
        //兴趣
        toInterest(id, val) {
            this.$router.push({
                name: 'shopList',
                query: {
                    interest_id: id,
                    interest_Ename: val
                }
            })
        },
        //年龄
        toAge(id, val) {
            this.$router.push({
                name: 'shopList',
                query: {
                    age_id: id,
                    age_Ename: val
                }
            })
        },
        toDetail(id) {
            this.$router.push({
                path: '/shopList/detail',
                query: {
                    id: id
                }
            })
        },
    },
    async mounted() {
        await this.getHotClass()
    }
}
</script>

<style scoped>
.out {
    width: 100%;
    overflow: hidden;
}
.s1, .s2 {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-attachment: fixed;
}
.s1 {
    background: url('../../assets/img/index/swiper1.jpg') no-repeat 50%;
}
.s2 {
    background: url('../../assets/img/index/swiper2.jpg') no-repeat 50%;
}
.content,.c1, .c2, .c3,.c1_1, .c1_2, .c1_3 {
    display: flex;
    width: 100%;
    flex-direction: column;
}
.c2 {
    background-color: rgb(245,244,239);
}
.c1, .c2, .c3{
    width: 65%;
    margin: 0 auto;
    padding: 25px 0px;
}
.c1_1, .c1_2, .c1_3 {
    padding: 25px 0px;
}
.c1_1_1 {
    display: flex;
    margin-top: 20px;
    justify-content: space-around;
}
.c1_1_1_1 {
    margin: 20px 1%;
}
.c1_1_1_1 > p {
    text-align: center;
    margin-top: 5px;
}
.c1_1_1  img {
    width: 100%;
} 
.age > img {
    width: 30%;
    border-radius: 20px;
    margin: 0 1%
}
.c1_3_img {
    margin: 20px 0;
    border-radius: 30px;
    padding: 20px;
}
.c2 {
    width: 100%;
}
.c2_main {
    width: 65%;
    margin: 0 auto;
    padding: 25px 0px;
}
.c2_main > img {
    margin: 20px 0;
    width: 100%;
}
.c2_class {
    display: flex;
    justify-content: center;
     align-items: center;
    border-radius: 10px;
}
.c2_item {
    margin: 1%;
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
.c2_more {
    display: inline-block;
    margin-left: 80%;
    margin-top: 20px;
    padding: 2px 15px;
    font-size: 14px;
    text-align: center;
    margin-top: 20px;
    color: rgb(175,123,99);
    border: 1px solid rgb(100,100,99);
    border-radius: 5px;
}
.c3 > img:nth-child(1) {
    margin-top: 10px;
}
.c3 > img:nth-child(2) {
    margin-top: 30px;
    border-radius: 10px;
}
.c3 > img:nth-child(3), .c3 > img:nth-child(4) {
    margin-top: 20px;
    border-radius: 10px;
}
.c3 > img:nth-child(4) {
    margin-bottom: 50px;
}
.c1_1_1 > img, .c1_1_1_1 > img, .c1_3_img, .c2_c_3_buy, .c2_more, .c3 > img:nth-child(n+2) {
    cursor: pointer;
}
</style>
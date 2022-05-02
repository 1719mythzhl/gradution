<template>
  <div id='out' v-loading="loading">
      <div class="back ishover" @click='back'>
        <i class="el-icon-d-arrow-left"></i>
        返回
      </div>
      <div class="content">
        <div class="c1">
          <div class="c1_l">
            <el-carousel :interval="5000" height="400px">
              <el-carousel-item v-for="item in classMsg.img_swiper" :key="item">
                <img class='c1_swiper' :src="item" alt="">
              </el-carousel-item>
            </el-carousel>

          </div>
          <div class="c1_r">
            <div class="c1_title">
              {{classMsg.c_name}}
            </div>
            <div class="c1_dis"> 
              {{classMsg.c_description}}
            </div>
            <div class="c1_cont">
              <div class="c1_cont1">
                <p>价格：</p>
                <p class="c1_c_price">
                  ￥{{classMsg.c_price}}
                </p>
                <p>
                  (含运费15元)
                </p>
              </div>
              <div class="c1_cont2">
                <div>促销：</div>
                <div class="c1_c2_r">
                  <div class="c1_c2_cont" v-for="item in classMsg.c_promotion" :key='item'>
                    <div class="c1_c2_tip">赠礼</div>
                    <div class="c1_c2_cont">
                      {{item}}
                    </div>
                    <div class="c1_c2_ri ishover" @click="detail">
                      详情>
                    </div>
                  </div>
                </div>
              </div>
              <div class="c1_cont3">
                <div>数量：</div>
                <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字" size="small "></el-input-number>
              </div>
            </div>
            <button class="btn1 ishover" @click="toShopCar">加入购物车</button>
            <button class="btn2 ishover">立即购买</button>
          </div>
        </div>
      </div>
      <div class="msg">
        <div class="shopDetail">
          <div class="tit">
            商品详情
          </div>
          <div class="s_des">
            <div class="s_des1">
              <div class="s_des1_l">
                适用年龄: 
              </div>
              <div class="s_des1_r">
                {{classMsg.age}}
              </div>
            </div>
            <div class="s_des1" v-if="classMsg.pro_content != null">
              <div class="s_des1_l">
                商品构成物: 
              </div>
              <div class="s_des1_r">
                {{classMsg.pro_content}}
              </div>
            </div>
          </div>
          <div class="s_cont">
            <div class="s_c_img" v-for="item in classMsg.img_content" :key="item">
              <img :src="item" alt="">
            </div>
          </div>
        </div>
        <div class="hot">
          <div class="tit">
            热销推荐
          </div>
          <div class="c2_class">
            <div class='c2_item ishover' v-for='(val, index) in classHotMsg' :key='index' @click='toClass(val.id)'>
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
                      <div class="c2_c_3_buy">购买</div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
    name: 'detail',
    data() {
      return {
        classMsg: {}, //本课程信息
        classHotMsg: [], //热门课程信息
        imgUrl: '/static/images/classList',
        num: 1,
        loading: false
      }
    },
    computed: {
      ...mapGetters(["shopCar"])
    },
    // watch: {
    //   $route(to, from) {
    //     location.reload()
    //   }
    // },
    
    beforeRouteUpdate(to,from,next){
      // console.log(to)
      this.id = to.query.id;
      next();
      this.getClassMsg()
      this.getHotClassMsg()
      this.num = 1
  },

    methods: {
      back() {
        this.$router.push({
          path: '/shopList'
        })
      },
      //获取课程信息
      getClassMsg() {
        this.loading = true
        this.$rq.get('/api/shop/nowClassMsg',{
          params: {
            id: this.$route.query.id
          }
        })
        .then(res => {
          this.classMsg = res.data[0]
          for(let i in this.classMsg.img_swiper){    
              this.classMsg.img_swiper[i] = this.imgUrl + this.classMsg.img_swiper[i]
          }
          for(let i in this.classMsg.img_content) {
              this.classMsg.img_content[i] = this.imgUrl + this.classMsg.img_content[i]
          }
          console.log(this.classMsg)
          this.loading = false
        })
      },
      //获取热门课程信息
      getHotClassMsg() {
        this.loading = true
        this.$rq.get('/api/shop/hotClass')
            .then(res => {
              
                this.classHotMsg = res.data
                // console.log(this.classHotMsg)
                this.classHotMsg.forEach(element => {
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
              this.loading = false
                this.$message.error(err)
            })
      },
      //修改数量
      handleChange(num) {
        // console.log(num)
      },
      //点击跳转热门课程
      toClass(id) {
        this.$router.push({
                path: '/shopList/detail',
                query: {
                    id: id
                }
            })
      },
      //加入购物车
      toShopCar() {
        if(!sessionStorage.getItem('token')) {
          this.$alert('还未登录，请先登录', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.$router.push({
                path: '/login'
              })
            }
          })
        } else {
            let data = {
              name: this.classMsg.c_name,
              price: this.classMsg.c_price,
              num: this.num
            }
              for(let i of this.shopCar) {
                if(i.name == data.name) {
                  i.num += data.num
                  return 
                }
              }
            this.$store.commit("SET_SHOPCAR", data)
            this.$message.success('已添加至购物车')
        }
      },
      //详情
      detail() {
        this.$alert(this.classMsg.c_promotion[0] + '    ' + this.classMsg.c_promotion_content[0],'-优惠详情-')
      }
    },
    async mounted() {
      this.$router.afterEach((to, from, next) => {
        window.scrollTo(0, 0)
      })
      await this.getClassMsg()
      await this.getHotClassMsg()
    }
}
</script>

<style scoped>
#out{
  width: 100%;
  overflow: hidden;
}
.back {
  margin: 10px 20px;
  font-size: 14px;
}
.back:hover {
  color: blue;
}
.content {
  width: 65%;
  margin: 0 auto;
}
.c1 {
  display: flex;
  justify-content: center;
}
.c1_swiper {
  max-width: 100%;
  height: auto;
}
.c1_l {
  width: 40%;
}
.c1_r {
  width: 55%;
  margin-left: 5%;
}
.c1_cont1, .c1_cont2, .c1_cont3 {
  display: flex;
  margin: 15px 0;
} 
.c1_cont {
  background-color: hsl(347, 100%, 95%);
  padding: 15px;
  border-radius: 5px;
}
.c1_c2_cont {
  display: flex;
}
.c1_title {
  font-size: 20px;
  font-weight: 700;
}
.c1_dis {
  color: rgb(127,147,193);
  margin: 10px 0;
}
.c1_c_price {
  color: red;
  font-size: 20px;
  line-height: 20px;
  font-weight: 700;
  margin-right: 10px;
}
.c1_c2_tip {
  background-color: rgb(246, 174, 180);
  padding: 0px 5px;
  font-size: 14px;
  border-radius: 2px;
  margin-right: 5px;
}
.c1_c2_ri {
  font-size: 14px;
  color: rgb(144, 161, 186);
  margin-left: 20px;
}
.c1_c2_cont {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.btn1, .btn2 {
  width: 40%;
  height: 50px;
  border: none;
  margin: 4% 2%;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 700;
}
.btn1 {
  background-color: rgb(254,225,0);
}
.btn2 {
  color: white;
  background-color: rgb(230,0,18);
}

.msg {
  display: flex;
  width: 65%;
  margin: 20px auto;
}
.shopDetail {
  width: 75%;
  margin-right: 3%;
}
.hot {
  width: 22%;
}
.tit {
  padding: 15px 20px;
  font-size: 18px;
  font-weight: 700;
  background-color: rgb(253,250,229);
}
.s_des {
  padding: 20px 10px;
}
.s_des1 {
  display: flex;
  margin-bottom: 15px;
}
.s_des1_l {
  width: 30%;
}
.s_des1_r {
  width: 70%
}
.s_c_img > img {
  width:auto;
  height:100%;
  max-width:100%;
  max-height:100%;
  display:block
}
.c2_class {
    display: flex;
    border-radius: 10px;
    flex-direction: column;
}
.c2_item {
    margin: 1%;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid rgb(254, 243, 235);
    margin-top: 20px;
}
.c2_item:hover {
  box-shadow: 0 1px 1px 1px grey;
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
    background-color: rgb(254,225,0);
    padding: 0px 10px;
    font-size: 12px;
    line-height: 24px;
    border-radius: 7px;
}
.c2_c_2, .c2_c_3 {
    margin-top: 5px;
}
.c2_c_3_buy:hover {
  background-color: rgb(255,0,0);
  color: white
}
</style>
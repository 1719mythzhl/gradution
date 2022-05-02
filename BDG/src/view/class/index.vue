<template>
  <div class="out">
      <div class="title">
          <div class="t1">
              <div class="t1_1">
                  <div class="t1_1_title backYellow">
                      兴趣
                  </div>
                  <div class="t1_1_c1 ishover" @click="changeInterest(); stylInterest()" :class="{'active': activeI==-1}">
                      全部
                  </div>
                  <div v-for='(val, index) in interestList' :key='val.id' class="t1_1_c2 ishover" @click="changeInterest(val); stylInterest(index)" :class="{'active': activeI==index}">
                    {{val.class}}  
                  </div>
              </div>
              <div class="t1_1">
                  <div class="t1_1_title backYellow">
                      价格
                  </div>
                  <div class="t1_1_c1 ishover" @click="changePrice(); stylPrice()" :class="{'active': activeP==-1}">
                      全部
                  </div>
                  <div v-for='(val, index) in priceList' :key='val.id' class="t1_1_c2 ishover" @click="changePrice(val); stylPrice(index)" :class="{'active': activeP==index}">
                    {{val.price}}  
                  </div>
              </div>
              <div class="t1_1">
                  <div class="t1_1_title backYellow">
                      年龄
                  </div>
                  <div class="t1_1_c1 ishover" @click="changeAge(); stylAge()" :class="{'active': activeA==-1}">
                      全部
                  </div>
                  <div v-for='(val, index) in ageList' :key='val.id' class="t1_1_c2 ishover" @click="changeAge(val); stylAge(index)" :class="{'active': activeA==index}">
                    {{val.age}}  
                  </div>
              </div>
          </div>
      </div>
      <div class="content">
            <div class="c2">
              <div class="c2_main">
                  <div class="c2_class"  v-loading="loading">
                      <div class='c2_item' v-for='(val, index) in nowClassMsg' :key='index'>
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
    name: 'shopList',
    data() {
        return {
            interestList: [],
            priceList: [],
            ageList: [],
            int_code: '',
            pri_code: '',
            age_code: '',
            activeI: -1,  //兴趣索引
            activeP: -1,  //价格索引
            activeA: -1,  //年龄索引
            classMsg: [],
            nowClassMsg: [], //当前索引下的课程列表
            loading: false,
            imgUrl: '/static/images/classList',
        }
    },
    beforeRouteEnter: (to, from, next) => {
        if(to.name === 'shopList') {
            console.log(to.query)
            if(to.query.interest_id >= 0) {
                next(vm => {
                    vm.activeA = -1
                    vm.age_code = ''
                    vm.activeI = to.query.interest_id
                    vm.int_code = to.query.interest_Ename
                    vm.getNowClassList()
                })
            } else if(to.query.age_id >= 0) {
                next(vm => {
                    vm.activeI = -1
                    vm.int_code = ''
                    vm.activeA = to.query.age_id
                    vm.age_code = to.query.age_Ename
                    vm.getNowClassList()
                })
            }
        }
        next()
    },
    methods: {
        //兴趣
        getInterestList() {
            this.$rq.get('/api/shop/interest')
            .then(res => {
                console.log(res.data)
                this.interestList = res.data
            })
        },
        changeInterest() {
            if(arguments.length != 0) {
                this.int_code = arguments[0].classEName
            } else {
               this.int_code = ''
            }
            // console.log(this.int_code)
            this.getNowClassList()
        },
        stylInterest() {
            if(arguments.length != 0) {
                this.activeI = arguments[0]
            } else {
                this.activeI = -1
            }
            // console.log(this.activeI)
        },
        //价格
        getPriceList() {
            this.$rq.get('/api/shop/price')
            .then(res => {
                this.priceList = res.data
            })
        },
        changePrice() {
            if(arguments.length != 0) {
                this.pri_code = arguments[0].priceEName
            } else {
               this.pri_code = ''
            }
            // console.log(this.pri_code)
            this.getNowClassList()
        },
        stylPrice() {
            if(arguments.length != 0) {
                this.activeP = arguments[0]
            } else {
                this.activeP = -1
            }
        },
        //年龄
        getAgeList() {
            this.$rq.get('/api/shop/age')
            .then(res => {
                this.ageList = res.data
                // console.log(res.data)
            })
        },
        changeAge() {
            if(arguments.length != 0) {
                this.age_code = arguments[0].ageEName
            } else {
               this.age_code = ''
            }
            // console.log(this.age_code)
            this.getNowClassList()
        },
        stylAge() {
            if(arguments.length != 0) {
                this.activeA = arguments[0]
            } else {
                this.activeA = -1
            }
        },
        //封装数据请求课程接口
        getClassList() {
            let data = {
                age_code: this.age_code,
                c_price_code: this.pri_code,
                interest_code: this.int_code
            }
            this.$rq.post('/api/shop/classList')
            .then(res => {
                this.loading = true
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
                this.nowClassMsg = this.classMsg
            })
            .catch(err => {
                this.$message.error(err)
            })
        },
        //当前索引下的课程列表
        getNowClassList() {
            this.nowClassMsg = []
            this.loading = true
            if(!this.int_code && this.pri_code && this.age_code) {
                // 兴趣null,价格年龄true
                for(let val of this.classMsg) {
                    if(val.c_price_code === this.pri_code && val.age_code === this.age_code) {
                        this.nowClassMsg.push(val)
                    }
                }
            }
            if(this.int_code && !this.pri_code && this.age_code) {
                // 价格null,兴趣年龄true
                for(let val of this.classMsg) {
                    if(val.interest_code === this.int_code && val.age_code === this.age_code) {
                        this.nowClassMsg.push(val)
                    }
                }
            }
            if(this.int_code && this.pri_code && !this.age_code) {
                // 年龄null,兴趣价格true
                for(let val of this.classMsg) {
                    if(val.interest_code === this.int_code && val.c_price_code === this.pri_code) {
                        this.nowClassMsg.push(val)
                    }
                }
            }
            if(!this.int_code && this.pri_code && !this.age_code) {
                // 兴趣年龄null,价格true
                for(let val of this.classMsg) {
                    if(val.c_price_code === this.pri_code) {
                        this.nowClassMsg.push(val)
                    }
                }
            }
            if(this.int_code && !this.pri_code && !this.age_code) {
                // 年龄价格null,兴趣true
                for(let val of this.classMsg) {
                    if(val.interest_code === this.int_code) {
                        this.nowClassMsg.push(val)
                    }
                }
            }
            if(!this.int_code && !this.pri_code && this.age_code) {
                // 兴趣价格null,年龄true
                for(let val of this.classMsg) {
                    if(val.age_code === this.age_code) {
                        this.nowClassMsg.push(val)
                    }
                }
            }
            if(!this.int_code && !this.pri_code && !this.age_code) {
                // 兴趣价格年龄null
                for(let val of this.classMsg) {
                    this.nowClassMsg = this.classMsg
                }
            }
            this.loading = false
        },
        toDetail(id) {
            this.$router.push({
                path: '/shopList/detail',
                query: {
                    id: id
                }
            })
        },
        //获取路径的参数
        getQuery() {
            console.log(this.activeI)
        }
    },
    // created() {
        
    // },
    async mounted() {
        // await this.getQuery()
        console.log('---')
        await this.getInterestList()
        await this.getPriceList()
        await this.getAgeList()
        
        await this.getClassList()
    },
}
</script>

<style scoped>
.out {
    width: 100%;
    overflow: hidden;
}
.title {
    padding: 30px 0;
    border-bottom: 1px solid rgb(230,230,230);
}
.t1 {
    width: 65%;
    margin: 0 auto;
}
.t1_1 {
    display: flex;
    justify-content: flex-start;
    font-size: 14px;
    margin-top: 20px;
}
.t1_1 > div:nth-child(n+2) {
    margin-left: 5%;
}
.t1_1 > div:nth-child(1) {
    padding: 3px 10px;
    border-radius: 5px;
}
.active {
    color: red
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
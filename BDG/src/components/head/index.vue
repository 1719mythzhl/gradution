<template>
 <div class='out'>
    <div class="content">
        <div class="c1">
            <img :src="logoUrl">
        </div>
        <div class="c2">
            <el-input type="text" size="small" v-model="inpVal" placeholder="请输入查询内容"></el-input>
        </div>
        <div class="c3">
            <el-button type='info' size='small' @click='Search'>
                <i class='el-icon-search' ></i>
            </el-button>
        </div>
        
        <div class="c5" @click="loginORrelogin">
                {{myname}}
        </div>
        <div class="c6" v-show='isShow'>
            <i class='el-icon-headset'></i>
            <div class="p1">在线客服</div>
        </div>
        <div class="c7" v-show='isShow' @click="toMyBill">
            <el-badge :value="buyNum" class="item">
                <i class='el-icon-document-checked'></i>
                <div class="p1">我的订单</div>
            </el-badge>
        </div>
        <div class="c4" v-show='isShow' @click='toShopCar'>
            <el-badge :value="shopNum" class="item">
                <i class='el-icon-shopping-cart-2'></i>
            </el-badge>
            
        </div>
    </div>
    <el-menu :default-active="this.$route.fullPath"  router mode="horizontal" class='menu'>
      <el-menu-item index="/main">
          <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/shopList">
          <span>课程专区</span>
      </el-menu-item>
    </el-menu>      

 </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: 'myHead',
    data() {
        return {
            logoUrl: require('@/assets/img/head/logo.png'),
            inpVal: '',
            // username: 'sdasdas',
            screenWidth: '', //屏幕宽度
            isShow: true,
            activeIndex: '/main',
        }
    },
    computed: {
        ...mapGetters(["name", "shopCar", "buyCar"]),
        myname: function() {
            return sessionStorage.getItem('name') ? sessionStorage.getItem('name') : '登录'
        },
        shopNum: function() {
            let num = 0
            for(let i of this.shopCar) {
                num += i.num
            }
            return num
        },
        buyNum: function() {
            let num = 0
            for(let i of this.buyCar) {
                num += i.num
            }
            return num
        }
    },
    watch: {

    },
    methods:{
        Search() {
            console.log(this.inpVal)
            this.$router.push({
                path: '/searchClass',
                query: {
                    inpVal: this.inpVal
                }
            })
        },
        toShopCar() {
            this.$router.push({
                path: '/shopCar'
            })
        },
        toMyBill() {
            this.$router.push({
                path: '/myBill'
            })
        },
        //监听页面大小变化
        screenSize() {
            this.screenWidth = document.body.clientWidth
            if(this.screenWidth < 1120) {
                this.isShow = false
            } else {
                this.isShow = true
            }
        },
        loginORrelogin() {
            console.log(this.name)
            if(this.name != '') {
                this.$confirm('是否退出当前用户', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.commit("SET_TOKEN", '');
                    this.$store.commit("SET_NAME", '');
                    this.$store.commit("CLEAR_ALLCAR");
                    sessionStorage.setItem('token', '')
                    sessionStorage.setItem('name', '')
                    this.$router.push({
                        path: '/login'
                    })
                    this.$message({
                        type: 'success',
                        message: '退出成功!'
                    });
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });          
                });
            } else {
                this.$router.push({
                    path: '/login'
                })
            }
        }
    },
    mounted() {
        this.screenSize()
        window.onresize = () => {
            this.screenSize()
        }
    }
}
</script>

<style scoped>
    .out {
        width: 100%;
        margin: 0;
        padding: 0;
        background-color: rgb(255,225,0);
    }
    /* #content:before {
        clear: both
    }; */
    .content {
        overflow: hidden;
    }
    .c1,.c2,.c3{
        float: left;
    }
    .c1 {
        margin-left: 20px;
        width: 20%;
        /* height: 50%; */
    }
    .c2 {
        width: 40%;
        margin-top: 20px;
        /* maxlength: 200px; */
    }
    .c3 {
        margin-top: 20px;
    }
    .c4 {
        float: right;
        margin-top: 22px;
        margin-right: 2%;
        font-size: 120%;
    }
    .c5, .c6, .c7 {
        float: right;
        margin-top: 24px;
        margin-right: 1%;
    }
    .c5 {
        margin-top: 20px;
        font-size: 110%;
        /* border: 1px solid black; */
        background-color: white;
        border-radius: 5px;
        padding: 5px;
        /* margin-top: 25px; */
    }
    .c1:hover, .c4:hover,.c5:hover, .c6:hover, .c7:hover {
        cursor:pointer
    }
    .el-icon-document-checked, .p1, .el-icon-headset {
        display: inline-block;
        font-size: 110%;
    }
    .el-item {
        display: flex;

    }
</style>

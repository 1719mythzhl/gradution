<template>
  <div class="out">
    <div class="form">
        <el-table
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
            align="center"
            label="全选"
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="name"
            label="商品名称">
        </el-table-column>
        <el-table-column
            prop="price"
            label="销售价">
        </el-table-column>
        <el-table-column
            prop="num"
            label="数量">
            <template slot-scope="scope">
                <div class="num-warp">
                    <input type="number" min="1" class="border num_l" @input="cartGoodsAmountChange($event,scope.row)" v-model="scope.row.num"/>
                    <!-- <div class="num_r">
                        <i class="border el-icon-arrow-up" @click="addAmountCount(scope.row)"></i>
                        <i class="border el-icon-arrow-down" @click="subtractAmountCount(scope.row)"></i>
                    </div> -->
                </div>
            </template>
        </el-table-column>
        <el-table-column
            label="操作">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
            </template>
        </el-table-column>
        </el-table>
    </div>
    <div class="all">
        <div class="a_l">
            <button class="a_btn ishover" @click="deleteAll" v-show=isActive>删除</button>
            <p class="a_l1">删除选中的商品</p>
        </div>
        <div class="a_r">
            <div class="a_r1">
                已选中{{shopNum}}件商品
            </div>
            <div class="a_r2">
                总价:
            </div>
            <div class="a_r3">
                ￥{{shopPrice}}
            </div>
            <button class="a_btn ishover" @click="toPay">
                支付
            </button>
        </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    data() {
        return {
            tableData:[],
            shopNum: 0, //商品件数
            shopPrice: 0, //商品总价
            selectShop: []
        }
    },
    computed: {
      ...mapGetters(["shopCar", "buyCar"]),
      isActive: function() {
          return this.selectShop.length == 0 ? false : true
      }
    },
    methods: {
        searchShopCar() {
            // console.log(this.shopCar)
            this.tableData = this.shopCar.map(function(item) {
                return item
            })
            // console.log(this.shopCar)
        },
        handleClick(val) {
            // console.log(val)
            this.$confirm("是否要移除该商品","提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                for(let i in this.shopCar) {
                    if(val.name === this.shopCar[i].name) {
                        this.shopCar.splice(i, 1)
                        this.searchShopCar()
                        this.$message.success('删除成功')
                        return
                    }
                }
                
            }).catch(() => {
                this.$message.info('取消删除')
            })
        },
        cartGoodsAmountChange(event, row) {
            for(let i of this.shopCar) {
                if(i.name == row.name) {
                    i.num  = parseInt(row.num)
                    return
                }
            }
        },
        addAmountCount(row) {
            row.num += 1
        },
        subtractAmountCount(row) {
            row.num -= 1
        },
        //全选
        handleSelectionChange(row) {
            // console.log(row)
            if(this.selectShop.length > row.length) {
                while(this.selectShop.length > row.length) {
                    for(let i in this.selectShop) {
                        if(row.indexOf(this.selectShop[i]) == -1) {
                            this.shopNum -= this.selectShop[i].num
                            this.shopPrice -= (this.selectShop[i].num * this.selectShop[i].price)
                            this.selectShop.splice(i, 1)
                        }
                    }
                }
                
            } else if(this.selectShop.length < row.length) {
                for(let i in row) {
                    if(this.selectShop.indexOf(row[i]) == -1) {
                        this.selectShop.push(row[i])
                        this.shopNum += row[i].num
                        this.shopPrice += (row[i].price * row[i].num)
                    }
                }
            }
            this.selectShop = row
        },
        //删除全部课程
        deleteAll() {
            if(this.selectShop.length == 0) {
                // this.$alert('assasd')
                return
            }
            this.$confirm('是否从购物车中删除当前选中商品?', '提示', {
                confirmButtonText: '确定',
                cancelAnimationFrame: '取消'
            }).then(() => {
                // this.shopCar.pop()
                // console.log(this.shopCar)
                // console.log(this.selectShop)
                
                this.selectShop.forEach(item => {
                    for(let i in this.shopCar) {
                        if(item.name == this.shopCar[i].name) {
                            this.shopCar.splice(i, 1)
                        }
                    }
                })
                this.searchShopCar()
                this.$message.success('删除成功')
            }).catch(() => {
                this.$message.info('已取消删除')
            })
            
        },
        //支付
        toPay() {
            if(this.selectShop.length == 0) {
                this.$alert('还未选中购买商品')
                return
            }
            this.$confirm('是否购买所有选中商品?', '提示', {
                confirmButtonText: '确定',
                cancelAnimationFrame: '取消'
            }).then(() => {
                this.selectShop.forEach(item => {
                    for(let i in this.shopCar) {
                        if(item.name == this.shopCar[i].name) {
                            this.shopCar.splice(i, 1)
                        }
                    }
                    this.$store.commit('SET_BUYCAR', item)
                })
                this.searchShopCar()
                this.$message.success('购买成功!')
            }).catch(() => {
                this.$message.info('已取消购买')
            })
        }
    },
    mounted() {
        this.searchShopCar()
    }
}
</script>

<style scoped>
.out {
  width: 100%;
  overflow: hidden;
}
.form {
    width: 65%;
    margin: 0 auto;
}
.el-table {
    margin: 50px 0;
}
.all{
    width: 60%;
    margin: 50px auto;
}
.num-warp {
    display: flex;
}
.border {
    border: 1px solid grey;
    border-radius: 3px;
}
.num_l {
    width: 30%;
    height: 30px;
    padding-left: 10px;
}
.num_r {
    width: 10%;
    display: flex;
    flex-direction: column ;
}
.el-icon-arrow-up, .el-icon-arrow-down {
    text-align: center;
}
.all {
    width: 80%;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    padding: 30px 20px;
    border-radius: 5px;
    background-color: rgb(238,238,238);
}
.a_l, .a_r {
    display: flex;
}
.a_btn {
    border: none;
    width: 100px;
    height: 30px;
    background-color: red;
    color: white;
    border-radius: 5px;
}
.a_btn:hover {
    background-color: rgb(252, 118, 118);
}
.a_l1 {
    color: grey;
    line-height: 30px;
    font-size: 14px;
    margin-left: 10px;
}
.a_r1, .a_r2, .a_r3 {
    color: grey;
    line-height: 30px;
    font-size: 18px;
}
.a_r1, .a_r3 {
    margin-right: 20px;
}
.a_r3 {
    font-size: 22px;
    color: red;
}
</style>
<template>
  <div class="out">
      <div class="form">
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="name"
                label="商品名称">
            </el-table-column>
            <el-table-column
                prop="price"
                label="单价">
            </el-table-column>
            <el-table-column
                prop="allPrice"
                label="总金额">
            </el-table-column>
            <el-table-column
                prop="num"
                label="数量">
            </el-table-column>
        </el-table>
      </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    data() {
        return {
            tableData: []
        }
    },
    computed: {
        ...mapGetters(["buyCar"])
    },
    methods: {
        getBuyCar() {
            // console.log(this.buyCar)
            for(let i of this.buyCar) {
                let data = {
                    name: i.name,
                    num: i.num,
                    price: i.price,
                    allPrice: i.price * i.num
                }
                this.tableData.push(data)
            }
        }
    },
    mounted() {
        this.getBuyCar()
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
</style>
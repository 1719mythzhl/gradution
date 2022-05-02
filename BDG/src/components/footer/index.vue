<template>
    <div class="out">
        <div class="footer1">
            <div class="f1_l">
                <div class="f1_l_1">
                    <div class="img">
                        <img src="@/assets/img/footer/code1.png" style="borderRadius:10px" alt="">
                    </div>
                    <span class="name">官方微信订阅号</span>
                </div>
                <div class="f1_l_2">
                    <div class="img">
                        <img src="@/assets/img/footer/code2.png" style="borderRadius:10px" alt="">
                    </div>
                    <span class="name">官方微信服务号</span>
                </div>
            </div>
            <div class="f1_r">
                <div class="f1_r_1">在线客服</div>
                <div class="f1_r_2">
                    <img src="@/assets/img/footer/consult.png" alt="">
                </div>
                <div class="f1_r_3">
                    <p>电话客服</p>
                    <el-tree :data="treeData" style="backgroundColor:#9e948f"></el-tree>
                    </div>
                <div class="f1_r_4">客服服务时间:周一至周五9:00-18:00</div>
            </div>
        </div>
        <div class="footer2">
            客服服务时间：周一至周五9:00~18:00（节假日除外）未开通800、400地区，请拨打：021-61611122
        </div>
        <div class="footer3">
            <div class="f3_T">
                <!-- <div class="f3_T_cont"> -->
                    <p class="f3_T_C1">经销商倍乐生</p>
                    <p class="f3_T_C1">商家合作</p>
                    <p class="f3_T_C1">区域合作及集体采购</p>
                    <p class="f3_T_C1">正版盗版</p>
                    <p class="f3_T_C1">联系我们</p>
                    <p class="f3_T_C2">用户需知</p>
                <!-- </div> -->
            </div>
            <div class="f3_B">
                <p class="f3_B_c">营业执照</p>
                <p class="f3_B_c">出版物经营许可证 </p>
                <p class="f3_B_c"> 沪公网安备 31010402002441号</p>
            </div>
        </div>
        <div class="footer4">
            <img src="@/assets/img/footer/logo.png" alt="">
            <div class="f4_r">
                <div class="f4_r1">乐智小天地and巧虎are registered trademarks of Benesse Corporation.</div>
                <div class="f4_r1">Copyright ©Benesse Corporation/巧虎</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'myFooter',
    data() {
        return {
            treeData: [{
                label: '更多',
                children: [{
                    label: '[免费] 800-820-5099',
                },{
                    label: '[付费] 400-820-5099',
                },{
                    label: '[付费] 021-61611122'
                }]
            }]
        }
    }
}
</script>

<style scoped>
.out {
    width: 100%;
    background-color: white;
}
.footer1 {
    background-color: #9e948f;
    /* border: 1px solid black; */
    /* margin: 0 auto; */
    display: flex;
    justify-content: center;
    padding: 40px 0;
}
.footer2 {
    text-align: center;
    width: 100%;
    background-color: #7c726b;
    padding: 15px 0;
    color: #fff;
    font-size: 12px;
}
.f1_l {
    display: flex;
    padding-right: 34px;  
}
.f1_r {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    padding-left: 50px;
    border-left: 1px solid #b1a9a5;
}
.f1_l_1, .f1_l_2 {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
}
.name {
    text-align: center;
    font-size: 12px;
    padding-top: 6px;
    color: white;
}
.f1_r_1, .f1_r_3 {
    font-weight: 700;
    color: white;
}
.f1_r_4 {
    color: white;
}
.f1_r_2:hover, .f3_T_C1, .f3_T_C2, .f3_B_c {
    cursor:pointer
}
.footer3 {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 12px 0;
    background-color: #efefef;
    font-size: 12px;
    color: #333;
}
.f3_T, .f3_B{
    display: flex;
    justify-content: center;
    flex-direction: row;
}
.f3_T_C1, .f3_T_C2 {
    margin: 10px 0;
    border-right: 1px solid #b8b8b8;
    padding: 0 35px;
}
.f3_T_C2 {
    border: none;
}
.f3_B_c {
    padding: 0 20px;
}
.footer4 {
    width: 100%;
    padding: 10px 20px;
    display: flex;
    justify-content: center;
}
.f4_r1 {
    font-size: 12px;
    margin-left: 40px;
} 
</style>
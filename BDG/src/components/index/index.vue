<template>
    <div class='app'>
        <myHead></myHead>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        
        <myFooter></myFooter>
        <el-backtop target=".app" :bottom="100"><i class='el-icon-platform-eleme'></i></el-backtop>   
    </div>
</template>

<script>
import myHead from '@/components/head/index.vue'
import myFooter from '@/components/footer/index.vue'
export default {
    components: {
        myHead,
        myFooter
    }
}
</script>

<style scoped>
.app {
    width: 100%;
    /* height: 100vh; */
    overflow: hidden;
}
</style>
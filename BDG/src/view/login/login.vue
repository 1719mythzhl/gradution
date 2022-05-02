<template>
  <div class="out">
      <div class="title">
        <img src="@/assets/img/login/qiaohu_logo.png" alt="">
        <div class="t_r ishover" @click="toIndex">
          商城首页
        </div>
      </div>
      <div class="content">
        <div class="c1">
          <div class="select">
            <div class="menu ishover" :class="{'isActive':activeIndex == 1}" @click="handleSelect(1)">
              登录
            </div>
            <div class="menu ishover" :class="{'isActive':activeIndex == 2}" @click="handleSelect(2)">
              注册
            </div>
          </div>  
          <div class="login" v-if="this.activeIndex == 1">
            <el-form ref="form1" :rules="rules1" :model="form1" label-width="80px">
              <el-form-item label="用户名" prop="username">
                <el-input size="small" placeholder="请输入用户名" v-model="form1.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="userpwd">
                <el-input size="small" placeholder="请输入密码" v-model="form1.userpwd" type="password"></el-input>
              </el-form-item>
            </el-form>
            <button class='btn ishover' @click="login">登录</button>
          </div>
          <div class="login" v-else>
            <el-form ref="form2" :rules="rules2" :model="form2" label-width="80px">
              <el-form-item label="用户名" prop="username">
                <el-input size="small" placeholder="请输入用户名" v-model="form2.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="userpwd">
                <el-input size="small" placeholder="请输入密码" v-model="form2.userpwd" type="password"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="reuserpwd">
                <el-input size="small" placeholder="请再次输入确认密码" v-model="form2.reuserpwd" type="password"></el-input>
              </el-form-item>
              <el-button class='btn ishover' @click="register">注册</el-button>
            </el-form>
          </div>   
        </div>
        
      </div>
  </div>
</template>

<script>
import qs from 'qs'
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      form1: {
        username: '',
        userpwd: '',
      },
      form2: {
        username: '',
        userpwd: '',
        reuserpwd: '',
      },
      activeIndex: 1,
      isShow: false,
      rules1: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'change' },
          ],
          userpwd: [
            { required: true, message: '请输入密码', trigger: 'change' },
          ]
      },
      rules2: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'change' },
          ],
          userpwd: [
            { required: true, message: '请输入密码', trigger: 'change' },
          ],
          reuserpwd: [
            { required: true, message: '请确认密码', trigger: 'change' },
            { required: true, trigger: 'change', validator: (rule, value, callback) => {
              if(value != this.form2.userpwd) {
                callback(new Error('请确认密码输入一致'))
              }
              callback()
            }}
          ]
      }
    }
  },
  
  computed: {
    ...mapGetters(["token", "name"]),
  },

  methods: {
    toIndex() {
      this.$router.push({
        path: '/main'
      })
    },
    //选择登录注册
    handleSelect(val) {
      this.activeIndex = val
    },
    //登录
    login() {
      this.$refs.form1.validate((valid) => {
        if(valid) {
          let params = {
            username: this.form1.username,
            password: this.form1.userpwd
          }
          this.$rq({
            url: '/api/login',
            method: 'post',
            data: qs.stringify(params)
          }).then(res => {
            if(res.data.code == 0) {
              //存储token
              this.$store.commit("SET_TOKEN", res.data.token);
              this.$store.commit("SET_NAME", res.data.name);
              sessionStorage.setItem('token', res.data.token)
              sessionStorage.setItem('name', res.data.name)
              this.$message.success(res.data.message)
              this.form1.username = ''
              this.form1.userpwd = ''
              this.toIndex()
              this.$message.success(res.data.message)
            } else if(res.data.code == 1) {
              this.$message.error(res.data.message)
            }
          })
        } else {
          return false
        }
      })
      
    },
    //注册
    register() {
      // console.log(this.form2, this.activeIndex)
      this.$refs.form2.validate((valid) => {
        if(valid) {
          let params = {
            username: this.form2.username,
            password: this.form2.userpwd
          }
          this.$rq({
            url: '/api/regist',
            method: 'post',
            data: qs.stringify(params)
          })
          .then(res => {
            if(res.data.code == 0) {
              this.$message.success(res.data.message)
              this.activeIndex = 1
              this.form2.username = ''
              this.form2.userpwd = ''
              this.form2.reuserpwd = ''
            } else {
              this.$message.warning(res.data.message)
            }
            
          })
        } else {
          return false
        }
      })
    },
    //确认密码
    repwd() {
      if(this.reuserpwd != this.userpwd) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
.out {
  width: 100%;
  overflow: hidden;
}
.title {
  display: flex;
  justify-content: space-between;
}
.t_r {
  font-size: 20px;
  margin: 20px 50px;
}
.t_r:hover {
  color: red
}
.content {
  width: 100%;
  height: 680px;
  background-image: url("../../assets/img/login/bg.jpg");
  background-size: 100%;
  overflow: hidden;
}
.c1 {
  width: 40%;
  /* height: 300px; */
  border: 1px solid blue;
  border-radius: 10px;
  margin: 150px auto;
  background-color: rgb(246, 229, 229);
}
.el-menu-item {
  width: 50%;
  
}
.el-menu-item > span {
  margin: 0 auto;
}
.select {
  display: flex;
}
.menu {
  width: 50%;
  height: 50px;
  text-align: center;
  border-bottom: 1px solid grey;
  line-height: 50px;
}
.isActive {
  background-color: rgb(246, 201, 201);;
  border-radius: 10px 10px 0 0;
}
/* .l_inp {
  display: flex;
  justify-content: center;
  position: relative
}
.l_inp > div:nth-child(1) {
  width: 25%;
  padding: 10px 10px 0 0;
  position: absolute;
  left: 2%;
  line-height: 30px;
}
.l_inp > div:nth-child(2) {
  width: 60%;
  padding: 10px 0px;
} */
.login {
  padding: 30px 0 0 10px;
  font-size: 14px;
}
.btn {
  height: 40px;
  width: 35%;
  border: none;
  border-radius: 10px;
  background-color: rgb(243, 89, 89);
  color: white;
  margin: 20px 30%;
}
.btn:hover {
  background-color: rgb(246, 63, 63);
}
.rePwd{
  margin-left: 20%;
  font-size: 10px;
  color: red
}
.el-input {
  width: 70%;
}
</style>
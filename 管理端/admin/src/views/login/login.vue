<template>
  <div id="app">
    <div class="loginBox">
      <h1>电商管理系统登陆页面</h1>
      <div class="inputBox">
        <el-input
          v-model="ID"
          placeholder="请输入管理员账号"
          prefix-icon="el-icon-user"
        ></el-input>
        <el-input
          v-model="password"
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
          @keyup.enter.native="login"
          show-password
        ></el-input>
      </div>
      <div class="btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script src="./login.js">
// export default {
//   data() {
//     return {
//       ID: "",
//       password: "",
//     };
//   },
// };
</script>

<style src='./login.css' scoped>
</style>

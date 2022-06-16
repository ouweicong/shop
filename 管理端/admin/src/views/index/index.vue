<template>
  <div id="app">
    <div class="top">
      <p class="title">电商后台管理系统</p>
      <div class="exitBtn" @click="exit">
        <i class="el-icon-switch-button"></i>
      </div>
    </div>
    <div class="bottom">
      <div class="left">
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span slot="title">用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="push('')"
                >普通用户</el-menu-item
              >
              <el-menu-item index="1-2" @click="push('adminUser')"
                >管理员</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="push('shop')"
                >店铺</el-menu-item
              >
              <el-menu-item index="2-2" @click="push('goods')"
                >商品</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1" @click="push('orders')"
                >订单</el-menu-item
              >
              <el-menu-item index="3-2" @click="push('analyse')"
                >月度分析</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-platform"></i>
              <span slot="title">广告中心</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1" @click="push('advertising')"
                >广告管理</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="right">
        <el-radio-group v-model="isCollapse">
          <el-radio-button :label="false" v-show="isCollapse"
            ><i class="el-icon-d-arrow-right"></i
          ></el-radio-button>
          <el-radio-button :label="true" v-show="!isCollapse"
            ><i class="el-icon-d-arrow-left"></i
          ></el-radio-button>
        </el-radio-group>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script src='./index.js'>
</script>

<style src='./index.css' scoped>
</style>
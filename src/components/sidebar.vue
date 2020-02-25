<template>
  <div id="aside">
    <div class="kongbai"></div>
    <div class="logo">
      <el-image :src="img" fit="fit">
      </el-image>
      <span>房企管理系统</span>
    </div>
    <div class="kongbai"></div>
    <el-menu router :default-active="$route.path" unique-opened>
      <el-submenu v-for="(child, index) in currentNavItems"  :key="index" :index="index+''">
        <template slot="title"><i :class="child.icon"></i>{{child.title}}</template>
          <el-menu-item-group v-for="(item,index) in child.subs" :key="index">
              <el-menu-item :index="item.index">{{item.title}}</el-menu-item>
          </el-menu-item-group>
      </el-submenu>
     </el-menu>
  </div>
</template>

<script>
import Ivy from '../assets/JL.png'
export default {
  name: 'v-sidebar',
  data () {
    return {
      currentNavItems: [],
      img: Ivy
    }
  },
  methods: {
  },
  created () {
    // 从sessionStorage得到menuData
    this.currentNavItems = JSON.parse(sessionStorage.getItem('menuData'))
  }
}
</script>

<style scoped>
.el-menu{
    border-right: solid 0px;
  }

.kongbai{
    height: 20px;
    width: 100%;
    background: white;
  }
.logo {
    font-family: '\5FAE\8F6F\96C5\9ED1   Bold', '\5FAE\8F6F\96C5\9ED1   Regular', '\5FAE\8F6F\96C5\9ED1';
    font-style: normal;
    font-size: 18px;
    color: #999999;
    line-height: 40px;
    background: white;
  }
.el-image{
    width: 56px;
    height: 36px;
    margin-left:10px;
  }
.logo span {
    display: inline-block;
    margin-left: 9px;
    line-height: 40px;
    position: relative;
    top: -10px;
    font-weight: 700;
}
</style>

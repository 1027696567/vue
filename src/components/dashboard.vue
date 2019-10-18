<template>
    <div class="main">
      <el-container style="height: 850px; border: 1px solid #eee">
        <el-aside style="width: 201px; border-right: 1px #eee solid;">
          <sidebar></sidebar>
        </el-aside>
        <el-container>
          <el-header>
          <navbar></navbar>
          </el-header>
          <router-view/>
        </el-container>
      </el-container>
    </div>
</template>

<script>
import Sidebar from './sidebar'
import Navbar from './Navbar'
export default {
  name: 'dashboard',
  components: {Sidebar, Navbar},
  data () {
    return {
      user: ''
    }
  }
}
</script>

<style scoped>
  .el-header{
    background-color: white;
    color: #333;
    line-height: 60px;
    overflow: hidden;
    border-bottom: 2px #eee solid;
  }
</style>

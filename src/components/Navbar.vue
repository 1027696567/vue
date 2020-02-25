<template>
    <div class="outPatientName">
      <span>房地产企业管理系统</span>
        <div class="block">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link-one">
              <div class="avatar">
                <el-avatar src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" size=small></el-avatar>
              </div>
              {{ user }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">修改密码</el-dropdown-item>
              <el-dropdown-item command="b">基本信息</el-dropdown-item>
              <el-dropdown-item command="c">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="20%"
          >
            <span>确认要退出系统！</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="logout">确 定</el-button>
            </span>
          </el-dialog>
        </div>
    </div>
</template>

<script>
import * as types from '../store/mutations_type'
export default {
  name: 'v-navbar',
  data () {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      user: '',
      dialogVisible: false
    }
  },
  methods: {
    handleCommand (command) {
      if (command === 'c') {
        this.$confirm('确认退出？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.logout()
          this.$message({
            type: 'success',
            message: '退出成功'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消退出'
          })
        })
      }
    },
    // 退出是清空sessionStorage信息
    logout () {
      this.$store.commit(types.LOGOUT)
      sessionStorage.removeItem('routes')
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('menuData')
      sessionStorage.removeItem('itemId')
      sessionStorage.removeItem('costItemNumber')
      this.$router.push('/login')
    }
  },
  created () {
    this.user = sessionStorage.getItem('user')
  }
}
</script>

<style>
.outPatientName{
  width: auto;
  height: auto;
  font-size: 29px;
  color: black;
}
.outPatientName .block{
  width: 25%;
  height: 60px;
  min-width: 410px;
  float: right;
  position: relative;
  overflow: hidden;
}
.outPatientName .el-autocomplete{
  float: left;
  height: 60px;
  width: 200px;
  position: relative;
  margin-top: -6px;
}
.outPatientName .el-dropdown{
  width: auto;
  height: 60px;
  float: right;
  padding-right: 20px;
  padding-left: 20px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
}
.outPatientName .el-dropdown-link-one {
  height: 60px;
  position: relative;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  cursor: pointer;
  color: #409EFF;
  }
.outPatientName .el-dropdown-link-two{
  padding-left: 10px;
  vertical-align: middle;
  float: left;
  height: 50px;
  width: 50px;
  position: relative;
  cursor: pointer;
}
.outPatientName .el-icon-arrow-down {
  font-size: 12px;
}
.outPatientName .avatar{
  height: 60px;
  width: auto;
  float: left;
  padding: 8px 5px 10px 5px;
  box-sizing:border-box;
}
.outPatientName .el-autocomplete-suggestion{
  width: 400px!important;
}
</style>

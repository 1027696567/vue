<template>
  <div class="addMessage">
    <!-- 发布信息弹框 -->
    <el-dialog title="发布信息" :visible.sync="dialogVisible" width="1000px" :before-close="closeDiv">
      <h1 style="-webkit-margin-before: 0px;">发布信息</h1>
      <el-form label-position="right" ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="发布人名称：" prop="publishUsername" style="width:300px">
              <el-input v-model="form.publishUsername" readOnly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发布人职位：" prop="roles" style="width:300px">
              <el-input v-model="form.roles" readOnly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发布时间：" prop="publishTime" style="width:300px">
              <el-date-picker v-model="form.publishTime" type="datetime" placeholder="请选择时间" default-time="12:00:00" style="width:205px" readOnly>
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="发布人单位：" prop="companyName" style="width:619.5px">
              <el-input v-model="form.companyName" readOnly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="发布内容：" prop="publishContent" style="width:939px">
              <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="请输入发布信息" resize=none v-model="form.publishContent"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
       <h1 style="-webkit-margin-before: 0px;">回复信息</h1>
        <el-row>
          <el-col :span="8">
            <el-form-item label="回复人名称：" prop="replyUsername" style="width:300px">
              <el-input v-model="form.replyUsername" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="回复人职位：" prop="reply_roles" style="width:300px">
              <el-input v-model="form.reply_roles" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="回复时间：" prop="replyTime" style="width:300px">
              <el-date-picker v-model="form.replyTime" type="datetime" placeholder="请选择时间" default-time="12:00:00" style="width:205px" disabled>
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="回复人单位：" prop="reply_companyName" style="width:619.5px">
              <el-input v-model="form.reply_companyName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="回复内容：" prop="replyContent" style="width:939px">
              <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="请输入回复信息" resize=none v-model="form.replyContent" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item style="margin:20px 0 0 300px">
          <el-button type="primary" @click="onSubmit('form')">确认</el-button>
          <el-button @click="resetForm('form')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { insertNoticeInfo, selectNoticeForm } from '../../api/menu1/api'
export default {
  data () {
    return {
      dialogVisible: false,
      form: {
        publishContent: ''
      }
    }
  },
  methods: {
    async init () {
      const username = sessionStorage.getItem('user')
      const data = await selectNoticeForm({username: username})
      this.form.roles = data.data.roles.join()
      this.form.companyName = data.data.companyName
      this.form.publishUsername = username
      this.form.publishTime = new Date()
      this.dialogVisible = true
    },
    async onSubmit (form) {
      await insertNoticeInfo(this.form)
      this.dialogVisible = false
      this.$refs[form].resetFields()
      this.$message.success('发布成功')
      this.parent()
    },
    closeDiv (done) {
      this.$refs['form'].resetFields()
      done()
    },
    resetForm (form) {
      this.$refs[form].resetFields()
      this.dialogVisible = false
    },
    parent () {
      this.$parent.selectAllNoticeInfo()
    }
  },
  created () {
  }
}
</script>
<style>
.addMessage .el-form-item__label {
  width: 95px!important;
  padding: 0 5px 0 5px!important;
  webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.addMessage .el-form-item__content {
  margin-left: 95px!important;
}
</style>

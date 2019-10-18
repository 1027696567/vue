<template>
  <div class="editAuthorization">
    <!-- 编辑用户权限弹框 -->
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="650px">
      <el-form label-position="left" ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名：" style="width:300px">
              <el-input v-model="form.name" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱：" style="width:300px">
              <el-input v-model="form.name" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号：" style="width:300px">
              <el-input v-model="form.mobile" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属公司：" style="width:300px">
              <el-input v-model="form.company" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="角色：">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="管理员" name="type"></el-checkbox>
            <el-checkbox label="普通用户" name="type"></el-checkbox>
            <el-checkbox label="认证用户" name="type"></el-checkbox>
            <el-checkbox label="普通员工" name="type"></el-checkbox>
            <el-checkbox label="经理" name="type"></el-checkbox>
            <el-checkbox label="董事长" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item style="margin:20px 0 0 150px">
          <el-button type="primary" @click="onSubmit">确认</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialogVisible: false,
      form: {
        type: []
      }
    }
  },
  methods: {
    init () {
      this.dialogVisible = true
    },
    onSubmit () {
      console.log(this.form)
    }
  },
  created () {

  }
}
</script>
<style>
.el-form-item__label {
  width: 95px!important;
  padding: 0 5px 0 5px!important;
  webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.el-form-item__content {
  margin-left: 95px!important;
}
</style>

<template>
  <div class="editInfo">
    <!-- 审核供应商信息弹框 -->
    <el-dialog title="发布信息" :visible.sync="dialogVisible" width="1000px">
      <h1 style="-webkit-margin-before: 0px;">发布信息</h1>
      <el-form label-position="right" ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="发布人名称：" prop="companyNumber" style="width:300px">
              <el-input v-model="form.companyNumber" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发布人职位：" prop="companyName" style="width:300px">
              <el-input v-model="form.companyName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发布时间：" prop="companyName" style="width:300px">
              <el-input v-model="form.companyName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="发布人单位：" prop="registeredPlace" style="width:619.5px">
              <el-input v-model="form.registeredPlace" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="发布内容：" prop="registeredPlace" style="width:939px">
              <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="请输入发布信息" resize=none v-model="form.textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
       <h1 style="-webkit-margin-before: 0px;">回复信息</h1>
        <el-row>
          <el-col :span="8">
            <el-form-item label="回复人名称：" prop="companyNumber" style="width:300px">
              <el-input v-model="form.companyNumber" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="回复人职位：" prop="companyName" style="width:300px">
              <el-input v-model="form.companyName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="回复时间：" prop="companyName" style="width:300px">
              <el-input v-model="form.companyName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="回复人单位：" prop="registeredPlace" style="width:619.5px">
              <el-input v-model="form.registeredPlace" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="回复内容：" prop="registeredPlace" style="width:939px">
              <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="请输入回复信息" resize=none v-model="form.textarea" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item style="margin:20px 0 0 300px">
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

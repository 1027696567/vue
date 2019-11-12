<template>
  <div class="addInfo">
    <!-- 添加投标信息弹框 -->
    <el-dialog title="报名" :visible.sync="dialogVisible" width="700px">
      <el-form label-position="right" ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="机构代码：" prop="companyNumber" style="width:320px">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构名称：" prop="companyName" style="width:320px">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="投标人：" prop="companyNumber" style="width:320px">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="投标时间：" prop="companyName" style="width:320px">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="上传投标书：" prop="companyNumber" style="width:320px">
              <el-upload
                class="upload-demo"
                action="http://localhost:7011/upload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                accept=".doc,.pdf,.docx"
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传doc/pdf文件</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注：" prop="textarea" style="width:650px">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="请输入备注信息" resize=none v-model="form.textarea"></el-input>
        </el-form-item>
        <el-form-item style="margin:20px 0 0 180px">
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
      },
      fileList: []
    }
  },
  methods: {
    init () {
      this.dialogVisible = true
    },
    onSubmit () {
      console.log(this.form)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning('只能上传一个文件！')
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
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

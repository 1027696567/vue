<template>
  <div class="addProject">
    <!-- 添加招标文件弹框 -->
    <el-dialog title="新建" :visible.sync="dialogVisible" width="700px">
      <el-form label-position="right" :rules="rules" ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="招标编号：" prop="companyNumber" style="width:320px">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目名称：" prop="companyName" style="width:320px">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="报建编号：" prop="registeredPlace" style="width:320px">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="招标人：" prop="creditRating" style="width:320px">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="法人：" prop="corporateRepresentative" style="width:320px">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人：" prop="permanentAssets" style="width:320px">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="填表日期：" prop="telephone" style="width:320px">
              <el-input v-model.number="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话：" prop="fax" style="width:320px">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="监管部门：" prop="contact" style="width:320px">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
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
      rules: {
        companyNumber: [
          {required: true, message: '请输入招标编号', trigger: 'blur'}
        ],
        companyName: [
          {required: true, message: '请输入项目名称', trigger: 'blur'}
        ],
        registeredPlace: [
          {required: true, message: '请输入报建编号', trigger: 'blur'}
        ],
        creditRating: [
          {required: true, message: '请输入招标人姓名', trigger: 'blur'}
        ],
        corporateRepresentative: [
          {required: true, message: '请输入法人或代理人', trigger: 'blur'}
        ],
        permanentAssets: [
          {required: true, message: '请输入招标人联系人', trigger: 'blur'}
        ],
        fax: [
          {required: true, message: '请输入联系人电话', trigger: 'blur'}
        ],
        contact: [
          {required: true, message: '请输入招投标监管部门', trigger: 'blur'}
        ],
        telephone: [
          {required: true, message: '请输入填表日期', trigger: 'blur'}
        ]
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

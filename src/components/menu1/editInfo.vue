<template>
  <div class="editInfo">
    <!-- 修改供应商信息弹框 -->
    <el-dialog title="修改" :visible.sync="dialogVisible" width="700px" :before-close="refresh">
      <el-form label-position="right" :rules="rules" ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="机构代码：" prop="companyNumber" style="width:320px">
              <el-input v-model="form.companyNumber" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构名称：" prop="companyName" style="width:320px">
              <el-input v-model="form.companyName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="注册地：" prop="registeredPlace" style="width:320px">
              <el-input v-model="form.registeredPlace" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="评级资质：" prop="creditRating" style="width:320px">
              <el-input v-model="form.creditRating" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="法人代表：" prop="corporateRepresentative" style="width:320px">
              <el-input v-model="form.corporateRepresentative" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="固定资产：" prop="permanentAssets" style="width:320px">
              <el-input v-model="form.permanentAssets" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="E-mail：" prop="email" style="width:320px">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="传真：" prop="fax" style="width:320px">
              <el-input v-model="form.fax"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人：" prop="contact" style="width:320px">
              <el-input v-model="form.contact"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话：" prop="telephone" style="width:320px">
              <el-input v-model.number="form.telephone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注：" prop="textarea" style="width:650px">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="请输入备注信息" resize=none v-model="form.textarea"></el-input>
        </el-form-item>
        <el-form-item style="margin:20px 0 0 180px">
          <el-button type="primary" @click="onSubmit">确认</el-button>
          <el-button @click="resetForm">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { editInfo } from '../../api/menu1/api'
export default {
  data () {
    return {
      dialogVisible: false,
      form: {
        companyNumber: '',
        companyName: '',
        registeredPlace: '',
        creditRating: '',
        corporateRepresentative: '',
        permanentAssets: '',
        email: '',
        fax: '',
        contact: '',
        telephone: '',
        textarea: ''
      },
      rules: {
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'}
        ],
        fax: [
          {required: true, message: '请输入传真', trigger: 'blur'}
        ],
        contact: [
          {required: true, message: '请输入联系人', trigger: 'blur'}
        ],
        telephone: [
          {required: true, message: '请输入联系电话', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    init (currentData) {
      this.dialogVisible = true
      this.form = currentData
    },
    async onSubmit () {
      await editInfo(this.form)
      this.parent()
      this.$message.success('修改成功！')
      this.dialogVisible = false
    },
    parent () {
      this.$parent.selectAllCompanyInfo()
    },
    refresh (done) {
      this.parent()
      done()
    },
    resetForm () {
      this.dialogVisible = false
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

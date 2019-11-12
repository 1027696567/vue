<template>
  <div class="editInfo">
    <!-- 审核供应商信息弹框 -->
    <el-dialog title="审核" :visible.sync="dialogVisible" width="700px">
      <h1 style="-webkit-margin-before: 0px;">供应商信息</h1>
      <el-form label-position="right" ref="form" :model="form" label-width="80px">
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
              <el-input v-model="form.email" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="传真：" prop="fax" style="width:320px">
              <el-input v-model="form.fax" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人：" prop="contact" style="width:320px">
              <el-input v-model="form.contact" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话：" prop="telephone" style="width:320px">
              <el-input v-model.number="form.telephone" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <h1 style="-webkit-margin-before: 0px;">审核填报</h1>
      <el-form label-position="right" ref="verityForm" :model="verityForm" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="分类：" prop="contact" style="width:320px">
              <el-select v-model="verityForm.classify" placeholder="请选择...">
                <el-option label="战略供应商" value="1"></el-option>
                <el-option label="瓶颈供应商" value="2"></el-option>
                <el-option label="杠杆供应商" value="3"></el-option>
                <el-option label="一般供应商" value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分级：" prop="telephone" style="width:320px">
              <el-select v-model="verityForm.grade" placeholder="请选择...">
                <el-option label="Ⅰ级" value="1"></el-option>
                <el-option label="Ⅱ级" value="2"></el-option>
                <el-option label="Ⅲ级" value="3"></el-option>
                <el-option label="Ⅳ级" value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="评价：" prop="textarea" style="width:650px">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="请输入备注信息" resize=none v-model="verityForm.textarea"></el-input>
        </el-form-item>
        <el-form-item style="margin:20px 0 0 180px">
          <el-button type="primary" @click="onSubmit">通过</el-button>
          <el-button type="danger" @click="reset">拒绝</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { addVerityInfo, getVerityInfo, updateVerityInfo, updateCompanyInfo } from '../../api/menu1/api'
export default {
  data () {
    return {
      dialogVisible: false,
      form: {
        companyNumber: ''
      },
      verityForm: {
        classify: null,
        grade: null,
        textarea: null,
        companyId: null
      }
    }
  },
  methods: {
    async init (currentData) {
      this.dialogVisible = true
      this.form = currentData
      const data = await getVerityInfo({companyId: currentData.companyId})
      if (data.data !== '') {
        this.verityForm = data.data
      } else {
        this.verityForm.verityId = null
        this.verityForm.classify = null
        this.verityForm.grade = null
        this.verityForm.textarea = null
        this.verityForm.companyId = currentData.companyId
      }
    },
    async onSubmit () {
      if (this.verityForm.verityId !== null) {
        await updateVerityInfo(this.verityForm)
      } else {
        await addVerityInfo(this.verityForm)
      }
      this.parent()
      this.dialogVisible = false
      this.$message.success('审核完成')
    },
    async reset () {
      await updateCompanyInfo({companyId: this.verityForm.companyId})
      this.parent()
      this.dialogVisible = false
      this.$message.success('状态已修改')
    },
    parent () {
      this.$parent.selectAllCompanyInfo()
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

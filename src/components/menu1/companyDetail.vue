<template>
  <div class="companyDetail">
    <!-- 供应商细节信息弹框 -->
    <el-dialog title="供应商详情" :visible.sync="dialogVisible" width="700px">
      <h1 style="-webkit-margin-before: 0px;">基本信息</h1>
      <el-form label-position="right" ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="机构代码：" prop="companyNumber" style="width:320px">
              <el-input v-model="form.companyNumber" readOnly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构名称：" prop="companyName" style="width:320px">
              <el-input v-model="form.companyName" readOnly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="注册地：" prop="registeredPlace" style="width:320px">
              <el-input v-model="form.registeredPlace" readOnly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="评级资质：" prop="creditRating" style="width:320px">
              <el-input v-model="form.creditRating" readOnly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="法人代表：" prop="corporateRepresentative" style="width:320px">
              <el-input v-model="form.corporateRepresentative" readOnly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="固定资产：" prop="permanentAssets" style="width:320px">
              <el-input v-model="form.permanentAssets" readOnly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="E-mail：" prop="email" style="width:320px">
              <el-input v-model="form.email" readOnly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="传真：" prop="fax" style="width:320px">
              <el-input v-model="form.fax" readOnly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人：" prop="contact" style="width:320px">
              <el-input v-model="form.contact" readOnly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话：" prop="telephone" style="width:320px">
              <el-input v-model.number="form.telephone" readOnly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="创建人：" prop="createUserName" style="width:320px">
              <el-input v-model="form.createUserName" readOnly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建时间：" prop="createTime" style="width:320px">
              <el-input v-model.number="form.createTime" readOnly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="审核状态：" prop="statusName" style="width:320px">
              <el-input v-model="form.statusName" readOnly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注：" prop="textarea" style="width:320px">
              <el-input v-model="form.textarea" readOnly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <h1 style="-webkit-margin-before: 0px;">审核信息</h1>
      <el-form label-position="right" ref="verityForm" :model="verityForm" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="分类：" prop="classify" style="width:320px">
              <el-select v-model="verityForm.classify" placeholder="请等待审核" disabled>
                <el-option label="战略供应商" value="1"></el-option>
                <el-option label="瓶颈供应商" value="2"></el-option>
                <el-option label="杠杆供应商" value="3"></el-option>
                <el-option label="一般供应商" value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分级：" prop="grade" style="width:320px">
              <el-select v-model="verityForm.grade" placeholder="请等待审核" disabled>
                <el-option label="Ⅰ级" value="1"></el-option>
                <el-option label="Ⅱ级" value="2"></el-option>
                <el-option label="Ⅲ级" value="3"></el-option>
                <el-option label="Ⅳ级" value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注：" prop="textarea" style="width:650px">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="请等待审核" resize=none v-model="verityForm.textarea" readOnly></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getVerityInfo } from '../../api/menu1/api'
export default {
  data () {
    return {
      dialogVisible: false,
      form: {},
      tableData: null,
      verityForm: {
        classify: '',
        grade: '',
        textarea: ''
      }
    }
  },
  methods: {
    async init (currentRow) {
      this.dialogVisible = true
      this.form = currentRow
      const data = await getVerityInfo({companyId: this.form.companyId})
      if (data.data !== '') {
        this.verityForm = data.data
      }
    }
  },
  created () {

  }
}
</script>
<style>
.companyDetail .el-form-item__label {
  width: 95px!important;
  padding: 0 5px 0 5px!important;
  webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.companyDetail .el-form-item__content {
  margin-left: 95px!important;
}
</style>

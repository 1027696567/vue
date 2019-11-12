<template>
  <div class="projectDetail">
    <!-- 项目细节信息弹框 -->
    <el-dialog title="招标项目" :visible.sync="dialogVisible" width="700px">
      <h1 style="-webkit-margin-before: 0px;">招标信息</h1>
      <el-form label-position="right" ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目编号：" prop="companyNumber" style="width:320px">
              <el-input v-model="form.name" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目名称：" prop="companyName" style="width:320px">
              <el-input v-model="form.name" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="招标人：" prop="registeredPlace" style="width:320px">
              <el-input v-model="form.name" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目类别：" prop="creditRating" style="width:320px">
              <el-input v-model="form.name" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="招标地址：" prop="corporateRepresentative" style="width:320px">
              <el-input v-model="form.name" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮政编码：" prop="permanentAssets" style="width:320px">
              <el-input v-model="form.name" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人：" prop="email" style="width:320px">
              <el-input v-model="form.name" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话：" prop="fax" style="width:320px">
              <el-input v-model="form.name" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="传真：" prop="contact" style="width:320px">
              <el-input v-model="form.name" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="招标时间：" prop="telephone" style="width:320px">
              <el-input v-model.number="form.name" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="截止时间：" prop="contact" style="width:320px">
              <el-input v-model="form.name" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目状态：" prop="telephone" style="width:320px">
              <el-input v-model.number="form.name" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <h1 style="-webkit-margin-before: 0px;">投标信息</h1>
          <el-table :data="tableData" border style="width: 100%" height="140px">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="date" label="投标人" width="180">
            </el-table-column>
            <el-table-column prop="name" label="供应商" width="180">
            </el-table-column>
            <el-table-column prop="address" label="投标时间">
            </el-table-column>
          </el-table>
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
      tableData: null
    }
  },
  methods: {
    init (currentRow) {
      this.dialogVisible = true
      console.log(currentRow)
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

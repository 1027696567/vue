<template>
  <div class="projectDetail">
    <!-- 项目细节信息弹框 -->
    <el-dialog title="招标项目" :visible.sync="dialogVisible" width="700px" >
      <h1 style="-webkit-margin-before: 0px;">招标信息</h1>
      <el-form label-position="right" ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目编号：" prop="itemNumber" style="width:320px">
              <el-input v-model="form.itemNumber" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目名称：" prop="itemName" style="width:320px">
              <el-input v-model="form.itemName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="招标人：" prop="username" style="width:320px">
              <el-input v-model="form.username" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目类别：" prop="itemClassesName" style="width:320px">
              <el-input v-model="form.itemClassesName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="招标地址：" prop="address" style="width:320px">
              <el-input v-model="form.address" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电子邮箱：" prop="email" style="width:320px">
              <el-input v-model="form.email" disabled></el-input>
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
              <el-input v-model="form.telephone" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="传真：" prop="fax" style="width:320px">
              <el-input v-model="form.fax" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="招标时间：" prop="beginTime" style="width:320px">
              <el-input v-model="form.beginTime" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="截止时间：" prop="endTime" style="width:320px">
              <el-input v-model="form.endTime" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目状态：" prop="statusName" style="width:320px">
              <el-input v-model="form.statusName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
        <h1 style="-webkit-margin-before: 0px;">投标信息</h1>
          <el-table ref="singleTable" :data="tableData" border style="width: 100%" height="150">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column property="tenderUserName" label="投标人" width="100">
            </el-table-column>
            <el-table-column property="companyNumber" label="供应商编号" width="100">
            </el-table-column>
            <el-table-column property="companyName" label="供应商" width="180">
            </el-table-column>
            <el-table-column property="tenderTime" label="投标时间">
            </el-table-column>
          </el-table>
    </el-dialog>
  </div>
</template>
<script>
import { selectTenderTable } from '../../api/menu1/api'
export default {
  data () {
    return {
      dialogVisible: false,
      form: {},
      tableData: []
    }
  },
  methods: {
    async init (data) {
      this.form = data
      this.dialogVisible = true
    },
    async getTenderTable () {
      const data = sessionStorage.getItem('itemId')
      const data1 = await selectTenderTable({itemId: data})
      this.tableData = data1.data
      console.log(data1.data)
    },
    onSubmit () {
      console.log(this.form)
    }
  },
  created () {
    this.getTenderTable()
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

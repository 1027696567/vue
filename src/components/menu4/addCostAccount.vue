<template>
  <div class="addCostAccountInfo">
    <!-- 新增科目弹框 -->
    <el-dialog title="新增" :visible.sync="dialogVisible" width="700px" :before-close="closeDiv">
      <el-form label-position="right" :rules="rules" ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目编号：" prop="itemNumber" style="width:320px">
              <el-input v-model="form.itemNumber" readOnly></el-input>
            </el-form-item>
          </el-col>
            <el-col :span="12">
              <el-form-item label="项目名称：" prop="itemName" style="width:320px">
                <el-input v-model="form.itemName" readOnly></el-input>
              </el-form-item>
            </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="科目编号：" prop="costAccountNumber" style="width:320px">
              <el-input v-model="form.costAccountNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="科目名称：" prop="costAccountName" style="width:320px">
              <el-input v-model="form.costAccountName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="类别：" prop="classifications" style="width:320px">
              <el-select v-model="form.classifications" style="width:225px">
                <el-option
                  v-for="item in classifications"
                  :key="item.Id"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建人：" prop="createUsername" style="width:320px">
              <el-input v-model="form.createUsername" readOnly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="主节点：" prop="hasChildren" style="width:320px">
              <el-radio v-model="form.hasChildren" :label="true" @change="reset($event)">是</el-radio>
              <el-radio v-model="form.hasChildren" :label="false" @change="resetOne($event)">否</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="父节点：" prop="parentNumber" style="width:320px"
            :rules="this.form.hasChildren === false?[{ required: true, message: '若无父节点请先创建主节点！', trigger: 'change' }]:[]">
              <el-input v-model="form.parentNumber" placeholder="请在主页面选择父节点" :disabled="this.form.hasChildren !== false" readOnly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注：" prop="remarks" style="width:650px">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="请输入备注信息" resize=none v-model="form.remarks"></el-input>
        </el-form-item>
        <el-form-item style="margin:20px 0 0 170px">
          <el-button type="primary" @click="onSubmit('form')">确认</el-button>
          <el-button @click="resetForm('form')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { selectItemInfo } from '../../api/menu1/api'
import { insertInfo, updateCostAccount } from '../../api/menu4/api'
export default {
  inject: ['reload'],
  data () {
    return {
      dialogVisible: false,
      form: {
        itemNumber: '',
        itemName: '',
        costAccountNumber: '',
        costAccountName: '',
        classifications: '',
        parentNumber: null,
        hasChildren: false,
        createUsername: '',
        status: true,
        remarks: ''
      },
      costAccountNumber: null,
      costAccount: null,
      classifications: [{id: '1', value: '分摊科目'}],
      rules: {
        costAccountNumber: [
          {required: true, message: '请输入科目成本编号', trigger: 'blur'}
        ],
        costAccountName: [
          {required: true, message: '请输入科目成本名称', trigger: 'blur'}
        ],
        classifications: [
          {required: true, message: '请选择科目类别', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    reset (prov) {
      this.$refs.form.clearValidate(['parentNumber'])
      this.form.parentNumber = null
    },
    resetOne (prov) {
      this.form.parentNumber = this.costAccountNumber
    },
    async init (itemNumber, currentRow) {
      this.dialogVisible = true
      const data = await selectItemInfo({itemNumber: itemNumber})
      this.form.itemNumber = itemNumber
      this.form.itemName = data.data.itemName
      this.form.createUsername = sessionStorage.getItem('user')
      this.costAccount = currentRow
      if (currentRow !== null) {
        this.costAccountNumber = currentRow.costAccountNumber
        this.form.parentNumber = this.costAccountNumber
        this.form.hasChildren = false
      } else {
        this.form.hasChildren = true
      }
    },
    onSubmit (form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          await insertInfo(this.form).then((res) => {
            this.updateCostAccount()
            this.$message.success('新建成功')
            this.$parent.reload()
            this.dialogVisible = false
            this.$refs[form].resetFields()
          })
        } else {
          return false
        }
      })
    },
    async updateCostAccount () {
      this.costAccount.hasChildren = true
      await updateCostAccount(this.costAccount)
    },
    resetForm (form) {
      this.$refs[form].resetFields()
      this.dialogVisible = false
    },
    closeDiv (done) {
      this.$refs['form'].resetFields()
      done()
    }
  },
  created () {
  }
}
</script>
<style>
.addCostAccountInfo .el-form-item__label {
  width: 95px!important;
  padding: 0 5px 0 5px!important;
  webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.addCostAccountInfo .el-form-item__content {
  margin-left: 95px!important;
}
</style>

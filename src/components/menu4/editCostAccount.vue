<template>
  <div class="editCostAccountInfo">
    <!-- 修改科目弹框 -->
    <el-dialog title="修改" :visible.sync="dialogVisible" width="700px">
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
              <el-input v-model="form.costAccountNumber" readOnly></el-input>
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
        <el-form-item label="备注：" prop="remarks" style="width:650px">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="请输入备注信息" resize=none v-model="form.remarks"></el-input>
        </el-form-item>
        <el-form-item style="margin:20px 0 0 170px">
          <el-button type="primary" @click="onSubmit('form')">确认</el-button>
          <el-button @click="resetForm()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { updateCostAccount } from '../../api/menu4/api'
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
        createUsername: '',
        status: true,
        remarks: ''
      },
      classifications: [{id: '1', value: '分摊科目'}],
      rules: {
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
    async init (currentRow) {
      this.dialogVisible = true
      this.form = currentRow
    },
    onSubmit (form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          await updateCostAccount(this.form).then((res) => {
            this.$message.success('更新成功')
            this.reload()
            this.dialogVisible = false
          })
        } else {
          return false
        }
      })
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
.editCostAccountInfo .el-form-item__label {
  width: 95px!important;
  padding: 0 5px 0 5px!important;
  webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.editCostAccountInfo .el-form-item__content {
  margin-left: 95px!important;
}
</style>

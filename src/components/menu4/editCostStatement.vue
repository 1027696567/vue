<template>
  <div class="editCostStatement">
    <!-- 编辑成本报表弹框 -->
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="700px">
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
              <el-input v-model="form.costAccountName" readOnly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="总工作量：" prop="totalWorkAmount" style="width:320px">
              <el-input v-model.number="form.totalWorkAmount" readOnly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="原单价：" prop="oldUnitPrice" style="width:320px">
              <el-input v-model.number="form.oldUnitPrice" readOnly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="剩余工作量：" prop="restWorkAmount" style="width:320px">
              <el-input v-model="form.restWorkAmount" readOnly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位：" prop="measurementUnit" style="width:320px">
              <el-input v-model="form.measurementUnit" readOnly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="工作量：" prop="workAmount" style="width:320px">
              <el-input v-model.number="form.workAmount" placeholder="请输入本次工作量"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单价：" prop="unitPrice" style="width:320px">
              <el-input v-model.number="form.unitPrice" placeholder="请输入单价"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item style="margin:20px 0 0 170px">
          <el-button type="primary" @click="onSubmit('form')">确认</el-button>
          <el-button @click="resetForm()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { insertCostStatement, updateCostStatement } from '../../api/menu4/api'
export default {
  inject: ['reload'],
  data () {
    return {
      dialogVisible: false,
      form: {
        itemNumber: null,
        itemName: null,
        costAccountNumber: null,
        workAmount: null,
        unitPrice: null,
        totalPrice: null
      },
      rules: {
        workAmount: [
          {required: true, message: '请输入本次工作量', trigger: 'blur'},
          {type: 'number', message: '请输入数字'}
        ],
        unitPrice: [
          {required: true, message: '请输入单价', trigger: 'blur'},
          {type: 'number', message: '请输入数字'}
        ]
      }
    }
  },
  methods: {
    async init (data) {
      this.dialogVisible = true
      this.form = data
      if (this.form.restWorkAmount === null) {
        this.form.restWorkAmount = this.form.totalWorkAmount
      }
    },
    onSubmit (form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          console.log(this.form)
          if (this.form.costStatementId === null) {
            if (this.form.workAmount > this.form.restWorkAmount) {
              this.$message.error('数值过大')
            } else {
              await insertCostStatement(this.form).then((res) => {
                this.$message.success('编辑成功')
                this.$parent.reloads()
                this.dialogVisible = false
              })
            }
          } else {
            if (this.form.workAmount > this.form.restWorkAmount) {
              this.$message.error('数值过大')
            } else {
              await updateCostStatement(this.form).then((res) => {
                this.$message.success('更新成功')
                this.$parent.reloads()
                this.dialogVisible = false
              })
            }
          }
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
.editCostStatement .el-form-item__label {
  width: 95px!important;
  padding: 0 5px 0 5px!important;
  webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.editCostStatement .el-form-item__content {
  margin-left: 95px!important;
}
</style>

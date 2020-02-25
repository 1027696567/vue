<template>
  <div class="editCostTargetInfo">
    <!-- 编辑目标成本弹框 -->
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
            <el-form-item label="工作量：" prop="workAmount" style="width:320px">
              <el-input v-model.number="form.workAmount"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位：" prop="measurementUnit" style="width:320px">
              <el-select v-model="form.measurementUnit" placeholder="请选择单位" style="width:225px">
                <el-option
                  v-for="item in measurementUnit"
                  :key="item.id"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="单价：" prop="unitPrice" style="width:320px">
              <el-input v-model.number="form.unitPrice"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="总价：" prop="totalPrice" style="width:320px">
              <el-input v-model="form.totalPrice" readOnly></el-input>
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
import { insertCostTarget, updateCostTarget } from '../../api/menu4/api'
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
        measurementUnit: null,
        unitPrice: null,
        totalPrice: null
      },
      measurementUnit: [
        {id: '1', value: 'm'},
        {id: '2', value: '㎡'},
        {id: '3', value: 'm³'},
        {id: '4', value: '其他'}],
      rules: {
        workAmount: [
          {required: true, message: '请输入工作量', trigger: 'blur'},
          {type: 'number', message: '请输入数字'}
        ],
        measurementUnit: [
          {required: true, message: '请选择单位', trigger: 'change'}
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
    },
    onSubmit (form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          if (this.form.totalPrice === null) {
            this.form.totalPrice = this.form.workAmount * this.form.unitPrice
            await insertCostTarget(this.form).then((res) => {
              this.$message.success('编辑成功')
              this.$parent.reloads()
              this.dialogVisible = false
            })
          } else {
            this.form.totalPrice = this.form.workAmount * this.form.unitPrice
            await updateCostTarget(this.form).then((res) => {
              this.$message.success('更新成功')
              this.$parent.reloads()
              this.dialogVisible = false
            })
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
.editCostTargetInfo .el-form-item__label {
  width: 95px!important;
  padding: 0 5px 0 5px!important;
  webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.editCostTargetInfo .el-form-item__content {
  margin-left: 95px!important;
}
</style>

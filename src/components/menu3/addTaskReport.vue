<template>
  <div class="addTaskReportInfo">
    <!-- 进度汇报弹框 -->
    <el-dialog title="进度汇报" :visible.sync="dialogVisible" width="700px" :before-close="closeDiv">
      <el-form label-position="right" :rules="rules" ref="form" :model="submitForm" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="任务编号：" prop="taskNumber" style="width:320px">
              <el-input v-model="form.taskNumber" readOnly></el-input>
            </el-form-item>
          </el-col>
            <el-col :span="12">
              <el-form-item label="任务名称：" prop="taskName" style="width:320px">
                <el-input v-model="form.taskName" readOnly></el-input>
              </el-form-item>
            </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否完成：" prop="status" style="width:320px">
              <el-radio v-model="form.status" :label=1 disabled>是</el-radio>
              <el-radio v-model="form.status" :label=0 disabled>否</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="完成进度：" prop="taskRate" style="width:320px">
              <el-input v-model="form.taskRate" readOnly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="计划开始：" prop="planBeginTime" style="width:320px">
              <el-date-picker v-model="form.planBeginTime" type="datetime" placeholder="请选择计划开始时间" default-time="12:00:00" style="width:225px" disabled></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划完成：" prop="planEndTime" style="width:320px">
              <el-date-picker v-model="form.planEndTime" type="datetime" placeholder="请选择计划完成时间" default-time="12:00:00" style="width:225px" disabled></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="实际开始：" prop="realityBeginTime" style="width:320px">
              <el-date-picker v-model="form.realityBeginTime" type="datetime" placeholder="请选择计划开始时间" default-time="12:00:00" style="width:225px"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="实际完成：" prop="realityEndTime" style="width:320px">
              <el-date-picker v-model="form.realityEndTime" type="datetime" placeholder="请选择计划完成时间" default-time="12:00:00" style="width:225px"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="汇报人：" prop="taskReportUsername" style="width:320px">
              <el-input v-model="submitForm.taskReportUsername" readOnly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="汇报日期：" prop="taskReportTime" style="width:320px">
              <el-date-picker v-model="submitForm.taskReportTime" type="datetime" placeholder="请选择实际完成时间" default-time="12:00:00" style="width:225px"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="责任人：" prop="dutyUsername" style="width:320px">
              <el-input v-model="submitForm.dutyUsername"></el-input>
            </el-form-item>
          </el-col>
            <el-col :span="12">
              <el-form-item label="本次工作量：" prop="taskAmount" style="width:320px">
                <el-input v-model.number="submitForm.taskAmount"></el-input>
              </el-form-item>
            </el-col>
        </el-row>
        <el-form-item label="完成情况：" prop="remarks" style="width:650px">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="请说明完成情况" resize=none v-model="submitForm.remarks"></el-input>
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
import { addTaskReport, updateTask } from '../../api/menu3/api'
export default {
  data () {
    var validateAmount = (rule, value, callback) => {
      if (value === null) {
        callback(new Error('请输入本次工作量'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字'))
        } else if (value > (100 - this.form.taskRate)) {
          callback(new Error('数值过大'))
        } else {
          callback()
        }
      }, 500)
    }
    return {
      dialogVisible: false,
      form: {
        status: null
      },
      submitForm: {
        taskReportTime: null,
        dutyUsername: null,
        taskAmount: null,
        remarks: null
      },
      rules: {
        taskReportTime: [
          {required: true, message: '请选择汇报时间', trigger: 'change'}
        ],
        dutyUsername: [
          {required: true, message: '请输入责任人', trigger: 'change'}
        ],
        taskAmount: [
          { validator: validateAmount, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init (data) {
      this.dialogVisible = true
      this.form = data
      this.submitForm.taskReportUsername = sessionStorage.getItem('user')
      this.submitForm.taskReportTime = new Date()
      this.submitForm.taskNumber = this.form.taskNumber
    },
    onSubmit (form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          await addTaskReport(this.submitForm).then((res) => {
            this.form.taskRate += this.submitForm.taskAmount
            if (this.form.taskRate === 100) {
              this.form.status = 1
            }
            this.updateTask()
            this.$message.success('新建成功')
            this.dialogVisible = false
            this.$refs[form].resetFields()
            this.parent()
          })
        } else {
          return false
        }
      })
    },
    async updateTask () {
      await updateTask(this.form)
    },
    parent () {
      this.$parent.selectAll()
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
.addTaskReportInfo .el-form-item__label {
  width: 95px!important;
  padding: 0 5px 0 5px!important;
  webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.addTaskReportInfo .el-form-item__content {
  margin-left: 95px!important;
}
</style>

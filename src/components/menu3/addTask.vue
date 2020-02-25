<template>
  <div class="addTaskInfo">
    <!-- 添加任务信息弹框 -->
    <el-dialog title="新建" :visible.sync="dialogVisible" width="700px" :before-close="closeDiv">
      <el-form label-position="right" :rules="rules" ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目编号：" prop="itemNumber" style="width:320px">
              <el-select v-model="form.itemNumber" @change="getRole($event)" style="width:225px">
                <el-option
                  v-for="item in itemInfo"
                  :key="item.itemId"
                  :label="item.itemNumber"
                  :value="item.itemNumber">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
            <el-col :span="12">
              <el-form-item label="项目名称：" prop="itemName" style="width:320px">
                <el-select v-model="form.itemName" @change="getList($event)" style="width:225px">
                  <el-option
                    v-for="item in itemInfo"
                    :key="item.itemId"
                    :label="item.itemName"
                    :value="item.itemName">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="任务编号：" prop="taskNumber" style="width:320px">
              <el-input v-model="form.taskNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务名称：" prop="taskName" style="width:320px">
              <el-input v-model="form.taskName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="计划开始：" prop="planBeginTime" style="width:320px">
              <el-date-picker v-model="form.planBeginTime" type="datetime" placeholder="请选择计划开始时间" default-time="12:00:00" style="width:225px"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划完成：" prop="planEndTime" style="width:320px">
              <el-date-picker v-model="form.planEndTime" type="datetime" placeholder="请选择计划完成时间" default-time="12:00:00" style="width:225px"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="工期(天)：" prop="taskTime" style="width:320px">
              <el-input v-model="form.taskTime"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="考核时间：" prop="planCheckTime" style="width:320px">
              <el-date-picker v-model="form.planCheckTime" type="datetime" placeholder="请选择考核时间" default-time="12:00:00" style="width:225px"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="优先级：" prop="taskPriority" style="width:320px">
              <el-select v-model="form.taskPriority" placeholder="请选择优先级" style="width:225px">
                <el-option
                  v-for="item in priorityInfo"
                  :key="item.priorityId"
                  :label="item.priorityName"
                  :value="item.priorityName">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="主节点：" prop="hasChildren" style="width:320px">
              <el-radio v-model="form.hasChildren" :label="true" @change="reset($event)">是</el-radio>
              <el-radio v-model="form.hasChildren" :label="false">否</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="父节点：" prop="fatherNumber" style="width:320px"
            :rules="this.form.hasChildren === false?[{ required: true, message: '请选择父节点，若无父节点请先创建主节点！', trigger: 'change' }]:[]">
              <el-select v-model="form.fatherNumber" placeholder="请选择父节点编号" style="width:225px" :disabled="this.form.hasChildren !== false">
                <el-option
                  v-for="item in taskInfo"
                  :key="item.taskId"
                  :label="item.taskNumber"
                  :value="item.taskNumber">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item style="margin:20px 0 0 170px">
          <el-button type="primary" @click="onSubmit('form')">确认</el-button>
          <el-button @click="resetForm('form')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { selectFinish } from '../../api/menu1/api'
import { addTask, selectAll } from '../../api/menu3/api'
export default {
  inject: ['reload'],
  data () {
    return {
      dialogVisible: false,
      form: {
        itemNumber: '',
        itemName: '',
        taskNumber: '',
        taskName: '',
        planBeginTime: '',
        planEndTime: '',
        taskTime: '',
        planCheckTime: '',
        taskPriority: '',
        fatherNumber: '',
        hasChildren: false
      },
      itemInfo: [],
      taskInfo: [],
      rules: {
        itemNumber: [
          {required: true, message: '请选择项目编号', trigger: 'change'}
        ],
        itemName: [
          {required: true, message: '请选择项目名称', trigger: 'change'}
        ],
        taskNumber: [
          {required: true, message: '请输入任务编号', trigger: 'blur'}
        ],
        taskName: [
          {required: true, message: '请输入任务名称', trigger: 'blur'}
        ],
        planBeginTime: [
          {required: true, message: '请选择计划开始时间', trigger: 'change'}
        ],
        planEndTime: [
          {required: true, message: '请选择计划完成时间', trigger: 'change'}
        ],
        taskTime: [
          {required: true, message: '请输入工期', trigger: 'blur'}
        ],
        planCheckTime: [
          {required: true, message: '请选择考核时间', trigger: 'change'}
        ],
        taskPriority: [
          {required: true, message: '请选择计划优先级', trigger: 'change'}
        ],
        hasChildren: [
          {required: true, message: '请选择是否为主节点', trigger: 'change'}
        ]
      },
      priorityInfo: [{
        priorityId: '1',
        priorityName: 'Ⅰ级'
      }, {
        priorityId: '2',
        priorityName: 'Ⅱ级'
      }, {
        priorityId: '3',
        priorityName: 'Ⅲ级'
      }]
    }
  },
  methods: {
    getRole (prov) {
      for (var val of this.itemInfo) {
        if (prov === val.itemNumber) {
          this.form.itemName = val.itemName
        }
      }
    },
    getList (prov) {
      for (var val of this.itemInfo) {
        if (prov === val.itemName) {
          this.form.itemNumber = val.itemNumber
        }
      }
    },
    reset (prov) {
      this.$refs.form.clearValidate(['fatherNumber'])
      this.form.fatherNumber = ''
    },
    async selectAll () {
      const data = await selectAll()
      this.taskInfo = data.data
    },
    init () {
      this.dialogVisible = true
    },
    onSubmit (form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          await addTask(this.form)
          this.$message.success('新建成功')
          this.dialogVisible = false
          this.reload()
        } else {
          return false
        }
      })
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
    },
    async selectAllItemInfo () {
      const data = await selectFinish()
      this.itemInfo = data.data
    },
    async selectAllTask () {
      const data = await selectAll()
      this.taskInfo = data.data
    }
  },
  created () {
    this.selectAllItemInfo()
    this.selectAllTask()
  }
}
</script>
<style>
.addTaskInfo .el-form-item__label {
  width: 95px!important;
  padding: 0 5px 0 5px!important;
  webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.addTaskInfo .el-form-item__content {
  margin-left: 95px!important;
}
</style>

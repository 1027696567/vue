<template>
    <div class="menu2_item1">
    <!-- 合同管理 -->
      <div class="blank">
      </div>
      <div class="topHead">
        <div class="buttonList">
          <el-button @click="addTask">新建任务</el-button>
          <el-button @click="addTaskReport">进度汇报</el-button>
          <el-button @click="upTask">升级</el-button>
          <el-button @click="downTask">降级</el-button>
          <el-button @click="deleteTaskInfo" type="primary">删除</el-button>
        </div>
      </div>
      <el-main>
        <el-table :data="tableData" style="width: 100%" row-key="taskId"  :row-class-name="tableRowClassName" highlight-current-row @current-change="handleCurrentChange" border lazy :load="load" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="taskNumber" label="任务编号" width="150"></el-table-column>
          <el-table-column prop="taskName" label="任务名称" width="180"></el-table-column>
          <el-table-column prop="itemNumber" label="项目编号" width="180"></el-table-column>
          <el-table-column prop="itemName" label="项目名称" width="180"></el-table-column>
          <el-table-column prop="planBeginTime" label="计划开始时间" width="180"></el-table-column>
          <el-table-column prop="planEndTime" label="计划完成时间" width="180"></el-table-column>
          <el-table-column prop="taskTime" label="工期（天）" width="180"></el-table-column>
          <el-table-column prop="planCheckTime" label="考核日期" width="180"></el-table-column>
          <el-table-column prop="taskPriority" label="优先级"></el-table-column>
        </el-table>
      </el-main>
    <AddTask ref="AddTask" v-if="addTaskVisible"></AddTask>
    <AddTaskReport ref="AddTaskReport" v-if="addTaskReportVisible"></AddTaskReport>
    </div>
</template>

<script>
import { selectAll, selectChildren, updateTask, deleteTaskInfo } from '../../api/menu3/api'
import AddTask from '../../components/menu3/addTask'
import AddTaskReport from '../../components/menu3/addTaskReport'
export default {
  components: { AddTask, AddTaskReport },
  inject: ['reload'],
  data () {
    return {
      tableData: [],
      currentRow: null,
      addTaskVisible: false,
      addTaskReportVisible: false
    }
  },
  methods: {
    setCurrent (row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    async selectAll () {
      const data = await selectAll()
      this.tableData = data.data
    },
    load (tree, treeNode, resolve) {
      setTimeout(async () => {
        const data = await selectChildren({taskNumber: tree.taskNumber})
        resolve(data.data)
      }, 500)
    },
    addTask () {
      this.addTaskVisible = true
      this.$nextTick(() => {
        this.$refs.AddTask.init()
      })
    },
    addTaskReport () {
      if (this.currentRow !== null) {
        this.addTaskReportVisible = true
        this.$nextTick(() => {
          this.$refs.AddTaskReport.init(this.currentRow)
        })
      } else {
        this.$message.error('请选择一项任务')
      }
    },
    tableRowClassName ({row, rowIndex}) {
      if (row.hasChildren === false) {
        return 'success-row'
      }
      return ''
    },
    async upTask () {
      if (this.currentRow != null) {
        if (this.currentRow.taskPriority === 'Ⅱ级') {
          this.currentRow.taskPriority = 'Ⅰ级'
          await updateTask(this.currentRow)
          this.$message.success('升级成功')
        } else if (this.currentRow.taskPriority === 'Ⅲ级') {
          this.currentRow.taskPriority = 'Ⅱ级'
          await updateTask(this.currentRow)
          this.$message.success('升级成功')
        } else {
          this.$message.error('优先级已最高')
        }
        this.selectAll()
      } else {
        this.$message.error('请选择一项任务')
      }
    },
    async downTask () {
      if (this.currentRow != null) {
        if (this.currentRow.taskPriority === 'Ⅱ级') {
          this.currentRow.taskPriority = 'Ⅲ级'
          await updateTask(this.currentRow)
          this.$message.success('降级成功')
        } else if (this.currentRow.taskPriority === 'Ⅰ级') {
          this.currentRow.taskPriority = 'Ⅱ级'
          await updateTask(this.currentRow)
          this.$message.success('降级成功')
        } else {
          this.$message.error('优先级已最低')
        }
        this.selectAll()
      } else {
        this.$message.error('请选择一项任务')
      }
    },
    deleteTaskInfo () {
      if (this.currentRow !== null) {
        this.$confirm('此操作不可恢复，确认继续？')
          .then(async _ => {
            await deleteTaskInfo({taskId: this.currentRow.taskId})
            this.reload()
            this.$message.success('删除成功')
          })
          .catch(_ => {})
      } else {
        this.$message.error('请选择一项任务')
      }
    }
  },
  created () {
    this.selectAll()
  }
}
</script>

<style>
  .blank{
    width:100%;
    height:15px;
  }
  .topHead{
    width:100%;
    height:32px;
    padding:0 20px 0 20px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    overflow: hidden;
  }
  .buttonList{
    float:left
  }
  .el-table .warning-row {
    background: oldlace;
  }
  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

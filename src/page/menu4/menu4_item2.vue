<template>
    <div class="menu4_item1">
    <!-- 目标成本管理 -->
      <div class="blank">
      </div>
      <div class="topHead">
        <div class="buttonList">
          <el-button @click="editCostTarget" type="primary">编辑</el-button>
          <el-select v-model="itemNumber" filterable placeholder="请选择项目" @change="getCostTargetMerge($event)">
            <el-option
              v-for="item in options"
              :key="item.itemNumber"
              :label="item.itemName"
              :value="item.itemNumber">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-main>
        <el-table :data="tableData" style="width: 100%" max-height="600px" row-key="costAccountId" highlight-current-row @current-change="handleCurrentChange" border lazy :load="load" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="costAccountNumber" label="成本科目编号" width="200"></el-table-column>
          <el-table-column prop="costAccountName" label="成本科目名称" width="200"></el-table-column>
          <el-table-column prop="itemNumber" label="项目编号" width="200"></el-table-column>
          <el-table-column prop="itemName" label="项目名称" width="200"></el-table-column>
          <el-table-column prop="workAmount" label="工作量" width="200"></el-table-column>
          <el-table-column prop="measurementUnit" label="单位" width="200"></el-table-column>
          <el-table-column prop="unitPrice" label="单价(元)" width="200"></el-table-column>
          <el-table-column prop="totalPrice" label="总价(元)"></el-table-column>
        </el-table>
      </el-main>
    <EditCostTarget v-if="editCostTargetVisible" ref="EditCostTarget"></EditCostTarget>
    </div>
</template>

<script>
import { getCostTargetMerge, getCostTargetChildren } from '../../api/menu4/api'
import { selectFinish } from '../../api/menu1/api'
import EditCostTarget from '../../components/menu4/editCostTarget'
export default {
  inject: ['reload'],
  components: { EditCostTarget },
  data () {
    return {
      tableData: [],
      currentRow: null,
      editCostTargetVisible: false,
      options: [],
      itemNumber: null
    }
  },
  methods: {
    setCurrent (row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    load (tree, treeNode, resolve) {
      setTimeout(async () => {
        const data = await getCostTargetChildren({costAccountNumber: tree.costAccountNumber})
        resolve(data.data)
      }, 50)
    },
    editCostTarget () {
      if (this.currentRow !== null) {
        if (this.currentRow.hasChildren === true) {
          this.$message.error('请选择详细科目')
        } else {
          this.editCostTargetVisible = true
          this.$nextTick(() => {
            this.$refs.EditCostTarget.init(this.currentRow)
          })
        }
      } else {
        this.$message.error('请选择一项成本科目')
      }
    },
    async selectItem () {
      const data = await selectFinish()
      this.options = data.data
      this.getCostTargetMerge()
    },
    async getCostTargetMerge () {
      this.itemNumber = this.options[0].itemNumber
      const data = await getCostTargetMerge({itemNumber: this.itemNumber})
      this.tableData = data.data
    },
    reloads () {
      this.reload()
    }
  },
  created () {
    this.selectItem()
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

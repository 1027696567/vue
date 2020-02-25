<template>
    <div class="menu4_item1">
    <!-- 成本报表管理 -->
      <div class="blank">
      </div>
      <div class="topHead">
        <div class="buttonList">
          <el-button @click="editCostStatement" type="primary">编辑</el-button>
          <el-select v-model="itemNumber" filterable placeholder="请选择项目" @change="selectCostStatement($event)">
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
          <el-table-column prop="totalPrice" label="目标成本"></el-table-column>
          <el-table-column prop="costIncurred" label="已发生成本"></el-table-column>
          <el-table-column prop="costWaitIncurred" label="待发生成本"></el-table-column>
          <el-table-column prop="costDynamics" label="动态成本"></el-table-column>
          <el-table-column prop="differPrice" label="差异（动态-目标）"></el-table-column>
        </el-table>
      </el-main>
    <EditCostStatement v-if="editCostStatementVisible" ref="EditCostStatement"></EditCostStatement>
    </div>
</template>

<script>
import { selectCostStatementChildren, selectCostStatement } from '../../api/menu4/api'
import { selectFinish } from '../../api/menu1/api'
import EditCostStatement from '../../components/menu4/editCostStatement'
export default {
  inject: ['reload'],
  components: { EditCostStatement },
  data () {
    return {
      tableData: [],
      currentRow: null,
      editCostStatementVisible: false,
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
        const data = await selectCostStatementChildren({costAccountNumber: tree.costAccountNumber})
        resolve(data.data)
      }, 125)
    },
    editCostStatement () {
      if (this.currentRow !== null) {
        if (this.currentRow.hasChildren === true) {
          this.$message.error('请选择详细科目')
        } else if (this.currentRow.totalPrice === null) {
          this.$message.error('请先设置目标成本')
        } else {
          this.editCostStatementVisible = true
          this.$nextTick(() => {
            this.$refs.EditCostStatement.init(this.currentRow)
          })
        }
      } else {
        this.$message.error('请选择一项成本科目')
      }
    },
    async selectItem () {
      const data = await selectFinish()
      this.options = data.data
      this.selectCostStatement()
    },
    async selectCostStatement () {
      this.itemNumber = this.options[0].itemNumber
      const data = await selectCostStatement({itemNumber: this.itemNumber})
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

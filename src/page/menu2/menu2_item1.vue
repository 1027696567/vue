<template>
    <div class="menu2_item1">
    <!-- 合同管理 -->
      <div class="blank">
      </div>
      <div class="topHead">
        <div class="buttonList">
          <el-button @click="addContract" >签订合同</el-button>
          <el-button @click="editContract" >变更合同</el-button>
          <el-button @click="deleteContract" type="primary">解除合同</el-button>
        </div>
      </div>
      <el-main>
        <el-table :data="tableData" style="width: 100%" row-key="contractId" :row-class-name="tableRowClassName" highlight-current-row @current-change="handleCurrentChange" border lazy :load="load" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="contractNumber" label="合同编号" width="200"></el-table-column>
          <el-table-column prop="contractName" label="合同名称" width="200"></el-table-column>
          <el-table-column prop="itemNumber" label="项目编号" width="200"></el-table-column>
          <el-table-column prop="itemName" label="项目名称" width="200"></el-table-column>
          <el-table-column prop="contractTypesName" label="合同性质" width="200"></el-table-column>
          <el-table-column prop="contractTime" label="签约时间" width="200"></el-table-column>
          <el-table-column prop="dutyUsername" label="责任人" width="200"></el-table-column>
          <el-table-column prop="createUsername" label="制单人"></el-table-column>
        </el-table>
      </el-main>
    </div>
</template>

<script>
import { selectAllContractInfo, selectChildren, deleteContract } from '../../api/menu2/api'
export default {
  inject: ['reload'],
  data () {
    return {
      tableData: [],
      currentRow: null
    }
  },
  methods: {
    setCurrent (row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    addContract () {
      this.$router.push('/addContract')
    },
    async selectAllContractInfo () {
      const data = await selectAllContractInfo()
      this.tableData = data.data
    },
    load (tree, treeNode, resolve) {
      setTimeout(async () => {
        const data = await selectChildren({fatherNumber: tree.contractNumber})
        resolve(data.data)
      }, 500)
    },
    editContract () {
      if (this.currentRow !== null) {
        sessionStorage.setItem('contractNumber', this.currentRow.contractNumber)
        this.$router.push('editContract')
      } else {
        this.$message.error('请选择一项合同')
      }
    },
    deleteContract (table) {
      if (this.currentRow !== null) {
        this.$confirm('此操作不可恢复，确认继续？')
          .then(async _ => {
            await deleteContract(this.currentRow)
            this.reload()
            this.$message.success('解除成功')
          })
          .catch(_ => {})
      } else {
        this.$message.error('请选择一项合同')
      }
    },
    tableRowClassName ({row, rowIndex}) {
      if (row.contractTypes === '3') {
        return 'success-row'
      }
      return ''
    }
  },
  created () {
    this.selectAllContractInfo()
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

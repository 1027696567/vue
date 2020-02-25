<template>
    <div class="menu4_item1">
    <!-- 成本科目管理 -->
      <div class="blank">
      </div>
      <div class="topHead">
        <div class="buttonList">
          <el-button @click="addCostAccount" >新增科目</el-button>
          <el-button @click="editCostAccount" >修改科目</el-button>
          <el-button @click="deleteCostAccount" type="primary">删除科目</el-button>
          <el-select v-model="itemNumber" filterable placeholder="请选择项目" @change="getCostAccount($event)">
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
          <el-table-column prop="classifications" label="类别" width="200"></el-table-column>
          <el-table-column prop="createUsername" label="创建人" width="200"></el-table-column>
          <el-table-column prop="remarks" label="描述" width="200"></el-table-column>
          <el-table-column label="操作">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.status"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="update(scope.$index, scope.row)"
                  active-text="启用"
                  inactive-text="禁用">
                </el-switch>
              </template>
          </el-table-column>
        </el-table>
      </el-main>
    <AddCostAccount v-if="addCostAccountVisible" ref="AddCostAccount"></AddCostAccount>
    <EditCostAccount v-if="editCostAccountVisible" ref="EditCostAccount"></EditCostAccount>
    </div>
</template>

<script>
import { selectCostAccountInfo, selectChildren, updateStatus, deleteInfo } from '../../api/menu4/api'
import { selectFinish } from '../../api/menu1/api'
import AddCostAccount from '../../components/menu4/addCostAccount'
import EditCostAccount from '../../components/menu4/editCostAccount'
export default {
  inject: ['reload'],
  components: { AddCostAccount, EditCostAccount },
  data () {
    return {
      tableData: [],
      currentRow: null,
      addCostAccountVisible: false,
      options: [],
      itemNumber: null,
      editCostAccountVisible: false
    }
  },
  methods: {
    setCurrent (row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    addCostAccount () {
      if (this.itemNumber !== null) {
        if (this.currentRow === null) {
          this.$confirm('当前未选择主干，确认创建？')
            .then(_ => {
              this.addCostAccountVisible = true
              this.$nextTick(() => {
                this.$refs.AddCostAccount.init(this.itemNumber, this.currentRow)
              })
            })
            .catch(_ => {})
        } else if (this.currentRow.status === false) {
          this.$message.error('当前科目未启用')
        } else if (this.currentRow.level === 3) {
          this.$message.error('已达最大层数')
        } else {
          this.addCostAccountVisible = true
          this.$nextTick(() => {
            this.$refs.AddCostAccount.init(this.itemNumber, this.currentRow)
          })
        }
      } else {
        this.$message.error('请选择项目')
      }
    },
    load (tree, treeNode, resolve) {
      setTimeout(async () => {
        const data = await selectChildren({parentNumber: tree.costAccountNumber})
        resolve(data.data)
      }, 50)
    },
    editCostAccount () {
      if (this.currentRow !== null) {
        this.editCostAccountVisible = true
        this.$nextTick(() => {
          this.$refs.EditCostAccount.init(this.currentRow)
        })
      } else {
        this.$message.error('请选择一项成本科目')
      }
    },
    deleteCostAccount () {
      if (this.currentRow !== null) {
        if (this.currentRow.hasChildren === false) {
          this.$confirm('此操作不可恢复，确认继续？')
            .then(async _ => {
              await deleteInfo(this.currentRow)
              this.reload()
              this.$message.success('删除成功')
            })
            .catch(_ => {})
        } else {
          this.$message.error('请先删除子节点')
        }
      } else {
        this.$message.error('请选择一项成本科目')
      }
    },
    async selectItem () {
      const data = await selectFinish()
      this.options = data.data
    },
    async getCostAccount () {
      sessionStorage.setItem('costItemNumber', this.itemNumber)
      const data = await selectCostAccountInfo({itemNumber: sessionStorage.getItem('costItemNumber')})
      this.tableData = data.data
    },
    reloads () {
      this.reload()
    },
    async update (index, row) {
      await updateStatus(row).then((res) => {
        setTimeout(() => {
          this.$message.success('修改成功')
          this.currentRow = row
          this.getCostAccount()
        }, 125)
      }).catch(() => {
        setTimeout(() => {
          this.$message.error('修改失败')
          row.status = !row.status
          this.getCostAccount()
        }, 125)
      })
    }
  },
  created () {
    this.selectItem()
    if (sessionStorage.getItem('costItemNumber') !== null) {
      this.itemNumber = sessionStorage.getItem('costItemNumber')
      this.getCostAccount()
    }
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

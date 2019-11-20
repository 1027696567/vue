<template>
    <div class="menu1_item1">
    <!-- 供应商管理 -->
      <div class="blank">
      </div>
      <div class="topHead">
        <div class="buttonList">
          <el-button @click="addInfo">新建</el-button>
          <el-button @click="editInfo">修改</el-button>
          <el-button @click="verifyInfo" type="primary">审核</el-button>
          <el-button @click="deleteInfo" type="danger" disabled>删除</el-button>
        </div>
      </div>
      <el-main>
        <el-table strip border ref="singleTable" :data="tableData" highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column label="机构代码" width="180" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button @click="companyDetail(scope.row)" type="text" style="text-decoration:underline" >{{ scope.row.companyNumber }}</el-button>
            </template>
          </el-table-column>
          <el-table-column property="companyName" label="机构名称" width="180"></el-table-column>
          <el-table-column property="contact" label="联系人" width="180"></el-table-column>
          <el-table-column property="telephone" label="联系电话" width="180"></el-table-column>
          <el-table-column property="email" label="E-mail" width="180"></el-table-column>
          <el-table-column property="createUserName" label="创建人" width="180"></el-table-column>
          <el-table-column property="createTime" label="创建时间" width="180"></el-table-column>
          <el-table-column property="statusName" label="状态" width="180"></el-table-column>
          <el-table-column property="textarea" label="备注"></el-table-column>
        </el-table>
      </el-main>
      <AddInfo v-if="addInfoVisible" ref="AddInfo"></AddInfo>
      <EditInfo v-if="editInfoVisible" ref="EditInfo"></EditInfo>
      <VerifyInfo v-if="verifyInfoVisible" ref="VerifyInfo"></VerifyInfo>
      <CompanyDetail v-if="companyDetailVisible" ref="CompanyDetail"></CompanyDetail>
    </div>
</template>

<script>
import AddInfo from '../../components/menu1/addInfo'
import EditInfo from '../../components/menu1/editInfo'
import VerifyInfo from '../../components/menu1/verifyInfo'
import CompanyDetail from '../../components/menu1/companyDetail'
import { selectAllCompanyInfo, getAuthorization, deleteCompanyInfo } from '../../api/menu1/api'
export default {
  components: { AddInfo, EditInfo, VerifyInfo, CompanyDetail },
  data () {
    return {
      tableData: [],
      currentRow: null,
      addInfoVisible: false,
      editInfoVisible: false,
      verifyInfoVisible: false,
      companyDetailVisible: false
    }
  },
  methods: {
    setCurrent (row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    addInfo () {
      this.addInfoVisible = true
      this.$nextTick(() => {
        this.$refs.AddInfo.init()
      })
    },
    editInfo () {
      if (this.currentRow != null) {
        if (sessionStorage.getItem('user') === this.currentRow.createUserName) {
          this.editInfoVisible = true
          this.$nextTick(() => {
            this.$refs.EditInfo.init(this.currentRow)
          })
        } else {
          this.$message.error('非创建人不能修改')
        }
      } else {
        this.$message.error('请选择供应商')
      }
    },
    verifyInfo () {
      getAuthorization().then((res) => {
        if (this.currentRow != null) {
          if (this.currentRow.status === 0) {
            this.verifyInfoVisible = true
            this.$nextTick(() => {
              this.$refs.VerifyInfo.init(this.currentRow)
            })
          } else {
            this.$confirm('确认重新审核？')
              .then(_ => {
                this.verifyInfoVisible = true
                this.$nextTick(() => {
                  this.$refs.VerifyInfo.init(this.currentRow)
                })
              })
              .catch(_ => {})
          }
        } else {
          this.$message.error('请选择供应商')
        }
      })
    },
    async selectAllCompanyInfo () {
      const data = await selectAllCompanyInfo()
      this.tableData = data.data
    },
    deleteInfo () {
      if (this.currentRow !== null) {
        this.$confirm('删除后不可恢复，确认删除？')
          .then(async _ => {
            await deleteCompanyInfo({companyId: this.currentRow.companyId})
            this.selectAllCompanyInfo()
          })
          .catch(_ => {})
      } else {
        this.$message.error('请选择供应商')
      }
    },
    companyDetail (data) {
      this.companyDetailVisible = true
      this.$nextTick(() => {
        this.$refs.CompanyDetail.init(data)
      })
    }
  },
  created () {
    this.selectAllCompanyInfo()
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

</style>

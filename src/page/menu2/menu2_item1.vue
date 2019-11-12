<template>
    <div class="menu2_item1">
    <!-- 合同管理 -->
      <div class="blank">
      </div>
      <div class="topHead">
        <div class="buttonList">
          <el-button @click="addContract" >新建合同</el-button>
          <el-button @click="addInfo" >签订合同</el-button>
          <el-button @click="editInfo" >变更合同</el-button>
          <el-button type="primary">解除合同</el-button>
        </div>
      </div>
      <el-main>
        <el-table strip border ref="singleTable" :data="tableData" highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column property="companyNumber" label="机构代码" width="180"></el-table-column>
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
    </div>
</template>

<script>
import AddInfo from '../../components/menu1/addInfo'
import EditInfo from '../../components/menu1/editInfo'
import VerifyInfo from '../../components/menu1/verifyInfo'
import { selectAllCompanyInfo, getAuthorization } from '../../api/menu1/api'
export default {
  components: { AddInfo, EditInfo, VerifyInfo },
  data () {
    return {
      tableData: [],
      currentRow: null,
      addInfoVisible: false,
      editInfoVisible: false,
      verifyInfoVisible: false
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
          this.verifyInfoVisible = true
          this.$nextTick(() => {
            this.$refs.VerifyInfo.init(this.currentRow)
          })
        } else {
          this.$message.error('请选择供应商')
        }
      })
    },
    async selectAllCompanyInfo () {
      const data = await selectAllCompanyInfo()
      this.tableData = data.data
      console.log(this.tableData)
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

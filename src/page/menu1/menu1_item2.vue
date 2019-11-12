<template>
    <div class="menu1_item2">
    <!-- 招投标过程管理 -->
      <div class="blank">
      </div>
      <div class="topHead">
        <div class="buttonList">
          <el-button @click="addProject">发布公告</el-button>
          <el-button @click="addProject">发布新标</el-button>
          <el-button @click="editInfo" type="primary">修改</el-button>
          <el-button @click="joinProject" type="primary">投标</el-button>
          <el-button type="primary">删除</el-button>
        </div>
      </div>
      <el-main>
        <el-table strip border ref="singleTable" :data="tableData" highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column label="项目编号" width="180" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button @click="projectDetail(scope.row)" type="text" style="text-decoration:underline" >{{ scope.row.companyNumber }}</el-button>
            </template>
          </el-table-column>
          <el-table-column property="companyName" label="项目名称" width="180"></el-table-column>
          <el-table-column property="contact" label="招标人" width="180"></el-table-column>
          <el-table-column property="contact" label="招标地址" width="180"></el-table-column>
          <el-table-column property="contact" label="招标日期" width="180"></el-table-column>
          <el-table-column property="telephone" label="截止时间" width="180"></el-table-column>
          <el-table-column property="telephone" label="中标方式" width="180"></el-table-column>
          <el-table-column property="telephone" label="竞价类型" width="180"></el-table-column>
          <el-table-column property="statusName" label="项目状态"></el-table-column>
        </el-table>
      </el-main>
      <AddProject v-if="addProjectVisible" ref="AddProject"></AddProject>
      <EditInfo v-if="editInfoVisible" ref="EditInfo"></EditInfo>
      <VerifyInfo v-if="verifyInfoVisible" ref="VerifyInfo"></VerifyInfo>
      <ProjectDetail v-if="projectDetailVisible" ref="ProjectDetail"></ProjectDetail>
      <JoinProject v-if="joinProjectVisible" ref="JoinProject"></JoinProject>
    </div>
</template>

<script>
import ProjectDetail from '../../components/menu1/projectDetail'
import JoinProject from '../../components/menu1/joinProject'
import AddProject from '../../components/menu1/addProject'
import { selectAllCompanyInfo } from '../../api/menu1/api'
export default {
  components: { AddProject, ProjectDetail, JoinProject },
  data () {
    return {
      tableData: [],
      currentRow: null,
      addProjectVisible: false,
      editInfoVisible: false,
      verifyInfoVisible: false,
      projectDetailVisible: false,
      joinProjectVisible: false
    }
  },
  methods: {
    setCurrent (row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    addProject () {
      this.addProjectVisible = true
      this.$nextTick(() => {
        this.$refs.AddProject.init()
      })
    },
    editInfo () {
      if (this.currentRow != null) {
        this.$router.push({name: 'editProject', params: this.currentRow})
        console.log(this.currentRow)
      } else {
        this.$message.error('请选择项目')
      }
    },
    verifyInfo () {
      if (this.currentRow != null) {
        this.verifyInfoVisible = true
        this.$nextTick(() => {
          this.$refs.VerifyInfo.init(this.currentRow)
        })
      } else {
        this.$message.error('请选择供应商')
      }
    },
    async selectAllCompanyInfo () {
      const data = await selectAllCompanyInfo()
      this.tableData = data.data
      console.log(this.tableData)
    },
    projectDetail (data) {
      this.projectDetailVisible = true
      this.$nextTick(() => {
        this.$refs.ProjectDetail.init(data)
      })
    },
    joinProject () {
      if (this.currentRow != null) {
        this.joinProjectVisible = true
        this.$nextTick(() => {
          this.$refs.JoinProject.init()
        })
      } else {
        this.$message.error('请选择项目！')
      }
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

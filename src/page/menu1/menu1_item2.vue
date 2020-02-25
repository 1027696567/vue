<template>
    <div class="menu1_item2">
    <!-- 招投标过程管理 -->
      <div class="blank">
      </div>
      <div class="topHead">
        <div class="buttonList">
          <el-button @click="addProject">发布新标</el-button>
          <el-button @click="editProject" type="primary">修改</el-button>
          <el-button @click="joinProject" type="primary">投标</el-button>
          <el-button @click="deleteProject" type="primary" disabled>删除</el-button>
        </div>
      </div>
      <el-main>
        <el-table strip border ref="singleTable" :data="tableData" highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column label="项目编号" width="180" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button @click="projectDetail(scope.row)" type="text" style="text-decoration:underline" >{{ scope.row.itemNumber }}</el-button>
            </template>
          </el-table-column>
          <el-table-column property="itemName" label="项目名称" width="180"></el-table-column>
          <el-table-column property="itemClassesName" label="项目类别" width="180"></el-table-column>
          <el-table-column property="username" label="招标人" width="180"></el-table-column>
          <el-table-column property="address" label="招标地址" width="180"></el-table-column>
          <el-table-column property="beginTime" label="招标日期" width="180"></el-table-column>
          <el-table-column property="endTime" label="截止时间" width="180"></el-table-column>
          <el-table-column property="biddingWayName" label="中标方式" width="180"></el-table-column>
          <el-table-column property="statusName" label="项目状态"></el-table-column>
        </el-table>
      </el-main>
      <AddProject v-if="addProjectVisible" ref="AddProject"></AddProject>
      <ProjectDetail v-if="projectDetailVisible" ref="ProjectDetail"></ProjectDetail>
      <JoinProject v-if="joinProjectVisible" ref="JoinProject"></JoinProject>
    </div>
</template>

<script>
import ProjectDetail from '../../components/menu1/projectDetail'
import JoinProject from '../../components/menu1/joinProject'
import AddProject from '../../components/menu1/addProject'
import { selectAllItemInfo, verityTender, deleteItemInfo } from '../../api/menu1/api'
export default {
  components: { AddProject, ProjectDetail, JoinProject },
  data () {
    return {
      tableData: [],
      currentRow: null,
      addProjectVisible: false,
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
    editProject () {
      if (this.currentRow != null) {
        this.$router.push({name: 'editProject', query: {row: this.currentRow}})
      } else {
        this.$message.error('请选择项目')
      }
    },
    async selectAllItemInfo () {
      const data = await selectAllItemInfo()
      this.tableData = data.data
      console.log(data.data)
    },
    projectDetail (data) {
      this.projectDetailVisible = true
      sessionStorage.setItem('itemId', data.itemId)
      this.$nextTick(() => {
        this.$refs.ProjectDetail.init(data)
      })
    },
    joinProject () {
      if (this.currentRow != null) {
        if (this.currentRow.status === '1') {
          const username = sessionStorage.getItem('user')
          const itemId = this.currentRow.itemId
          verityTender({username: username, itemId: itemId}).then((res) => {
            this.joinProjectVisible = true
            this.$nextTick(() => {
              this.$refs.JoinProject.init(this.currentRow)
            })
          })
        } else {
          this.$message.error('项目不在进行中')
        }
      } else {
        this.$message.error('请选择项目！')
      }
    },
    deleteProject () {
      if (this.currentRow != null) {
        this.$confirm('删除后不可恢复，确认删除？')
          .then(async _ => {
            await deleteItemInfo({itemId: this.currentRow.itemId})
            this.selectAllItemInfo()
          })
          .catch(_ => {})
      } else {
        this.$message.error('请选择项目！')
      }
    }
  },
  created () {
    this.selectAllItemInfo()
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

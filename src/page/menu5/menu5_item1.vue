<template>
    <div class="menu5_item1">
      <el-main>
        <el-table
            :data="tableData.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()) || data.realName.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%"
            max-height="650"
            border>
            <el-table-column
              label="用户账号"
              width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.username }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="姓名"
              width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.realName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="用户组"
              width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.roleName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="邮箱"
              width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.email }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="手机号"
              width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.mobile }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="状态"
              width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.status }}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="180">
              <template slot="header" slot-scope="scope">
                <el-input
                  style="width:200px"
                  v-model="search"
                  size="mini"
                  placeholder="输入用户账号或姓名搜索"/>
              </template>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)" :disabled="scope.row.status === '禁用'">删除</el-button>
              </template>
            </el-table-column>
        </el-table>
        <EditUser v-if="editUserVisible" ref="EditUser"></EditUser>
      </el-main>
    </div>
</template>

<script>
import { getUserList, deleteUser } from '../../api/api'
import EditUser from '../../components/menu5/editUser'
export default {
  components: { EditUser },
  data () {
    return {
      tableData: {
        username: '',
        realName: '',
        roleName: '',
        email: '',
        mobile: '',
        status: ''
      },
      editUserVisible: false,
      search: ''
    }
  },
  methods: {
    async getUser () {
      const data = await getUserList()
      this.tableData = data.data
      console.log(data.data)
    },
    handleEdit (index, row) {
      this.editUserVisible = true
      this.$nextTick(() => {
        this.$refs.EditUser.init()
      })
      console.log(index, row)
    },
    async handleDelete (index, row) {
      await deleteUser(row.userId)
      this.getUser()
    }
  },
  created () {
    this.getUser()
  }
}
</script>

<style scope>
</style>

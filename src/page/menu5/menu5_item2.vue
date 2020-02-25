<template>
    <div class="menu5_item2">
      <el-main>
        <el-table :data="tableData" style="width: 100%" max-height="750px" @current-change="handleCurrentChange" border>
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="user" label="用户账号" width="200"></el-table-column>
          <el-table-column prop="ip" label="IP地址" width="200"></el-table-column>
          <el-table-column prop="visitTime" label="访问日期" width="200"></el-table-column>
          <el-table-column prop="action" label="动作" width="200"></el-table-column>
          <el-table-column prop="time" label="响应时间"></el-table-column>
        </el-table>
      </el-main>
    </div>
</template>

<script>
import { getLogList } from '../../api/api'
export default {
  data () {
    return {
      tableData: [],
      currentRow: ''
    }
  },
  methods: {
    setCurrent (row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    async getLogList () {
      const data = await getLogList()
      this.tableData = data.data
      console.log(data.data)
    }
  },
  created () {
    this.getLogList()
  }
}
</script>

<style scope>
</style>

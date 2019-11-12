<template>
    <div class="menu1_item1">
    <!-- 供应商管理 -->
      <div class="blank">
      </div>
      <div class="topHead">
        <div class="buttonList">
          <el-button @click="addMessage">发布消息</el-button>
          <el-button>查看消息</el-button>
          <el-button type="primary">回复消息</el-button>
          <el-button type="primary">撤销消息</el-button>
        </div>
      </div>
      <el-main>
        <el-table strip border ref="singleTable" :data="tableData" highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
          <el-table-column property="companyNumber" label="发布人名称" width="200"></el-table-column>
          <el-table-column property="companyName" label="发布时间" width="250"></el-table-column>
          <el-table-column property="telephone" label="是否已回复" width="200"></el-table-column>
          <el-table-column property="email" label="回复人名称" width="200"></el-table-column>
          <el-table-column property="createUserName" label="回复时间" width="250"></el-table-column>
          <el-table-column property="contact" label="发布内容"></el-table-column>
        </el-table>
      </el-main>
      <AddMessage v-if="addMessageVisible" ref="AddMessage"></AddMessage>
    </div>
</template>

<script>
import AddMessage from '../../components/menu1/addMessage'
export default {
  components: { AddMessage },
  data () {
    return {
      tableData: [],
      currentRow: null,
      addMessageVisible: false
    }
  },
  methods: {
    setCurrent (row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    addMessage () {
      this.addMessageVisible = true
      this.$nextTick(() => {
        this.$refs.AddMessage.init()
      })
    }
  },
  created () {
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

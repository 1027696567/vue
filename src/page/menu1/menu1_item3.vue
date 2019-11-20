<template>
    <div class="menu1_item1">
    <!-- 供应商管理 -->
      <div class="blank">
      </div>
      <div class="topHead">
        <div class="buttonList">
          <el-button @click="addMessage">发布消息</el-button>
          <el-button disabled>查看消息</el-button>
          <el-button @click="replyMessage" type="primary">回复消息</el-button>
          <el-button type="primary" disabled>撤销消息</el-button>
        </div>
      </div>
      <el-main>
        <el-table strip border ref="singleTable" :data="tableData" highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
          <el-table-column property="publishUsername" label="发布人名称" width="200"></el-table-column>
          <el-table-column property="publishTime" label="发布时间" width="250"></el-table-column>
          <el-table-column property="statusName" label="是否已回复" width="200"></el-table-column>
          <el-table-column property="replyUsername" label="回复人名称" width="200"></el-table-column>
          <el-table-column property="replyTime" label="回复时间" width="250"></el-table-column>
          <el-table-column property="publishContent" label="发布内容"></el-table-column>
          <el-table-column property="replyContent" label="回复内容"></el-table-column>
        </el-table>
      </el-main>
      <AddMessage v-if="addMessageVisible" ref="AddMessage"></AddMessage>
      <ReplyMessage v-if="replyMessageVisible" ref="ReplyMessage"></ReplyMessage>
    </div>
</template>

<script>
import AddMessage from '../../components/menu1/addMessage'
import ReplyMessage from '../../components/menu1/replyMessage'
import { selectAllNoticeInfo } from '../../api/menu1/api'
export default {
  components: { AddMessage, ReplyMessage },
  data () {
    return {
      tableData: [],
      currentRow: null,
      addMessageVisible: false,
      replyMessageVisible: false
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
    },
    async selectAllNoticeInfo () {
      const data = await selectAllNoticeInfo()
      this.tableData = data.data
    },
    replyMessage () {
      if (this.currentRow !== null) {
        if (this.currentRow.statusName === '未回复') {
          this.replyMessageVisible = true
          this.$nextTick(() => {
            this.$refs.ReplyMessage.init(this.currentRow)
          })
        } else {
          this.$message.error('该消息已回复')
        }
      } else {
        this.$message.error('请选择一条信息')
      }
    }
  },
  created () {
    this.selectAllNoticeInfo()
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

<template>
    <div class="editProject">
    <!-- 新建合同页面 -->
      <div class="blank">
      </div>
      <div class="topHead">
        <div class="buttonList">
          <el-page-header @back="goBack" content="新建合同">
          </el-page-header>
        </div>
      </div>
      <el-main>
        <el-form ref="form" :model="form" label-width="80px">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="合同基本信息" name="1">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="组织名称："><el-input v-model="form.name"></el-input></el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="项目名称："><el-input v-model="form.name"></el-input></el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="合同编号："><el-input v-model="form.name"></el-input></el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="合同名称："><el-input v-model="form.name"></el-input></el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="甲方："><el-input v-model="form.name"></el-input></el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="乙方："><el-input v-model="form.name"></el-input></el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="合同性质：">
                    <el-select v-model="form.region" placeholder="请选择合同性质">
                      <el-option label="直接合同" value="shanghai"></el-option>
                      <el-option label="**合同" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="签约时间："><el-date-picker v-model="form.endTime" type="datetime" placeholder="选择日期时间" default-time="12:00:00"></el-date-picker></el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="责任部门："><el-input v-model="form.name"></el-input></el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="责任人："><el-input v-model="form.name"></el-input></el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="制单人："><el-input v-model="form.name"></el-input></el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="制单时间："><el-input v-model="form.name"></el-input></el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="合同详细信息" name="2">
              <el-row>
                  <el-col :span="24">
                      <el-table size="mini" :data="master_user.data" border style="width: 100%" highlight-current-row>
                          <el-table-column type="index"></el-table-column>
                          <el-table-column v-for="(v,i) in master_user.columns" :key="i" :prop="v.field" :label="v.title" :width="v.width">
                              <template slot-scope="scope">
                                  <span v-if="scope.row.isSet">
                                      <el-input size="mini" placeholder="请输入内容" v-model="master_user.sel[v.field]">
                                      </el-input>
                                  </span>
                                  <span v-else>{{scope.row[v.field]}}</span>
                              </template>
                          </el-table-column>
                          <el-table-column label="操作" width="100">
                              <template slot-scope="scope">
                                  <span class="el-tag el-tag--info el-tag--mini" style="cursor: pointer;" @click="pwdChange(scope.row,scope.$index,true)">
                                      {{scope.row.isSet?'保存':"修改"}}
                                  </span>
                                  <span v-if="!scope.row.isSet" class="el-tag el-tag--danger el-tag--mini" style="cursor: pointer;">
                                      删除
                                  </span>
                                  <span v-else class="el-tag  el-tag--mini" style="cursor: pointer;" @click="pwdChange(scope.row,scope.$index,false)">
                                      取消
                                  </span>
                              </template>
                          </el-table-column>
                      </el-table>
                  </el-col>
                  <el-col :span= "24">
                      <el-button class="el-table-add-row" @click="addMasterUser()" style=" width: 100%">+ 添加</el-button>
                  </el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </el-form>
        <div class="submit">
          <el-button type="primary" style="float: right">立即保存</el-button>
        </div>
      </el-main>
    </div>
</template>

<script>
export default {
  data () {
    return {
      activeNames: ['1', '2', '3', '4'],
      form: {
      },
      master_user: {
        sel: null,
        columns: [
          { field: 'type', title: '远程类型', width: 120 },
          { field: 'addport', title: '连接地址', width: 150 },
          { field: 'user', title: '登录用户', width: 120 },
          { field: 'pwd', title: '登录密码', width: 220 },
          { field: 'info', title: '其他信息' }
        ],
        data: []
      }
    }
  },
  methods: {
    goBack () {
      this.$router.push('/menu2_item1')
    },
    saveInfo () {

    },
    handleChange (val) {
      console.log(val)
    },
    // 读取表格数据
    readMasterUser () {
    // 根据实际情况，自己改下啊
      this.master_user.data.map(i => {
        // i.id = generateId.get() 模拟后台插入成功后有了id
        // 给后台返回数据添加`isSet`标识
        i.isSet = false
        return i
      })
    },
    // 添加账号
    addMasterUser () {
      for (let i of this.master_user.data) {
        if (i.isSet) return this.$message.warning('请先保存当前编辑项')
      }
      let j = { id: 0, 'type': '', 'addport': '', 'user': '', 'pwd': '', 'info': '', 'isSet': true, '_temporary': true }
      this.master_user.data.push(j)
      this.master_user.sel = JSON.parse(JSON.stringify(j))
    },
    // 修改
    pwdChange (row, index, cg) {
    // 点击修改 判断是否已经保存所有操作
      for (let i of this.master_user.data) {
        if (i.isSet && i.id !== row.id) {
          this.$message.warning('请先保存当前编辑项')
          return false
        }
      }
      // 是否是取消操作
      if (!cg) {
        if (!this.master_user.sel.id) { this.master_user.data.splice(index, 1) }
        return row.isSet === !row.isSet
      }
      // 提交数据
      if (row.isSet) {
        // 项目是模拟请求操作  自己修改下
        // let data = JSON.parse(JSON.stringify(this.master_user.sel))
        // for (let k in data) row[k] = data[k]
        this.$message.success('保存成功!')
        // 然后这边重新读取表格数据
        this.readMasterUser()
        row.isSet = false
      } else {
        this.master_user.sel = JSON.parse(JSON.stringify(row))
        row.isSet = true
      }
    },
    removeDomain (item) {
      var index = this.form.domains.indexOf(item)
      if (index !== -1) {
        this.form.domains.splice(index, 1)
      }
    },
    addDomain () {
      this.form.domains.push({
        value: '',
        key: Date.now()
      })
    }
  },
  created () {
  }
}
</script>

<style>
  .el-main{
    min-width: 1000px;
    overflow: hidden;
  }
  .editProject{
    width: 100%;
    height: auto;
    padding:0 15% 0 15%;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
  }
  .blank{
    width:100%;
    height:15px;
  }
  .el-form-item__label {
    width: 95px!important;
    padding: 0 5px 0 5px!important;
    webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .el-form-item__content {
    margin-left: 95px!important;
  }
  .submit {
    padding: 20px 0 20px 0;
    width: 100%;
    height: auto;
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
  .el-table-add-row {
    margin-top: 10px;
    width: 100%;
    height: 34px;
    border: 1px dashed #c1c1cd;
    border-radius: 3px;
    cursor: pointer;
    justify-content: center;
    display: flex;
  }
</style>

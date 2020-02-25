<template>
    <div class="editContract">
    <!-- 变更合同页面 -->
      <div class="blank">
      </div>
      <div class="topHead">
        <div class="buttonList">
          <el-page-header @back="goBack" content="变更合同">
          </el-page-header>
        </div>
      </div>
      <el-main>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="合同基本信息" name="1">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="项目编号：" prop="itemNumber" >
                    <el-select v-model="form.itemNumber" @change="getRole($event)" disabled>
                      <el-option
                        v-for="item in itemInfo"
                        :key="item.itemId"
                        :label="item.itemNumber"
                        :value="item.itemNumber">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="项目名称：" prop="itemName">
                    <el-select v-model="form.itemName" @change="getList($event)" disabled>
                      <el-option
                        v-for="item in itemInfo"
                        :key="item.itemId"
                        :label="item.itemName"
                        :value="item.itemName">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="合同编号：" prop="contractNumber"><el-input v-model="form.contractNumber" disabled></el-input></el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="合同名称：" prop="contractName"><el-input v-model="form.contractName" disabled></el-input></el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="甲方：" prop="firstParty"><el-input v-model="form.firstParty" disabled></el-input></el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="乙方：" prop="secondParty"><el-input v-model="form.secondParty" disabled></el-input></el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="丙方：" prop="thirdParty"
                    :rules="this.form.contractTypes === '2'?[{ required: true, message: '请填写丙方信息', trigger: 'blur' }]:[]">
                    <el-input v-model="form.thirdParty" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="主合同：" prop="fatherNumber"
                    :rules="this.form.contractTypes === '3'?[{ required: true, message: '请选择主合同编码', trigger: 'change' }]:[]">
                    <el-select v-model="form.fatherNumber" placeholder="请选择主合同" disabled>
                      <el-option
                        v-for="item in contractInfo"
                        :key="item.contractId"
                        :label="item.contractNumber"
                        :value="item.contractNumber">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="合同性质：" prop="contractTypes">
                    <el-select v-model="form.contractTypes" placeholder="请选择合同性质" @change="reset($event)" disabled>
                      <el-option label="直接合同" value="1"></el-option>
                      <el-option label="三方合同" value="2"></el-option>
                      <el-option label="补充合同" value="3"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="签约时间：" prop="contractTime"><el-date-picker v-model="form.contractTime" type="datetime" placeholder="选择日期时间" default-time="12:00:00" disabled></el-date-picker></el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="责任部门：" prop="dutyName"><el-input v-model="form.dutyName" disabled></el-input></el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="责任人：" prop="dutyUsername"><el-input v-model="form.dutyUsername" disabled></el-input></el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="制单人：" prop="createUsername"><el-input v-model="form.createUsername" disabled></el-input></el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="制单时间：" prop="createTime"><el-date-picker v-model="form.createTime" type="datetime" placeholder="选择日期时间" default-time="12:00:00" disabled></el-date-picker></el-form-item>
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
                                  <span v-if="!scope.row.isSet" class="el-tag el-tag--danger el-tag--mini" style="cursor: pointer;" @click="pwdChange(scope.row,scope.$index,false)">
                                      删除
                                  </span>
                                  <span v-else class="el-tag  el-tag--mini" style="cursor: pointer;" @click="pwdChange(scope.row,scope.$index,false)">
                                      删除
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
          <el-button type="primary" style="float: right" @click="submit('form')">立即保存</el-button>
        </div>
      </el-main>
    </div>
</template>

<script>
import { selectAllItemInfo } from '../api/menu1/api'
import { addContractInfo, selectAllContractInfo, selectContractByContractNumber, selectContractDetailByContractNumber, updateContractDetail } from '../api/menu2/api'
export default {
  data () {
    return {
      activeNames: ['1', '2', '3', '4'],
      form: {
        itemNumber: '',
        itemName: '',
        contractNumber: '',
        contractName: '',
        contractTypes: '1',
        fatherNumber: '',
        thirdParty: ''
      },
      submitForm: {},
      master_user: {
        sel: null,
        columns: [
          { field: 'detailName', title: '详细信息', width: 250 },
          { field: 'detailContent', title: '内容', width: 400 },
          { field: 'detailDescribe', title: '描述' }
        ],
        data: []
      },
      itemInfo: [],
      contractInfo: [],
      rules: {
        itemNumber: [{required: true, message: '请选择项目编号', trigger: 'change'}],
        itemName: [{required: true, message: '请选择项目名称', trigger: 'change'}],
        contractNumber: [{required: true, message: '请输入合同编号', trigger: 'blur'}],
        contractName: [{required: true, message: '请输入合同名称', trigger: 'blur'}],
        firstParty: [{required: true, message: '请输入甲方', trigger: 'blur'}],
        secondParty: [{required: true, message: '请输入乙方', trigger: 'blur'}],
        contractTypes: [{required: true, message: '请输入合同性质', trigger: 'blur'}],
        contractTime: [{required: true, message: '请选择签约时间', trigger: 'change'}],
        dutyName: [{required: true, message: '请输入责任部门', trigger: 'blur'}],
        dutyUsername: [{required: true, message: '请输入责任人', trigger: 'blur'}],
        createUsername: [{required: true, message: '请输入制单人', trigger: 'blur'}]
      }
    }
  },
  methods: {
    getRole (prov) {
      for (var val of this.itemInfo) {
        if (prov === val.itemNumber) {
          this.form.itemName = val.itemName
        }
      }
    },
    getList (prov) {
      for (var val of this.itemInfo) {
        if (prov === val.itemName) {
          this.form.itemNumber = val.itemNumber
        }
      }
    },
    reset (prov) {
      this.$refs.form.clearValidate(['fatherNumber', 'thirdParty'])
      this.form.fatherNumber = null
      this.form.thirdParty = null
    },
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
        // i.id = generateId.get()
        // 模拟后台插入成功后有了id
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
      let j = { id: 0, 'detailName': '', 'detailContent': '', 'detailDescribe': '', 'isSet': true, '_temporary': true }
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
        let data = JSON.parse(JSON.stringify(this.master_user.sel))
        for (let k in data) row[k] = data[k]
        this.$message.success('保存成功!')
        // 然后这边重新读取表格数据
        this.readMasterUser()
        row.isSet = false
      } else {
        this.master_user.sel = JSON.parse(JSON.stringify(row))
        row.isSet = true
      }
    },
    async selectAllItemInfo () {
      const data = await selectAllItemInfo()
      this.itemInfo = data.data
    },
    async selectAllContractInfo () {
      const data = await selectAllContractInfo()
      this.contractInfo = data.data
    },
    async submit (form) {
      for (let k in this.master_user.data) this.master_user.data[k].contractNumber = this.form.contractNumber
      await updateContractDetail(this.master_user.data)
      this.$router.push('/menu2_item1')
      this.$message.success('合同修改成功')
    },
    async addContractInfo () {
      await addContractInfo(this.form)
    },
    async init () {
      const contractNumber = sessionStorage.getItem('contractNumber')
      const data = await selectContractByContractNumber({contractNumber: contractNumber})
      this.selectContractDetailByContractNumber(contractNumber)
      this.form = data.data
    },
    async selectContractDetailByContractNumber (contractNumber) {
      const data = await selectContractDetailByContractNumber({contractNumber: contractNumber})
      this.master_user.data = data.data
    }
  },
  created () {
    this.selectAllItemInfo()
    this.selectAllContractInfo()
    this.init()
  }
}
</script>

<style>
  .el-main{
    min-width: 1000px;
    overflow: hidden;
  }
  .editContract{
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
 .editContract .el-form-item__label {
    width: 95px!important;
    padding: 0 5px 0 5px!important;
    webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
 .editContract .el-form-item__content {
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
 .editContract .el-table-add-row {
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

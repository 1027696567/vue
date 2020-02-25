<template>
    <div class="editProject">
    <!-- 编辑项目详情页面 -->
      <div class="blank">
      </div>
      <div class="topHead">
        <div class="buttonList">
          <el-page-header @back="goBack" content="项目详情">
          </el-page-header>
        </div>
      </div>
      <el-main>
        <el-form ref="form" :model="form" label-width="80px">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="项目信息" name="1">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="项目编号："><el-input v-model="form.itemNumber" readOnly></el-input></el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="项目名称："><el-input v-model="form.itemName"></el-input></el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="项目类别：">
                    <el-select v-model="form.itemClasses" placeholder="请选择项目类别">
                      <el-option label="原材料" value="1"></el-option>
                      <el-option label="废料处理" value="2"></el-option>
                      <el-option label="房屋建设" value="3"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="招标人："><el-input v-model="form.username" readOnly></el-input></el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="招标地址："><el-input v-model="form.address"></el-input></el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <el-form-item label="电子邮箱："><el-input v-model="form.email"></el-input></el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="联系人："><el-input v-model="form.contact"></el-input></el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="联系电话："><el-input v-model="form.telephone"></el-input></el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="传真："><el-input v-model="form.fax"></el-input></el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="招标时间："><el-date-picker v-model="form.beginTime" type="datetime" placeholder="选择日期时间" default-time="12:00:00"></el-date-picker></el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="截止时间："><el-date-picker v-model="form.endTime" type="datetime" placeholder="选择日期时间" default-time="12:00:00"></el-date-picker></el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="项目状态：">
                    <el-select v-model="form.status" placeholder="请选择项目状态">
                      <el-option label="待开始" value="0"></el-option>
                      <el-option label="进行中" value="1"></el-option>
                      <el-option label="完成" value="2"></el-option>
                      <el-option label="流标" value="-1"></el-option>
                      <el-option label="废标" value="-2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="项目细项--前往成本管理完善" name="2">
              <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="date" label="科目编码" width="180">
                </el-table-column>
                <el-table-column prop="name" label="科目名称" width="180">
                </el-table-column>
                <el-table-column prop="address" label="目标成本">
                </el-table-column>
              </el-table>
            </el-collapse-item>
            <el-collapse-item title="招标方式" name="3">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="公开参考价：">
                    <el-select v-model="form.referencePrice" placeholder="请选择是否公开参考价">
                      <el-option label="是" value="0"></el-option>
                      <el-option label="否" value="1"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="最少竞争数：">
                    <el-select v-model="form.leastNumber" placeholder="请选择至少参与人数">
                      <el-option label="3" value="3"></el-option>
                      <el-option label="4" value="4"></el-option>
                      <el-option label="5" value="5"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="中标方式：">
                    <el-select v-model="form.biddingWay" placeholder="请选择中标方式">
                      <el-option label="价低者得" value="1"></el-option>
                      <el-option label="价高者得" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </el-form>
        <div class="submit">
          <el-button type="primary" style="float: right" @click="onSubmit">立即保存</el-button>
        </div>
      </el-main>
    </div>
</template>

<script>
import { updateItemInfo } from '../api/menu1/api'
export default {
  data () {
    return {
      activeNames: ['1', '2', '3'],
      form: {
        itemId: ''
      },
      tableData: null
    }
  },
  methods: {
    goBack () {
      this.$router.push('/menu1_item2')
    },
    saveInfo () {

    },
    handleChange (val) {
      console.log(val)
    },
    init () {
      const data = this.$route.query.row
      if (JSON.stringify(data) === '"[object Object]"') {
        this.$router.push('/menu1_item2')
        this.$message.error('请重新选择')
      } else {
        this.form = data
      }
    },
    async onSubmit () {
      await updateItemInfo(this.form)
      this.$router.push('/menu1_item2')
      this.$message.success('修改成功')
    }
  },
  created () {
    this.init()
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
 .editProject .el-form-item__label {
    width: 95px!important;
    padding: 0 5px 0 5px!important;
    webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
 .editProject .el-form-item__content {
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
</style>

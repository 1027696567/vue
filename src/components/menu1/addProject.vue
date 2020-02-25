<template>
  <div class="addProject">
    <!-- 添加招标文件弹框 -->
    <el-dialog title="新建" :visible.sync="dialogVisible" width="700px" :before-close="closeDiv">
      <el-form label-position="right" :rules="rules" ref="form" :model="form" label-width="80px">
      <h1 style="-webkit-margin-before: 0px;">项目信息</h1>
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目编号：" prop="itemNumber" style="width:300px">
              <el-input v-model="form.itemNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目名称：" prop="itemName" style="width:300px">
              <el-input v-model="form.itemName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目类别：" prop="itemClasses" style="width:300px">
              <el-select v-model="form.itemClasses" placeholder="请选择项目类别">
                <el-option label="原材料" value="1"></el-option>
                <el-option label="废料处理" value="2"></el-option>
                <el-option label="房屋建设" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="招标地址：" prop="address" style="width:300px">
              <el-input v-model="form.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="电子邮箱：" prop="email" style="width:300px">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="传真：" prop="fax" style="width:300px">
              <el-input v-model="form.fax"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人：" prop="contact" style="width:300px">
              <el-input v-model="form.contact"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话：" prop="telephone" style="width:300px">
              <el-input v-model.number="form.telephone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="招标时间：" prop="beginTime" style="width:300px">
              <el-date-picker v-model="form.beginTime" type="datetime" placeholder="请选择开始时间" default-time="12:00:00" style="width:205px">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="截止时间：" prop="endTime" style="width:300px">
              <el-date-picker v-model="form.endTime" type="datetime" placeholder="请选择截止时间" default-time="12:00:00" style="width:205px">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <h1 style="-webkit-margin-before: 0px;">招标方式</h1>
        <el-row>
          <el-col :span="12">
            <el-form-item label="最少人数：" prop="leastNumber" style="width:300px">
              <el-select v-model="form.leastNumber" placeholder="请选择至少参与人数">
                <el-option label="3" value="3"></el-option>
                <el-option label="4" value="4"></el-option>
                <el-option label="5" value="5"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="中标方式：" prop="biddingWay" style="width:300px">
              <el-select v-model="form.biddingWay" placeholder="请选择中标方式">
                <el-option label="价低者得" value="1"></el-option>
                <el-option label="价高者得" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item style="margin:20px 0 0 180px">
          <el-button type="primary" @click="onSubmit('form')">确认</el-button>
          <el-button @click="resetForm('form')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { addItemInfo } from '../../api/menu1/api'
export default {
  data () {
    return {
      dialogVisible: false,
      form: {
        itemNumber: '',
        itemName: '',
        itemClasses: '',
        address: '',
        email: '',
        fax: '',
        contact: '',
        telephone: '',
        beginTime: '',
        endTime: '',
        leastNumber: '',
        biddingWay: ''
      },
      rules: {
        itemNumber: [
          {required: true, message: '请输入项目编号', trigger: 'blur'}
        ],
        itemName: [
          {required: true, message: '请输入项目名称', trigger: 'blur'}
        ],
        itemClasses: [
          {required: true, message: '请选择项目类别', trigger: 'change'}
        ],
        address: [
          {required: true, message: '请输入招标地址', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入电子邮箱', trigger: 'blur'}
        ],
        fax: [
          {required: true, message: '请输入传真号码', trigger: 'blur'}
        ],
        contact: [
          {required: true, message: '请输入联系人姓名', trigger: 'blur'}
        ],
        telephone: [
          {required: true, message: '请输入联系电话', trigger: 'blur'},
          {type: 'number', message: '联系电话必须为数字'}
        ],
        beginTime: [
          {required: true, message: '请选择招标开始时间', trigger: 'change'}
        ],
        endTime: [
          {required: true, message: '请选择招标截止时间', trigger: 'change'}
        ],
        leastNumber: [
          {required: true, message: '请选择至少参与人数', trigger: 'change'}
        ],
        biddingWay: [
          {required: true, message: '请选择中标方式', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    init () {
      this.dialogVisible = true
    },
    onSubmit (form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          this.form.username = sessionStorage.getItem('user')
          await addItemInfo(this.form).then((res) => {
            if (res.data === 1) {
              this.$message.success('创建成功！')
              this.$refs[form].resetFields()
              this.dialogVisible = false
              this.parent()
            } else {
              this.$message.error('项目已存在！')
            }
          })
        } else {
          return false
        }
      })
    },
    resetForm (form) {
      this.$refs[form].resetFields()
      this.dialogVisible = false
    },
    closeDiv (done) {
      this.$refs['form'].resetFields()
      done()
    },
    parent () {
      this.$parent.selectAllItemInfo()
    }
  },
  created () {

  }
}
</script>
<style>
.addProject .el-form-item__label {
  width: 95px!important;
  padding: 0 5px 0 5px!important;
  webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.addProject .el-form-item__content {
  margin-left: 95px!important;
}
</style>

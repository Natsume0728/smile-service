<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="auto" label-position="left">
    <h3>新增商户</h3>
    <el-row>
      <el-col :span="12">
        <el-form-item label="联系地址:">
          <el-input v-model="form.address" placeholder="请输入联系地址"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="银行账户开户名称:">
          <el-input v-model="form.bankAccountName" placeholder="请输入银行账户开户名称"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="银行账号:">
          <el-input v-model="form.bankAccountNo" placeholder="请输入银行账号"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="开户银行名称:">
          <el-input v-model="form.bankName" placeholder="请输入开户银行名称"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="联系邮箱:">
          <el-input v-model="form.email" placeholder="请输入联系邮箱"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="商户别名:">
          <el-input v-model="form.merchantAlias" placeholder="请输入商户别名"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-form-item label="商户级别:" prop="merchantLevel">
          <el-input v-model="form.merchantLevel" placeholder="请输入商户级别"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="商户名称:" prop="merchantName">
          <el-input v-model="form.merchantName" placeholder="请输入商户名称"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-form-item label="上级商户编号:">
          <el-input v-model="form.merchantNoParent" placeholder="请输入上级商户编号"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="联系电话:" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入联系电话"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="结算周期:" prop="settlementInterval">
          <el-select v-model="form.settlementInterval" placeholder="请输入结算周期">
            <el-option label="月结" :value="1"></el-option>
            <el-option label="季结" :value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="结算方式:" prop="settlementMode">
          <el-select v-model="form.settlementMode" placeholder="请输入结算方式">
            <el-option label="线下结算" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="">
          <el-button type="primary" @click="add">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-col>
    </el-row>

  </el-form>
</template>

<script>
import request from '@/utils/request'

export default {
  filters: {
    orderStateFilter(value) {
      if (value === 1) return '待审核'
      if (value === 2) return '已取消'
      if (value === 3) return '审核不通过'
      if (value === 4) return '审核通过'
      return '--'
    }
  },

  data() {
    return {
      rules: {
        merchantLevel: [
          { required: true, message: '请输入商户级别', trigger: 'blur' },
        ],
        merchantName: [
          { required: true, message: '请输入商户名称', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
        ],
        settlementInterval: [
          { required: true, message: '请选择结算周期', trigger: 'blur' },
        ],
        settlementMode: [
          { required: true, message: '请选择结算方式', trigger: 'blur' },
        ],
      },
      form: {
        address: undefined,
        bankAccountName: undefined,
        bankAccountNo: undefined,
        bankName: undefined,
        createTime: undefined,
        createUser: undefined,
        email: undefined,
        id: undefined,
        merchantAlias: undefined,
        merchantLevel: undefined,
        merchantName: undefined,
        merchantNo: undefined,
        merchantNoParent: undefined,
        phone: undefined,
        settlementInterval: undefined,
        settlementMode: undefined,
        updateTime: undefined,
        updateUser: undefined,
        validSate: undefined
      },
    }
  },

  methods: {
    async add() {
      const { code } = await request({
        method: 'POST',
        url: '/manage-api/merchant/add',
        data: this.form,
      })
      if (code === '0000') {
        this.$emit('refresh')
      }
    },

    cancel() {
      this.$emit('refresh')
    },
  }
}
</script>

<style>

</style>

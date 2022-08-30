<template>
  <el-form ref="form" :model="form" label-width="auto" label-position="left">
    <h3>商户单信息</h3>
    <el-row>
      <el-col :span="12">
        <el-form-item label="联系地址:">
          <div>{{ form.address || '--' }}</div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="银行账户开户名称:">
          <div>{{ form.bankAccountName || '--' }}</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="银行账号:">
          <div>{{ form.bankAccountNo || '--' }}</div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="开户银行名称:">
          <div>{{ form.bankName || '--' }}</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="创建时间:">
          <div>{{ form.createTime }}</div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="创建人:">
          <div>{{ form.createUser }}</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="联系邮箱:">
          <div>{{ form.email }}</div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="权益发放时间:">
          <div>{{ form.grantTimeBegin || '--' }}</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="商户id:">
          <div>{{ form.id }}</div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="商户别名:">
          <div>{{ form.merchantAlias }}</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="商户级别:">
          <div>{{ form.merchantLevel }}</div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="商户名称:">
          <div>{{ form.merchantName }}</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="商户编号:">
          <div>{{ form.merchantNo }}</div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="上级商户编号:">
          <div>{{ form.merchantNoParent }}</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="联系电话:">
          <div>{{ form.phone }}</div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="结算周期:">
          <div>{{ form.settlementInterval === 1 ? '月结' :form.settlementInterval === 2 ? '季结' : '--' }}</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="结算方式:">
          <div>{{ form.settlementMode === 1 ? '线下结算' : '--' }}</div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="更新时间:">
          <div>{{ form.updateTime }}</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="更新人:">
          <div>{{ form.updateUser }}</div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="是否有效:">
          <div>{{ form.validSate === 0 ? '无效' : form.validSate === 1 ? '有效' : '--' }}</div>
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
  props: {
    id: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      form: {
        'address': '',
        'bankAccountName': '',
        'bankAccountNo': '',
        'bankName': '',
        'createTime': '',
        'createUser': '',
        'email': '',
        'id': null,
        'merchantAlias': '',
        'merchantLevel': null,
        'merchantName': '',
        'merchantNo': '',
        'merchantNoParent': '',
        'phone': '',
        'settlementInterval': null,
        'settlementMode': null,
        'updateTime': '',
        'updateUser': '',
        'validSate': null
      },
    }
  },
  watch: {
    id: {
      handler(id) {
        this.getMerchant(id)
      },
      immediate: true,
    }
  },
  methods: {
    async getMerchant(merchantId) {
      const { data } = await request({
        method: 'GET',
        url: '/manage-api/merchant/get',
        params: { merchantId },
      })
      this.form = Object.assign(this.form, data)
    },
  }
}
</script>

<style>

</style>

<template>
  <el-form ref="form2" :model="form2" label-width="auto" label-position="left">
    <h3>商户订单信息</h3>
    <el-row>
      <el-col :span="12">
        <el-form-item label="审核意见:">
          <div>{{ form2.auditRemark }}</div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="创建时间:">
          <div>{{ form2.creteTime || '--' }}</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="创建人:">
          <div>{{ form2.createUser }}</div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="订单权益发放份数:">
          <div>{{ form2.grantNum || '--' }}</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="实际权益发放份数:">
          <div>{{ form2.grantNumActual }}</div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="发放状态:">
          <div>{{ form2.grantState }}</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="权益发放实际时间:">
          <div>{{ form2.grantTimeActual }}</div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="权益发放时间:">
          <div>{{ form2.grantTimeBegin }}</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="商户订单id:">
          <div>{{ form2.id }}</div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="商户编号:">
          <div>{{ form2.merchantNo }}</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="商户订单编号:">
          <div>{{ form2.merchantOrderNo }}</div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="订单状态:">
          <div>{{ form2.orderState | orderStateFilter }}</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="权益发放后领取截止时间限制:">
          <div>{{ form2.receiveTimeLimit }}</div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="更新时间:">
          <div>{{ form2.updateTime }}</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="更新人:">
          <div>{{ form2.updateUser }}</div>
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
      form2: {
        auditRemark: '',
        createTime: '',
        createUser: '',
        grantNum: '',
        grantNumActual: '',
        grantState: '',
        grantTimeActual: '',
        grantTimeBegin: '',
        id: '',
        merchantNo: '',
        merchantOrderNo: '',
        orderState: '',
        receiveTimeLimit: '',
        updateTime: '',
        updateUser: '',
      },
    }
  },
  watch: {
    id: {
      handler(id) {
        this.getOrder(id)
      },
      immediate: true,
    }
  },
  methods: {
    async getOrder(orderId) {
      const { data } = await request({
        method: 'GET',
        url: 'https://dev.defenderfintech.com/smile-api/manage-api/merchantOrder/get',
        params: { orderId },
      })
      this.form2 = Object.assign(this.form2, data)
    },
  }
}
</script>

<style>

</style>

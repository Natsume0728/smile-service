<template>
  <el-form :model="form" label-width="auto" label-position="left">
    <h3>新增商户订单</h3>
    <el-form-item label="订单权益发放份数:">
      <el-input v-model="form.grantNum" placeholder="请输入订单权益发放份数"></el-input>
    </el-form-item>
    <el-form-item label="权益发放时间:">
      <el-input v-model="form.grantTimeBegin" placeholder="请输入权益发放时间 示例值(2022-09-19 00:00:00)"></el-input>
    </el-form-item>
    <el-form-item label="权益发放后领取截止时间限制:">
      <el-input v-model="form.receiveTimeLimit" placeholder="请输入权益发放后领取截止时间限制 示例值(2022-09-29 00:00:00)"></el-input>
    </el-form-item>
    <el-button type="primary" @click="addOrder">新增</el-button>
  </el-form>
</template>

<script>
import request from '@/utils/request'

export default {
  data() {
    return {
      form: {
        grantNum: undefined,
        grantTimeBegin: undefined,
        receiveTimeLimit: undefined,
        // grantNum: '10',
        // grantTimeBegin: '2022-09-19 00:00:00',
        // receiveTimeLimit: '2022-09-29 00:00:00',
      },
    }
  },
  methods: {
    async addOrder() {
      const { code } = await request({
        method: 'post',
        url: 'https://dev.defenderfintech.com/smile-api/manage-api/merchantOrder/add',
        data: this.form,
      })
      if (code === '0000') this.$emit('refresh')
    },
  }
}
</script>

<style>

</style>

<template>
  <el-form :model="form" label-width="auto" label-position="left" size="mini">
    <h3>新增商户订单</h3>
    <el-form-item label="订单权益发放份数:">
      <el-input v-model="form.grantNum" placeholder="请输入订单权益发放份数"></el-input>
    </el-form-item>
    <el-form-item label="权益发放时间:">
      <el-date-picker
        v-model="form.grantTimeBegin"
        type="datetime"
        format="yyyy-MM-dd HH:mm:ss"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="选择权益发放时间"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item label="权益发放后领取截止时间限制:">
      <el-date-picker
        v-model="form.receiveTimeLimit"
        type="datetime"
        format="yyyy-MM-dd hh:mm:ss"
        value-format="yyyy-MM-dd hh:mm:ss"
        placeholder="选择领取截止时间"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addOrder">新增</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import request from '@/utils/request'

export default {
  props: {
    drawer: {
      type: Boolean,
      default: null,
    }
  },

  data() {
    return {
      form: {
        grantNum: undefined,
        grantTimeBegin: undefined,
        receiveTimeLimit: undefined,
      },
    }
  },

  watch: {
    drawer(v) {
      if (!v) {
        this.form = {
          grantNum: undefined,
          grantTimeBegin: undefined,
          receiveTimeLimit: undefined,
        }
      }
    }
  },
  methods: {
    cancel() {
      this.$emit('refresh')
    },

    async addOrder() {
      const { code } = await request({
        method: 'post',
        url: 'https://dev.defenderfintech.com/smile-api/manage-api/merchantOrder/add',
        data: this.form,
      })
      if (code === '0000') {
        this.$message({
          type: 'success',
          message: '添加成功'
        })
        this.$emit('refresh')
      }
    },
  }
}
</script>

<style>

</style>

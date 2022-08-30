<template>
  <div class="container">
    <div class="form-container">
      <el-form :model="form" label-width="110px" style="padding: 30px;">
        <h3>新增商户订单消费用户</h3>
        <el-form-item label="车牌号:">
          <el-input v-model="form.carNo" placeholder="请输入车牌号"></el-input>
        </el-form-item>

        <el-form-item label="消费者手机号:">
          <el-input v-model="form.phone" placeholder="请输入消费者手机号"></el-input>
        </el-form-item>

        <el-form-item label="保单号:">
          <el-input v-model="form.policyNo" placeholder="请输入保单号"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addMerchantOrderConsumer">新增</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  name: 'MerchantOrderGoodslistAdd',
  props: {
    id: {
      type: [Number, String],
      default: null,
    },
    drawer: {
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
      form: {
        carNo: undefined,
        phone: undefined,
        policyNo: undefined,
      },

    }
  },

  watch: {
    drawer(v) {
      if (!v) {
        this.form = {
          carNo: undefined,
          phone: undefined,
          policyNo: undefined,
        }
      }
    }
  },

  methods: {
    async addMerchantOrderConsumer() {
      const { code } = await request({
        method: 'POST',
        url: '/manage-api/merchantOrderConsumer/add',
        data: {
          carNo: this.form.carNo || undefined,
          phone: this.form.phone || undefined,
          policyNo: this.form.policyNo || undefined,
          orderId: this.id,
        },
      })

      if (code === '0000') {
        this.$message({
          type: 'success',
          message: '添加成功'
        })
        this.$emit('refresh')
      }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>


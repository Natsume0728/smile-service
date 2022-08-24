<template>
  <div class="container">
    <div class="form-container">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="100">
          <el-col :span="8">
            <el-form-item label="商户别名">
              <el-input v-model="form.merchantAlias" placeholder="请输入商户别名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商户级别" placeholder="请输入商户级别">
              <el-input v-model="form.merchantLevel"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商户名称" placeholder="请输入商户名称">
              <el-input v-model="form.merchantName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="100">
          <el-col :span="8">
            <el-form-item label="商户手机">
              <el-input v-model="form.phone" placeholder="请输入商户手机"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结算周期">
              <el-select v-model="form.settlementInterval" placeholder="请选择结算周期">
                <el-option label="月结" :value="1"></el-option>
                <el-option label="季结" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结算方式">
              <el-select v-model="form.settlementMode" placeholder="请选择结算方式">
                <el-option label="线下结算" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="100">
          <el-col :span="8">
            <el-form-item label="商户编号" placeholder="请输入商户编号">
              <el-input v-model="form.merchantNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="有效状态" placeholder="请输入有效状态">
              <el-input v-model="form.validSate"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button v-if="pageType === 'add'" type="primary" @click="add">新增</el-button>
              <el-button v-if="pageType === 'edit'" type="primary" @click="edit"> 保存 </el-button>
              <el-button v-if="pageType === 'add' || pageType === 'edit'" @click="reset"> 取消 </el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  name: 'BaseProductAdd', // 基础产品新增
  data() {
    return {
      merchantId: null,
      pageType: 'add',
      form: {
        merchantAlias: '',
        merchantLevel: '',
        merchantName: '',
        phone: '',
        settlementInterval: '',
        settlementMode: '',
      },
      tableData: [
        {
          buillingMethod: '0',
          startTime: '2021年12月31日',
          endTime: '2021年12月31日',
          buillingRule: '1',
          date: '233',
          productStatu: '1',
        },
      ],
      currentPage: 1,
    }
  },
  mounted() {
    console.log(this.$route.params.id, 'id')
    this.merchantId = this.$route?.params?.id
    this.pageType = this.$route?.params?.pageType
    if (this.merchantId) {
      this.getMerchant(this.merchantId)
    }
  },
  methods: {
    async add() {
      const { data } = await request({
        method: 'POST',
        url: 'https://dev.defenderfintech.com/smile-api/manage-api/merchant/add',
        data: {
          'merchantAlias': this.form.merchantAlias || undefined,
          'merchantLevel': this.form.merchantLevel || undefined,
          'merchantName': this.form.merchantName || undefined,
          'phone': this.form.phone || undefined,
          'settlementInterval': this.form.settlementInterval || undefined,
          'settlementMode': this.form.settlementMode || undefined,
        }
      })
    },
    async edit() {
      const { data } = await request({
        method: 'POST',
        url: 'https://dev.defenderfintech.com/smile-api/manage-api/merchant/edit',
        data: {
          'merchantAlias': this.form.merchantAlias || undefined,
          'merchantLevel': this.form.merchantLevel || undefined,
          'merchantName': this.form.merchantName || undefined,
          'phone': this.form.phone || undefined,
          'settlementInterval': this.form.settlementInterval || undefined,
          'settlementMode': this.form.settlementMode || undefined,
          'merchantId': this.merchantId,
        }
      })
    },

    async getMerchant(merchantId) {
      const { data } = await request({
        method: 'GET',
        url: 'https://dev.defenderfintech.com/smile-api/manage-api/merchant/get',
        params: { merchantId },
      })
      this.form = Object.assign(this.form, data)
    },
    reset() {
      console.log('reset!')
    },
    handleSizeChange() {
      console.log('handleSizeChange!')
    },
    handleCurrentChange() {
      console.log('handleCurrentChange!')
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f3f4f6;
  padding: 19px 34px 0;
  .form-container, .table-container {
    background: #fff;
  }
  .form-container {
    padding: 23px 30px;
    .title {
      padding: 15px 0;
      font-size: 24px;
      color: #65666a;
    }
  }
  .table-container {
    margin-top: 25px;
    padding: 80px 30px;
    .pagination-container {
      display: flex;
      justify-content: center;
    }
  }
}
</style>


<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div class="container">
    <div class="form-container">
      <el-form ref="form" :model="form" label-width="auto" :disabled="pageType !== 'add'">
        <div class="title">采购单信息</div>
        <el-row :gutter="100">
          <el-col :span="8">
            <el-form-item label="供应商编号" placeholder="请输入供应商编号">
              <el-input v-model="form.supplierNO"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="采购备注信息" placeholder="请输入采购备注信息">
              <el-input v-model="form.remark"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="运营标记信息" placeholder="请输入运营标记信息">
              <el-input v-model="form.operationSign"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="title">商品明细信息</div>
        <div>
          <el-row v-for="(item, index) in detailList" :key="index" :gutter="100">
            <el-col :span="5">
              <el-form-item label="商品成本价格" placeholder="请输入商品成本价格">
                <el-input v-model="item.costPrice"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="商品价格" placeholder="请输入商品价格">
                <el-input v-model="item.price"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="商品sku编号" placeholder="请输入商品sku编号">
                <el-input v-model="item.skuNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="商品数量" placeholder="请输入商品数量">
                <el-input v-model="item.skuNum"></el-input>
              </el-form-item>
            </el-col>
            <el-col v-if="pageType === 'add' && index === detailList.length -1" :span="4">
              <el-button @click="addDetail">+</el-button>
            </el-col>
          </el-row>
        </div>

        <el-row :gutter="100">
          <el-col :span="12">
            <el-form-item>
              <el-button v-if="pageType === 'add'" type="primary" @click="add"> 新增采购单 </el-button>
              <!-- <el-button v-if="pageType === 'edit'" type="primary" @click="audit"> 保存 </el-button> -->
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
      id: null,
      pageType: 'add',
      form: {
        supplierNO: '',
        remark: '',
        operationSign: '',
      },
      detailList: [
        {
          'costPrice': 19.99,
          'price': 50.01,
          'skuNo': 'G10010001',
          'skuNum': 10
        },
      ],
    }
  },
  mounted() {
    console.log(this.$route.params.id, 'id')
    this.id = this.$route?.params?.id
    this.pageType = this.$route?.params?.pageType || 'add'
    if (this.id) {
      this.getPurchaseOrder(this.id)
    }
  },
  methods: {
    addDetail() {
      this.detailList.push({
        'costPrice': '',
        'price': '',
        'skuNo': '',
        'skuNum': '',
      })
    },
    async add() {
      const { data } = await request({
        method: 'POST',
        url: 'https://dev.defenderfintech.com/smile-api/manage-api/purchaseOrder/add',
        data: {
          'detailList': this.detailList,
          'operationSign': 'OP20220701001',
          'remark': '测试建单备注',
          'supplierNO': 'S001'
        }
      })
    },

    async getPurchaseOrder(id) {
      const { data } = await request({
        method: 'GET',
        url: 'https://dev.defenderfintech.com/smile-api/manage-api/purchaseOrder/get',
        params: { id },
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


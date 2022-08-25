<template>
  <el-form ref="form" :model="form" label-width="auto" label-position="left">
    <h3>标准商品sku明细信息</h3>
    <el-row>
      <el-col :span="12">
        <el-form-item label="对客展示详情链接:">
          <div>{{ form.appDetailUrl || '--' }}</div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="对客展示简单描述:">
          <div>{{ form.appSkuDescription || '--' }}</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="对客展示名称:">
          <div>{{ form.appSkuName || '--' }}</div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="商品品类名称:">
          <div>{{ form.categoryName || '--' }}</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="商品品类编号:">
          <div>{{ form.categoryNo }}</div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="创建时间:">
          <div>{{ form.createTime }}</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="创建人:">
          <div>{{ form.createUser }}</div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="采购单商品id:">
          <div>{{ form.id || '--' }}</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="商品销售状态:">
          <div>{{ form.sellState === 1 ? '上架' : '下架' }}</div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="商品描述:">
          <div>{{ form.skuDesc || '--' }}</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="商品名称:">
          <div>{{ form.skuName }}</div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="商品sku编号:">
          <div>{{ form.skuNo }}</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="更新时间:">
          <div>{{ form.updateTime || '--' }}</div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="更新人:">
          <div>{{ form.updateUser || '--' }}</div>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import request from '@/utils/request'

export default {
  props: {
    id: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      form: {
        'appDetailUrl': '',
        'appSkuDescription': '',
        'appSkuName': '',
        'categoryName': '',
        'categoryNo': '',
        'createTime': '',
        'createUser': '',
        'id': null,
        'sellState': null,
        'skuDesc': '',
        'skuName': '',
        'skuNo': '',
        'updateTime': '',
        'updateUser': ''
      },
    }
  },
  watch: {
    id: {
      handler(id) {
        this.getGoodsSku(id)
      },
      immediate: true,
    }
  },
  methods: {
    async getGoodsSku(skuId) {
      const { data } = await request({
        method: 'GET',
        url: 'https://dev.defenderfintech.com/smile-api/manage-api/goodsSku/get',
        params: { skuId },
      })
      this.form = Object.assign(this.form, data)
    },
  }
}
</script>

<style>

</style>

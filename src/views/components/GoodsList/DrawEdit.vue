<template>
  <el-form ref="form" :model="form" label-width="auto" label-position="left">
    <h3>商户单信息</h3>
    <el-row>
      <el-col :span="12">
        <el-form-item label="对客展示详情链接:">
          <el-input v-model="form.appDetailUrl" placeholder="请输入对客展示详情链接"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="对客展示简单描述:">
          <el-input v-model="form.appSkuDescription" placeholder="请输入对客展示简单描述"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="对客展示名称:">
          <el-input v-model="form.appSkuName" placeholder="请输入对客展示名称"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="商品品类名称:">
          <el-input v-model="form.categoryName" placeholder="请输入商品品类名称"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="商品品类编号:">
          <el-input v-model="form.categoryNo" placeholder="请输入商品品类编号"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="商品名称:">
          <el-input v-model="form.skuName" placeholder="请输入商品名称"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-form-item label="">
          <el-button type="primary" @click="update">保存</el-button>
          <el-button @click="cancel">取消</el-button>
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
        skuId: this.id,
        'appDetailUrl': '',
        'appSkuDescription': '',
        'appSkuName': '',
        'categoryName': '',
        'categoryNo': '',
        'createTime': '',
        'createUser': '',
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

    async update() {
      const { code } = await request({
        method: 'POST',
        url: 'https://dev.defenderfintech.com/smile-api/manage-api/goodsSku/update',
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

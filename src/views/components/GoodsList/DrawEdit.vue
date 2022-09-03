<template>
  <el-form ref="form" :model="form" label-width="auto" label-position="left" :rules="rules" size="medium">
    <h3>编辑商品信息</h3>

    <el-form-item label="对客展示详情链接:" prop="appDetailUrl">
      <el-input v-model="form.appDetailUrl" placeholder="请输入对客展示详情链接"></el-input>
    </el-form-item>

    <el-form-item label="对客展示简单描述:" prop="appSkuDescription">
      <el-input v-model="form.appSkuDescription" placeholder="请输入对客展示简单描述"></el-input>
    </el-form-item>

    <el-form-item label="对客展示名称:" prop="appSkuName">
      <el-input v-model="form.appSkuName" placeholder="请输入对客展示名称"></el-input>
    </el-form-item>

    <el-form-item label="商品名称:" prop="skuName">
      <el-input v-model="form.skuName" placeholder="请输入商品名称"></el-input>
    </el-form-item>

    <el-form-item label="商品品类" prop="categoryNo">
      <el-cascader
        ref="cascader"
        v-model="form.categoryNo"
        :options="options"
        :props="{ value: 'categoryNo', label: 'categoryName', emitPath: false }"
        @change="handleChange"
      ></el-cascader>
    </el-form-item>

    <el-form-item label="使用门槛金额:" prop="fullAmount">
      <el-input-number v-model="form.fullAmount" controls-position="right" :min="0" @change="handleChange"></el-input-number>
    </el-form-item>

    <el-form-item label="满减金额:" prop="reduceAmount">
      <el-input-number v-model="form.reduceAmount" controls-position="right" :min="0" @change="handleChange"></el-input-number>
    </el-form-item>

    <el-form-item label="商品有效期限制:" prop="periodLimit">
      <el-input-number v-model="form.periodLimit" controls-position="right" :min="0" @change="handleChange"></el-input-number>
    </el-form-item>

    <el-form-item label="商品有效期限制单位:" prop="periodLimitUnit">
      <el-select v-model="form.periodLimitUnit" placeholder="请选择商品有效期限制单位">
        <el-option label="天" :value="1"></el-option>
        <el-option label="月" :value="2"></el-option>
        <el-option label="年" :value="3"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="">
      <el-button type="primary" @click="update">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
import request from '@/utils/request'
import myMixin from './mixin'

export default {
  mixins: [myMixin],
  props: {
    id: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {
      form: {
        skuId: undefined,
        appDetailUrl: undefined,
        appSkuDescription: undefined,
        appSkuName: undefined,
        categoryName: undefined,
        categoryNo: undefined,
        createTime: undefined,
        createUser: undefined,
        sellState: undefined,
        skuDesc: undefined,
        skuName: undefined,
        skuNo: undefined,
        updateTime: undefined,
        updateUser: undefined,
        periodLimit: undefined,
        periodLimitUnit: undefined,
        fullAmount: undefined,
        reduceAmount: undefined,
      },
    }
  },

  watch: {
    id: {
      handler(id) {
        this.getGoodsSku(id)
      },
      immediate: true,
    },
  },

  methods: {
    async getGoodsSku(skuId) {
      const { data } = await request({
        method: 'GET',
        url: '/manage-api/goodsSku/get',
        params: { skuId },
      })
      this.form = Object.assign(this.form, data, { skuId: this.id })
    },

    async update() {
      const { code } = await request({
        method: 'POST',
        url: '/manage-api/goodsSku/update',
        data: this.form,
      })
      if (code === '0000') {
        this.$message({
          type: 'success',
          message: '修改完成',
        })
        this.$emit('refresh')
      }
    },

  }
}
</script>

<template>
  <el-form ref="form" :model="form" label-width="auto" label-position="left" :rules="rules">
    <h3>新增商品sku</h3>
    <el-row>
      <el-col :span="12">
        <el-form-item label="对客展示详情链接:" prop="appDetailUrl">
          <el-input v-model="form.appDetailUrl" placeholder="请输入对客展示详情链接"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="对客展示简单描述:" prop="appSkuDescription">
          <el-input v-model="form.appSkuDescription" placeholder="请输入对客展示简单描述"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="对客展示名称:" prop="appSkuName">
          <el-input v-model="form.appSkuName" placeholder="请输入对客展示名称"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="商品品类名称:" prop="categoryName">
          <el-input v-model="form.categoryName" placeholder="请输入商品品类名称"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="商品品类编号:" prop="categoryNo">
          <el-input v-model="form.categoryNo" placeholder="请输入商品品类编号"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="商品名称:" prop="skuName">
          <el-input v-model="form.skuName" placeholder="请输入商品名称"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-form-item label="">
          <el-button type="primary" @click="add">新增</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import request from '@/utils/request'

export default {
  data() {
    return {
      rules: {
        appDetailUrl: [{ required: true, message: '请输入对客展示详情链接', trigger: 'blur' }],
        appSkuDescription: [{ required: true, message: '请输入对客展示简单描述', trigger: 'blur' }],
        appSkuName: [{ required: true, message: '请输入对客展示名称', trigger: 'blur' }],
        categoryName: [{ required: true, message: '请输入商品品类名称', trigger: 'blur' }],
        categoryNo: [{ required: true, message: '请输入商品品类编号', trigger: 'blur' }],
        skuName: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
      },
      form: {
        'appDetailUrl': '',
        'appSkuDescription': '',
        'appSkuName': '',
        'categoryName': '',
        'categoryNo': '',
        'skuName': '',
      },
    }
  },

  methods: {
    async add() {
      const { code } = await request({
        method: 'POST',
        url: 'https://dev.defenderfintech.com/smile-api/manage-api/goodsSku/add',
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

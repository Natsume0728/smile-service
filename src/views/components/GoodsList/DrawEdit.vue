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

    <el-form-item label="">
      <el-button type="primary" @click="update">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>

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
    drawer: {
      type: Boolean,
    }
  },

  data() {
    return {
      rules: {
        appDetailUrl: [{ required: true, message: '请输入对客展示详情链接', trigger: 'blur' }],
        appSkuDescription: [{ required: true, message: '请输入对客展示简单描述', trigger: 'blur' }],
        appSkuName: [{ required: true, message: '请输入对客展示名称', trigger: 'blur' }],
        categoryNo: [{ required: true, message: '请选择商品品类', trigger: 'blur' }],
        skuName: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
      },
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
        updateUser: undefined
      },
      options: [],
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

  mounted() {
    this.category()
  },

  methods: {
    handleChange(v) {
      this.form.categoryName = this.$refs.cascader.getCheckedNodes()[0].label
    },

    async category() {
      const { code, data } = await request({
        method: 'GET',
        url: '/manage-api/category/each',
      })
      if (code === '0000') {
        data.forEach(item => {
          if (item?.children?.length === 0) {
            delete item.children
          } else {
            item.children.forEach(el => {
              if (el?.children?.length === 0) {
                delete el.children
              }
            })
          }
        })
        this.options = data
      }
    },

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

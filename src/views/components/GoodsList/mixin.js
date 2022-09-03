
import request from '@/utils/request'

export default {
  props: {
    drawer: {
      type: Boolean,
    }
  },

  data() {
    return {
      options: [],
      rules: {
        appDetailUrl: [{ required: true, message: '请输入对客展示详情链接', trigger: 'blur' }],
        appSkuDescription: [{ required: true, message: '请输入对客展示简单描述', trigger: 'blur' }],
        appSkuName: [{ required: true, message: '请输入对客展示名称', trigger: 'blur' }],
        categoryNo: [{ required: true, message: '请选择商品品类', trigger: 'blur' }],
        skuName: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        periodLimit: [{ required: true, message: '请选择使用门槛金额', trigger: 'blur' }],
        periodLimitUnit: [{ required: true, message: '请选择满减金额', trigger: 'blur' }],
        fullAmount: [{ required: true, message: '请选择商品有效期限制', trigger: 'blur' }],
        reduceAmount: [{ required: true, message: '请选择商品有效期限制单位', trigger: 'blur' }],
      },
    }
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

    cancel() {
      this.$emit('refresh')
    },
  }
}


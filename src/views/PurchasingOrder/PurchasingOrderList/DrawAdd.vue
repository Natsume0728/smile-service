<template>
  <div class="container">
    <el-form ref="form" :model="form" :rules="rules" label-width="auto" label-position="left" class="form" inline>
      <div class="form-container">
        <h3>新增采购单</h3>
        <el-form-item label="供应商编号:" prop="supplierNO">
          <el-input v-model="form.supplierNO" placeholder="请输入供应商编号" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="运营标记信息:">
          <el-input v-model="form.operationSign" placeholder="请输入运营标记信息" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="采购备注信息:">
          <el-input v-model="form.remark" placeholder="请输入备注信息" size="mini"></el-input>
        </el-form-item>
      </div>
    </el-form>

    <div class="table-container">
      <h3>商品明细信息</h3>
      <el-button type="primary" size="small" style="margin-bottom: 10px;" @click="dialogVisible = true">选择商品</el-button>

      <el-table
        :data="tableData"
        max-height="430"
        border
        :header-cell-style="{ background: '#f9f9f9', textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column prop="skuNum" label="商品数量" width="155">
          <template slot-scope="{ row }">
            <el-input-number v-model="row.skuNum" controls-position="right" placeholder="请输入" size="mini"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="skuNo" label="商品编号"></el-table-column>
        <el-table-column prop="id" label="商品id"></el-table-column>
        <el-table-column prop="skuName" label="商品名称"></el-table-column>
        <el-table-column prop="appDetailUrl" label="对客展示详情链接"></el-table-column>
        <el-table-column prop="appSkuDescription" label="对客展示简单描述"></el-table-column>
        <el-table-column prop="appSkuName" label="对客展示名称"></el-table-column>
        <el-table-column prop="categoryNo" label="商品品类编号"></el-table-column>
        <el-table-column prop="categoryName" label="商品品类名称"></el-table-column>
        <el-table-column prop="skuDesc" label="商品描述"></el-table-column>
      </el-table>
      <el-button type="primary" size="small" style="margin-top: 20px;" @click="add">保存采购单</el-button>
      <el-button size="small" style="margin-top: 20px;" @click="cancel">取消</el-button>
    </div>

    <el-dialog title="商品列表" :visible.sync="dialogVisible" width="80%" append-to-body>
      <goodsComponents :visible.sync="dialogVisible" @getSelectedGoods="getSelectedGoods" />
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/request'
import goodsComponents from '@/views/components/goodsComponents.vue'

export default {
  components: {
    goodsComponents,
  },
  props: {
    drawer: {
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
      rules: {
        supplierNO: [{ required: true, message: '请输入供应商编号', trigger: 'blur' }],
      },
      dialogVisible: false,
      tableData: [],
      form: {
        operationSign: '',
        remark: '',
        supplierNO: '',
      },
    }
  },

  watch: {
    drawer(v) {
      if (!v) {
        this.reset()
      }
    }
  },

  methods: {
    getSelectedGoods(val) {
      this.tableData = val
    },

    async add() {
      const detailList = this.tableData.map(item => {
        return {
          skuNum: item.skuNum,
          skuNo: item.skuNo,
        }
      })
      const { code } = await request({
        method: 'post',
        url: '/manage-api/purchaseOrder/add',
        data: {
          detailList,
          'supplierNO': this.form.supplierNO,
          'operationSign': this.form.operationSign || undefined,
          'remark': this.form.remark || undefined,
        }
      })
      if (code === '0000') this.$emit('refresh')
    },

    cancel() {
      this.reset()
      this.$emit('refresh')
    },

    reset() {
      this.form = {
        operationSign: '',
        remark: '',
        supplierNO: '',
      }
      this.tableData = []
    },

  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  overflow: scroll;
  background-color: #f3f4f6;
  padding-top: 19px;
  .form-container, .table-container {
    background: #fff;
  }
  .form-container {
    padding: 23px 30px;
    padding-top: 10px;
  }
  .table-container {
    padding: 30px;
    padding-top: 10px;
    .pagination-container {
      display: flex;
      justify-content: center;
    }
  }
}
</style>

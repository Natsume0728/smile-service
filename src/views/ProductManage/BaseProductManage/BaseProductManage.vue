<template>
  <div class="container">
    <div class="form-container">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="100">
          <el-col :span="8">
            <el-form-item label="产品编码">
              <el-input v-model="form.productId" placeholder="请输入产品编码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="产品名称" placeholder="请输入产品名称">
              <el-input v-model="form.productName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="产品状态">
              <el-select v-model="form.productStatu" placeholder="请选择产品状态">
                <el-option label="状态一" value="1"></el-option>
                <el-option label="状态二" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="100">
          <el-col :span="8">
            <el-form-item label="一级分类">
              <el-select v-model="form.levelOneClassify" placeholder="请选择一级分类">
                <el-option label="一级分类一" value="1"></el-option>
                <el-option label="一级分类二" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="二级分类">
              <el-select v-model="form.levelTwoClassify" placeholder="请选择二级分类">
                <el-option label="二级分类一" value="1"></el-option>
                <el-option label="二级分类二" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
              <el-button @click="reset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </div>

    <div class="table-container">
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        :header-cell-style="{ background: '#f9f9f9', textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column prop="skuNo" label="产品编码"></el-table-column>
        <el-table-column prop="skuName" label="产品名称"></el-table-column>
        <el-table-column prop="categoryName" label="商品品类"></el-table-column>
        <el-table-column prop="" label="结算方式（待确定）"></el-table-column>
        <el-table-column label="销售状态">
          <template slot-scope="{ row: { sellState } }">
            <div>{{ sellState === 1 ? '上架' : '下架' }}</div>
          </template>
        </el-table-column>
        <el-table-column label="时间" width="220">
          <template slot-scope="{ row: { createTime, updateTime } }">
            <div>
              <div>上线时间: {{ createTime || '--' }}</div>
              <div>修改时间: {{ updateTime || '--' }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template>
            <el-button type="text">查看</el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text">上架</el-button>
            <el-button type="text">补券</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          :current-page="pageIndex"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'BaseProductManage', // 基础产品管理
  data() {
    return {
      form: {
        productId: '',
        productName: '',
        productStatu: '',
        levelOneClassify: '',
        levelTwoClassify: '',
      },
      tableData: [],
      total: 0,
      pageIndex: 1,
      pageSize: 10,
    }
  },
  mounted() {
    this.getGoodsSku()
  },
  methods: {

    async getGoodsSku() {
      const { data } = await request({
        method: 'post',
        url: 'https://dev.defenderfintech.com/smile-api/manage-api/goodsSku/page',
        data: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        }
      })
      const { list, total } = data
      this.tableData = list
      this.total = total
      console.log('list', list)
    },
    search() {
      console.log('search!')
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


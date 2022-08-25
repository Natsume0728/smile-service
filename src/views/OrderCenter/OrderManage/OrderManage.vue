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
        <el-table-column prop="productId" label="产品编码"></el-table-column>
        <el-table-column prop="productName" label="产品名称"></el-table-column>
        <el-table-column prop="levelOneClassify" label="一级产品分类"></el-table-column>
        <el-table-column prop="levelTwoClassify" label="二级产品分类"></el-table-column>
        <el-table-column prop="date" label="结算方式"></el-table-column>
        <el-table-column prop="productStatu" label="产品状态"></el-table-column>
        <el-table-column prop="date" label="可售状态"></el-table-column>
        <el-table-column label="时间" width="190">
          <template slot-scope="{ row: { onlineTime, editTime } }">
            <div>
              <div>上线时间: {{ onlineTime }}</div>
              <div>修改时间: {{ editTime }}</div>
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
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderManage', // 订单中心-订单管理
  data() {
    return {
      form: {
        productId: '',
        productName: '',
        productStatu: '',
        levelOneClassify: '',
        levelTwoClassify: '',
      },
      tableData: [
        {
          productId: '23145021',
          productName: '洗车服务',
          productStatu: '上架',
          levelOneClassify: '车辆服务',
          levelTwoClassify: '美容洗护',
          onlineTime: '2021年12月31日',
          editTime: '2021年12月31日',
        },
        {
          productId: '23145021',
          productName: '洗车服务',
          productStatu: '上架',
          levelOneClassify: '车辆服务',
          levelTwoClassify: '美容洗护',
          onlineTime: '2021年12月31日',
          editTime: '2021年12月31日',
        },
        {
          productId: '23145021',
          productName: '洗车服务',
          productStatu: '上架',
          levelOneClassify: '车辆服务',
          levelTwoClassify: '美容洗护',
          onlineTime: '2021年12月31日',
          editTime: '2021年12月31日',
        },
      ],
      currentPage: 1,
    }
  },
  methods: {
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
    padding: 30px;
    .pagination-container {
      display: flex;
      justify-content: center;
    }
  }
}
</style>


<template>
  <div class="container">2222
    <el-descriptions title="用户信息">
      <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
      <el-descriptions-item label="手机号">181000s00000</el-descriptions-item>
      <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
      <el-descriptions-item label="备注">
        <el-tag size="small">学校</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
    </el-descriptions>
    <div class="form-container">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="100">
          <el-col :span="8">
            <el-form-item label="产品编码">
              <el-input v-model="form.productId" placeholder="请输入产品编码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="产品名称">
              <el-input v-model="form.productName" placeholder="请输入产品名称"></el-input>
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
        <el-table-column prop="serverId" label="服务编码"></el-table-column>
        <el-table-column prop="serverName" label="服务名称"></el-table-column>
        <el-table-column prop="phoneNum" label="客户电话"></el-table-column>
        <el-table-column prop="carNum" label="客户车牌号"></el-table-column>
        <el-table-column prop="purchaseTime" label="采购时间"></el-table-column>
        <el-table-column prop="verificaitonTime" label="核销时间"></el-table-column>
        <el-table-column prop="verificationStore" label="核销门点"></el-table-column>
        <el-table-column prop="serviceProvider" label="服务商" width="190">
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template>
            <el-button type="text">查看</el-button>
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
  name: 'VerificationOrderDetail', // 核销单明细
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
          serverId: 'XC-0201-0204',
          serverName: '洗车服务',
          phoneNum: '13600110215',
          carNum: '京A021421',
          purchaseTime: '2021年12月31日',
          verificaitonTime: '2021年12月31日',
          verificationStore: '北京西部京车汇',
          serviceProvider: '京车汇',
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


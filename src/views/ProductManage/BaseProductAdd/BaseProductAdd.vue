<template>
  <div class="container">
    <div class="form-container">
      <el-form ref="form" :model="form" label-width="auto">
        <div class="title">产品基础信息配置</div>
        <el-row :gutter="100">
          <el-col :span="12">
            <el-form-item label="产品编码" required>
              <el-input v-model="form.productId" placeholder="请输入产品编码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品名称" placeholder="请输入产品名称">
              <el-input v-model="form.productName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="100">
          <el-col :span="12">
            <el-form-item label="对客展示名称">
              <el-input v-model="form.showTitle" placeholder="请输入对客展示名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="对客展示副标题" placeholder="请输入对客展示副标题">
              <el-input v-model="form.showSubTitle"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="100">
          <el-col :span="12">
            <el-form-item label="一级分类">
              <el-select v-model="form.levelOneClassify" placeholder="请选择一级分类">
                <el-option label="一级分类一" value="1"></el-option>
                <el-option label="一级分类二" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="二级分类">
              <el-select v-model="form.levelTwoClassify" placeholder="请选择二级分类">
                <el-option label="二级分类一" value="1"></el-option>
                <el-option label="二级分类二" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="100">
          <el-col :span="12">
            <el-form-item label="服务内容">
              <el-input v-model="form.serveContent" placeholder="请输入服务内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上架状态">
              <el-select v-model="form.productStatu" placeholder="请选择上架状态">
                <el-option label="上架" value="1"></el-option>
                <el-option label="下架" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="title">结算设置</div>
        <el-row :gutter="100">
          <el-col :span="12">
            <el-form-item label="结算方式">
              <el-select v-model="form.settlementMethod" placeholder="请选择结算方式">
                <el-option label="结算方式一" value="1"></el-option>
                <el-option label="结算方式二" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计费规则">
              <el-select v-model="form.buillingRule" placeholder="请选择计费规则">
                <el-option label="一口价" value="1"></el-option>
                <el-option label="比例上浮" value="2"></el-option>
                <el-option label="固定上浮" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="100">
          <el-col :span="12">
            <el-form-item label="计费方式">
              <el-select v-model="form.buillingMethod" placeholder="请选择计费方式">
                <el-option label="按次计费" value="1"></el-option>
                <el-option label="按金额储值" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-button type="primary" @click="search"> 提交 </el-button>
              <el-button @click="reset"> 取消 </el-button>
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
        <el-table-column prop="buillingMethod" label="计费方式"></el-table-column>
        <el-table-column prop="startTime" label="有效时间起期"></el-table-column>
        <el-table-column prop="endTime" label="有效时间止期"></el-table-column>
        <el-table-column prop="buillingRule" label="计费规则"></el-table-column>
        <el-table-column prop="date" label="值"></el-table-column>
        <el-table-column prop="productStatu" label="状态"></el-table-column>
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
  name: 'BaseProductAdd', // 基础产品新增
  data() {
    return {
      form: {
        productId: '',
        productName: '',
        showTitle: '',
        showSubTitle: '',
        levelOneClassify: '',
        levelTwoClassify: '',
        serveContent: '',
        productStatu: '',
        settlementMethod: '',
        buillingRule: '',
        buillingMethod: '',
      },
      tableData: [
        {
          buillingMethod: '0',
          startTime: '2021年12月31日',
          endTime: '2021年12月31日',
          buillingRule: '1',
          date: '233',
          productStatu: '1',
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
    .title {
      padding: 15px 0;
      font-size: 24px;
      color: #65666a;
    }
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


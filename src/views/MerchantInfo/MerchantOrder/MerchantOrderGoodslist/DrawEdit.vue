<template>
  <div class="container">
    <div class="form-container">
      <el-form ref="form" :model="form" label-width="auto" label-position="left">
        <h3>更新商户订单明细</h3>

        <el-form-item label="领取后兑换时间限制:">
          <el-input-number v-model="form.exchangeLimit" controls-position="right" placeholder="请输入"></el-input-number>
        </el-form-item>

        <el-form-item label="领取后兑换时间限制单位:">
          <el-select v-model="form.exchangeLimitUnit" placeholder="请选择">
            <el-option v-for="item in limitTimeUnitTypeList" :key="item.code" :label="item.name" :value="item.code"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="发放形式:">
          <el-select v-model="form.grantMode" placeholder="请选择">
            <el-option v-for="item in grantModeList" :key="item.code" :label="item.name" :value="item.code"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品数量(每人):">
          <el-input-number v-model="form.skuNum" controls-position="right" placeholder="请输入"></el-input-number>
        </el-form-item>

        <el-form-item label="">
          <el-button type="primary" @click="edit"> 保存 </el-button>
          <el-button @click="cancel"> 取消 </el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import { mapGetters } from 'vuex'

export default {
  props: {
    detailId: {
      type: [Number, String],
      default: null,
    },
    drawer: {
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
      form: {
        exchangeLimit: undefined,
        exchangeLimitUnit: undefined,
        grantMode: undefined,
        skuNum: undefined,
      }
    }
  },

  computed: {
    ...mapGetters([
      'manageCommonEnumDictAll'
    ]),
    limitTimeUnitTypeList() {
      return this.manageCommonEnumDictAll.limitTimeUnitType
    },
    grantModeList() {
      return this.manageCommonEnumDictAll.grantMode
    }
  },

  watch: {
    drawer(v) {
      if (!v) {
        this.form = {
          exchangeLimit: undefined,
          exchangeLimitUnit: undefined,
          grantMode: undefined,
          skuNum: undefined,
        }
      }
    },
    detailId: {
      handler() {
        this.merchantOrderDetail(this.detailId)
      },
      immediate: true,
    }
  },

  methods: {
    cancel() {
      this.$emit('refresh')
    },

    async edit() {
      const { code } = await request({
        method: 'POST',
        url: '/manage-api/merchantOrderDetail/edit',
        data: {
          detailId: this.detailId,
          ...this.form,
        },
      })
      if (code === '0000') {
        this.$emit('refresh')
      }
    },

    async merchantOrderDetail(detailId) {
      const { data, code } = await request({
        method: 'GET',
        url: '/manage-api/merchantOrderDetail/get',
        params: { detailId },
      })
      if (code === '0000') {
        this.form = Object.assign(this.form, data)
      }
    }
  }
}
</script>

<style>

</style>

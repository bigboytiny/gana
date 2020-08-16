<template>
  <div class="mod-user">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-card class="box-card" shadow="always">
        <el-form-item label="商户号:">
          <el-input v-model="dataForm.memberId" placeholder="商户号" clearable></el-input>
        </el-form-item>
        <el-form-item label="商户名称:">
          <el-input v-model="dataForm.memberId" placeholder="商户名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="代理商名称:">
          <el-input v-model="dataForm.memberId" placeholder="代理商名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="商户状态:">
          <el-input v-model="dataForm.status" placeholder="商户状态" clearable></el-input>
        </el-form-item>
        <el-form-item label="申请日期:">
          <el-date-picker
            v-model="dataForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="手机号码:">
          <el-input v-model="dataForm.status" placeholder="请输入手机号码" clearable></el-input>
        </el-form-item>
        <el-form-item label="微信实名认证授权状态:">
          <el-input v-model="dataForm.status" placeholder="请输入手机号码" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()" type="primary">查询</el-button>
        </el-form-item>
      </el-card>
    </el-form>
    <el-card class="box-card" shadow="always">
      <el-table
        :data="dataList"
        border
        v-loading="dataListLoading"
        @selection-change="selectionChangeHandle"
        style="width: 100%;"
      >
        <el-table-column align="center" label="商户信息查询">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="memberId" header-align="center" align="center" label="商户号"></el-table-column>
          <el-table-column prop="agentName" header-align="center" align="center" label="商户名称"></el-table-column>
          <el-table-column prop="orgId" header-align="center" align="center" label="微信支付"></el-table-column>
          <el-table-column prop="orgName" header-align="center" align="center" label="微信实名认证授权状态"></el-table-column>
          <el-table-column prop="opdate" header-align="center" align="center" label="代理商简称"></el-table-column>
          <el-table-column
            prop="contactName"
            header-align="center"
            align="center"
            width="140"
            label="开户日期"
          ></el-table-column>
          <el-table-column prop="status" header-align="center" align="center" label="商户状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status === 0" size="small" type="danger">禁用</el-tag>
              <el-tag v-else size="small">正常</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="recCretTime" header-align="center" align="center" label="联系人"></el-table-column>
          <el-table-column
            fixed="right"
            header-align="center"
            align="center"
            width="150"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button
                v-if="isAuth('instormer:mer:update')"
                type="text"
                size="small"
                @click="addOrUpdateHandle(scope.row.memberId)"
              >详情</el-button>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        :current-page="pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        :total="totalPage"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </el-card>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataForm: {
        agentName: '',
        dateRange: []
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  activated () {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/agent/agent/list'),
        method: 'get',
        params: this.$http.adornParams({
          page: this.pageIndex,
          limit: this.pageSize,
          agentname: this.dataForm.agentName
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.page.list
          this.totalPage = data.page.totalCount
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
      })
    },
    // 每页数
    sizeChangeHandle (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 多选
    selectionChangeHandle (val) {
      this.dataListSelections = val
    },
    // 新增 / 修改
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    }
  }
}
</script>

<template>
  <div class="mod-user">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item label="代理商号">
        <el-input v-model="dataForm.memberId" prop="memberId" placeholder="请输入代理商号" clearable></el-input>
      </el-form-item>
      <el-form-item label="代理商名称">
        <el-input v-model="dataForm.agentName" placeholder="请输入代理商名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="机构名称">
        <el-input v-model="dataForm.orgName" placeholder="请输入机构名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList" border v-loading="dataListLoading"
      @selection-change="selectionChangeHandle" style="width: 100%;">
      <el-table-column align="center" label="代理商信息查询">
        <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
        <el-table-column prop="memberId" header-align="center" align="center"  label="代理商号"></el-table-column>
        <el-table-column prop="agentName" header-align="center" align="center" label="代理商名称" ></el-table-column>
        <el-table-column prop="oemId" header-align="center" align="center" label="所属机构商号" ></el-table-column>
        <el-table-column prop="orgName" header-align="center" align="center" label="所属机构商名称" ></el-table-column>
        <el-table-column prop="opdate" header-align="center" align="center" label="开户日期">
            <template slot-scope="scope">{{scope.opdate| dateYMDFormat}}</template>
        </el-table-column>
        <el-table-column prop="contactName" header-align="center" align="center" width="140" label="联系人"></el-table-column>
        <el-table-column prop="memberStat" header-align="center" align="center" label="代理商状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.memberStat === 'C'" size="small" type="danger">禁用</el-tag>
            <el-tag v-if="scope.row.memberStat === 'N'" size="small" type="danger">正常</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
          <template slot-scope="scope">
            <el-button v-if="isAuth('instormer:mer:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.memberId)">详情</el-button>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle" @current-change="currentChangeHandle"
      :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import TableTreeColumn from '@/components/table-tree-column'
  import AddOrUpdate from './agent-update'
  export default {
    data () {
      return {
        dataForm: {
          agentName: ''
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
    components: {
      TableTreeColumn,
      AddOrUpdate
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
            'page': this.pageIndex,
            'limit': this.pageSize,
            'memberId': this.dataForm.memberId,
            'agentName': this.dataForm.agentName,
            'orgName': this.dataForm.orgName
          })
        }).then(({data}) => {
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

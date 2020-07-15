<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        1234567890-
      </el-col>
      <el-col :span="24" >
        <el-table
          v-loading="listLoading"
          :data="list"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
          size="mini"
          height="200px"
          @row-click="rowClick"
        >
          <el-table-column align="center" label="ID" width="95">
            <template slot-scope="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>
          <el-table-column label="Title">
            <template slot-scope="scope">
              {{ scope.row.title }}
            </template>
          </el-table-column>
          <el-table-column label="Author" width="110" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Pageviews" width="110" align="center">
            <template slot-scope="scope">
              {{ scope.row.pageviews }}
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="Status" width="110" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="Display_time" width="200">
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span>{{ scope.row.display_time }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="curPage"
          :page-sizes="[5, 10, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="allCount">
        </el-pagination>
      </el-col>
      <el-col :span="24" id="colMain">
        <baidu-map class="bm-view" :center="center"  :zoom="zoom" @ready="handler" id="baiduMap">
          <bm-driving :start="start" :end="end" @searchcomplete="handleSearchComplete" :panel="false" :autoViewport="true"></bm-driving>
          <bml-lushu
            @stop="reset"
            :path="path"
            :icon="icon"
            :stop="stop"
            :play="play"
            :rotation="true">
          </bml-lushu>
        </baidu-map>
      </el-col>
    </el-row>
  </div>
</template>
<style>
  .bm-view {
    width: 100%;
    height: 350px;
  }
</style>
<script>
import { getList } from '@/api/table'
import { BmlLushu } from 'vue-baidu-map'
export default {
  components: {
    BmlLushu
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      center: {
        lng: 116.404,
        lat: 39.915
      },
      start: {
        lng: 116.404,
        lat: 39.915
      },
      end: {
        lng: 116.404,
        lat: 39.915
      },
      zoom: 3,
      curPage: 1,
      pageSize: 5,
      allCount: null,
      list: null,
      listLoading: true,
      play: false,
      stop: false,
      path: [],
      icon: {
        url: 'http://api.map.baidu.com/library/LuShu/1.2/examples/car.png',
        size: { width: 52, height: 26 },
        opts: { anchor: { width: 27, height: 13 }}
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData: function() {
      this.listLoading = true
      // eslint-disable-next-line no-unused-vars
      var params = { 'curPage': this.curPage, 'pageSize': this.pageSize }
      getList().then(response => {
        this.list = response.data.items
        this.allCount = this.list.length
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      console.log('666', val)
    },
    handleCurrentChange(col) {
      console.log('333', col)
    },
    handler({ BMap, map }) {
      console.log(BMap, map)
      this.center.lng = 116.404
      this.center.lat = 39.915
      this.zoom = 15
    },
    reset() {
      this.play = false
    },
    handleSearchComplete(res) {
      this.path = res.getPlan(0).getRoute(0).getPath()
    },
    rowClick: function(row) {
      let col = document.getElementById(`colMain`)
      let baiduMap = document.getElementById(`baiduMap`)
      col.removeChild(baiduMap)
      col.appendChild(baiduMap)
      console.log('123456', baiduMap)
      this.stop = true
      this.start.lng = 119.404
      this.start.lat = 39.915
      this.end.lng = 120.404
      this.end.lat = 39.915
      this.play = true
    }
  }
}
</script>

<template>
  <div class="search">
    <el-input
      placeholder="请输入内容"
      v-model="searchMsg"
      class="input-with-select"
    >
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option
          v-for="(item, index) in db_COLUMN_NAME"
          :key="index"
          :label="item.COLUMN_NAME"
          :value="item.COLUMN_NAME"
        ></el-option>
      </el-select>
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="sendMsg"
      ></el-button>
    </el-input>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      searchMsg: "",
      select: "",
      db_COLUMN_NAME: [],
    };
  },
  props: {
    sel: {},
  },
  methods: {
    sendMsg() {                 //搜索按钮，发送搜索数据给父元素
      if (this.select == "") {
        this.$message.error("请选择要查询的类型");
      } else if (this.searchMsg == "") {
        this.$message.error("请输入要查询的内容");
      } else {
        this.$emit("getMsg", this.select, this.searchMsg);
      }
    },
    get_db_COLUMN_NAME() {            //获取选择内容
      axios({
        method: "get",
        url: this.sel,
        headers: { Authorization: localStorage.getItem("token") },
      })
        .then((res) => {
          // console.log(res)
          this.db_COLUMN_NAME = res.data.data;
        })
        .catch((err) => {
          if (err.response.status === 401) {
            localStorage.removeItem("token");
            this.$router.push("/login");
          }
        });
    },
  },
  mounted() {
    this.get_db_COLUMN_NAME();
  },
};
</script>

<style scoped>
.search {
  width: 80%;
}
.el-select {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
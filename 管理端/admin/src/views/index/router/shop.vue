<template>
  <div id="app">
    <div class="main">
      <Search sel="/shops_api/db_COLUMN_NAME" @getMsg="getMsg"></Search>
      <div>
        <el-button size="mini" type="success" @click="addUse"
          >添加用户</el-button
        >
        <el-button size="mini" type="danger" @click="delChoose"
          >删除所选</el-button
        >
        <el-button size="mini" type="danger" @click="getUse">重置</el-button>
      </div>
      <div class="table">
        <!-- 表格 -->
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          height="100%"
          @selection-change="handleSelectionChange"
          border
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            v-for="(item, index) in db_COLUMN_NAME"
            :key="index"
            :prop="item.COLUMN_NAME == '商店logo' ? '' : item.COLUMN_NAME"
            :label="item.COLUMN_NAME"
          >
            <template slot-scope="scope">
              <span v-if="item.COLUMN_NAME == '商店logo'">
                <img
                  :src="scope.row.商店logo"
                  style="width: 90px; height: 90px"
                />
              </span>
              <span v-else>
                {{ scope.row[item.COLUMN_NAME] }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleChange(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="form" v-show="form_show">
      <!-- 编辑表单 -->
      <div class="formTop">
        <span>{{ this.add_or_change == "编辑" ? "编辑" : "添加" }}用户</span>
        <i class="el-icon-close" @click="formShow"></i>
      </div>
      <div class="formBottom">
        <el-form ref="form" :model="form" label-width="90px">
          <el-form-item label="商店名称">
            <el-input v-model="form.商店名称"></el-input>
          </el-form-item>
          <el-form-item label="账号">
            <el-input v-model="form.账号"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.密码"></el-input>
          </el-form-item>
          <el-form-item label="销量">
            <el-input v-model="form.销量"></el-input>
          </el-form-item>
          <el-form-item label="商店logo">
            <img :src="form.商店logo" style="width: 90px; height: 90px" />
            <el-upload
              class="upload-demo"
              :on-success="onloadSuccess"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
              style="width:400px"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="评分">
            <el-input v-model="form.评分"></el-input>
          </el-form-item>
          <el-form-item label="status">
            <el-select v-model="form.status" placeholder="请选择用户状态">
              <el-option label="正常" value="0"></el-option>
              <el-option label="冻结" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button @click="formShow">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "../../../components/search.vue";
import axios from "axios";
export default {
  data() {
    return {
      select: "",
      searchMsg: "",
      db_COLUMN_NAME: [],
      tableData: [],
      form_show: false,
      choose: [],
      changeIndex: "", //编辑的index
      add_or_change: "", //是点击编辑按钮还是添加按钮
      form: {
        商店名称: "",
        账号: "",
        密码: "",
        销量: "",
        商店logo: "",
        评分: "",
        status: "",
      },
    };
  },
  components: {
    Search,
  },
  created() {
    this.getUse();
    axios({
      //获取选择内容
      method: "get",
      url: "/shops_api/db_COLUMN_NAME",
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
  methods: {
    getMsg(select, searchMsg) {
      //获取搜索后的信息
      axios({
        method: "get",
        url: "/shops_api/searchShopsMsg",
        headers: { Authorization: localStorage.getItem("token") },
        params: { one: select, two: searchMsg },
      })
        .then((res) => {
          this.$message(res.data.msg);
          this.tableData = res.data.data;
          //   console.log(res);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            localStorage.removeItem("token");
            this.$router.push("/login");
          }
        });
    },
    getUse() {
      //获取所有用户信息
      axios({
        method: "get",
        url: "/shops_api/getShops",
        headers: { Authorization: localStorage.getItem("token") },
      })
        .then((res) => {
          this.tableData = res.data.data;
          // console.log(this.tableData);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            localStorage.removeItem("token");
            this.$router.push("/login");
          }
        });
    },
    handleChange(index, row) {
      //编辑页面获取某个用户信息
      this.add_or_change = "编辑";
      this.changeIndex = index;
      this.form_show = true;
      this.form.商店名称 = row.商店名称;
      this.form.账号 = row.账号;
      this.form.密码 = row.密码;
      this.form.销量 = row.销量;
      this.form.商店logo = row.商店logo;
      this.form.评分 = row.评分;
      this.form.status = row.status;
      // console.log(index, row);
    },
    handleDelete(index, row) {
      //删除某个用户
      this.$confirm(
        "此操作将永久删除“id为" +
          this.tableData[index].id +
          ",商店名称为" +
          row.商店名称 +
          "”用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.tableData.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      console.log(index, row);
    },
    handleSelectionChange(val) {
      //获取多选中选中用户信息（index）
      let a = [];
      val.forEach((val, index) => {
        this.tableData.forEach((v, i) => {
          // id 是每一行的数据id
          if (val.id == v.id) {
            a.push(i);
          }
        });
      });
      this.choose = a.sort(function (a, b) {
        return b - a;
      });
    },
    delChoose() {
      //删除多选所选的用户
      this.$confirm("确认删除所选用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          for (let i = 0; i < this.choose.length; i++) {
            this.tableData.splice(this.choose[i], 1);
          }
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    formShow() {
      //编辑页面不展示
      this.form_show = false;
      this.form.商店名称 = "";
      this.form.账号 = "";
      this.form.密码 = "";
      this.form.销量 = "";
      this.form.商店logo = "";
      this.form.评分 = "";
      this.form.status = "";
    },
    onSubmit() {
      //编辑页面的确定按钮
      if (this.add_or_change == "添加") {
        if (
          this.form.商店名称 != "" &&
          this.form.账号 != "" &&
          this.form.密码 != "" &&
          this.form.销量 != "" &&
          this.form.评分 != "" &&
          this.form.status != ""
        ) {
          const addUse = {
            id: "为了数据库安全不混乱,展示页面不能修改数据库",
            username: this.form.商店名称,
            password: this.form.账号,
            password: this.form.密码,
            password: this.form.销量,
            password: this.form.商店logo,
            password: this.form.评分,
            status: this.form.status,
          };
          this.tableData.push(addUse);
          this.form_show = false;
        } else {
          this.$message.error("请输入完整");
        }
      } else {
        this.tableData[this.changeIndex].商店名称 = this.form.商店名称;
        this.tableData[this.changeIndex].账号 = this.form.账号;
        this.tableData[this.changeIndex].密码 = this.form.密码;
        this.tableData[this.changeIndex].销量 = this.form.销量;
        this.tableData[this.changeIndex].商店logo = this.form.商店logo;
        this.tableData[this.changeIndex].评分 = this.form.评分;
        this.tableData[this.changeIndex].status = this.form.status;
        this.form_show = false;
      }
      //   console.log(this.changeIndex);
    },
    addUse() {
      //添加用户
      this.add_or_change = "添加";
      this.form_show = true;
    },
    onloadSuccess(){
      this.$message.error("展示页面为了数据库安全，未设置上传路径");
    },
  },
};
</script>

<style scoped>
#app {
  width: 100%;
  height: 100%;
  background-color: rgb(251, 251, 253);
}
.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.table {
  width: 90%;
  height: 80%;
  background-color: red;
}
.form {
  background-color: white;
  width: 60%;
  height: 70%;
  position: absolute;
  margin-left: 10%;
  margin-top: 5%;
  z-index: 2;
  overflow-y: hidden;
  border: 2px rgb(125, 96, 96) solid;
  border-radius: 15px;
}
.form .el-input {
  width: 60%;
}
.form::-webkit-scrollbar {
  display: none;
}
.formTop {
  width: 57.4%;
  height: 5%;
  /* display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center; */
  padding: 0px 20px 0px 20px;
  /* position: relative;
  top: 0px; */
  padding-top: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 15px;
  z-index: 3;
  /* background-color: red; */
}
.formTop i {
  padding-right: 30px;
  position: absolute;
  right: 0;
  cursor: pointer;
}
.formBottom {
  height: 95%;
  overflow-y: scroll;
}
.formBottom::-webkit-scrollbar {
  display: none;
}
.el-form {
  padding-bottom: 10%;
}
</style>
import axios from 'axios'

export default {
    data() {
        return {
            isCollapse: false
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        push(to) {
            this.$router.push('/index/' + to)
        },
        exit() {
            this.$confirm(
                "确认退出管理系统?",
                "提示",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                }
            )
                .then(() => {
                    localStorage.removeItem('token')
                    this.$router.push('/login')
                    this.$message({
                        type: "success",
                        message: "退出成功!",
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "取消退出",
                    });
                });
            // localStorage.removeItem('token')
            // this.$router.push('/login')
        }
    },
    created() {
        axios({
            method: 'get',
            url: '/api/getAdminMsg',
            headers: { Authorization: localStorage.getItem('token') }
        }).then(res => {
            // console.log(res)
        }).catch(err => {
            // console.log(err.response.status)
            if (err.response.status === 401) {
                localStorage.removeItem('token')
                this.$router.push('/login')
            }
        })
    }
}
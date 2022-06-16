import axios from 'axios'
import qs from 'qs'

export default {
    data() {
        return {
            ID: "",
            password: "",
        };
    },
    methods: {
        login() {
            if (this.ID == '' || this.password == '') {
                this.$message.error('账号与密码不能为空!');
            } else {
                axios({
                    method: 'post',
                    url: '/api/postAdmin',
                    data: qs.stringify({ 'password': this.password, 'adminName': this.ID }),
                }).then(res => {
                    // console.log(res)
                    if (res.data.token != undefined) {
                        localStorage.setItem('token', res.data.token)
                        this.$router.push('/index')
                    }else{
                        this.$message.error(res.data.msg);
                    }

                })
            }
        }
    },
};
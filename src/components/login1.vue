  <div>
    <input type="text" v-model="user.username" placeholder="用户名"/>
    <input type="text" v-model="user.password" placeholder="密码"/>
    <button @click="handleLogin" :loading="loading">登录</button>
  </div>
      handleLogin () {
        this.loading = true
        this.api.login(this.user.username, this.user.password).then((res) => {
          if (res.status === 200) {
            this.$store.commit(types.LOGIN, res.data)
            this.api.getMenu().then((res) => {
              sessionStorage.setItem('menuData', JSON.stringify(res.data.navData))
              sessionStorage.setItem('user', this.user.username)
              sessionStorage.setItem('routes', JSON.stringify(res.data.routerData))
              this.add_Routes(res.data.routerData) // 触发vuex里的增加路由
              this.$router.push('/menu5_item1')
            })
          } else if (res.status === 202) {
            this.$message.error('账号或密码错误')
          } else if (res.status === 203) {
            this.$message.error('账号已被锁定,请联系管理员!')
          }
        })
      },

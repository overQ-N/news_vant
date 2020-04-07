<template>
  <div class="box">
    <div class="back">
      <i class="iconfont iconicon-test"></i>
    </div>
    <div class="logo">
      <i class="iconfont iconnew"></i>
    </div>
    <div class="loginForm">
      <van-form @submit="onSubmit">
        <van-field
          v-model="loginForm.username"
          name="用户名"
          placeholder="用户名/手机号码"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="loginForm.password"
          type="password"
          name="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">登录</van-button>
        </div>
      </van-form>
      <div style="margin: 16px;">
          <van-button round block type="info" @click="regist">注册</van-button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  mounted () {
  },
  methods: {
    async onSubmit (values) {
      const { data: res } = await this.$axios.post(
        'login',
        this.loginForm
      )
      console.log(res)
      this.$store.dispatch('getUserInfoAsync', res.data)
      const userinfo = {
        token: res.data.token,
        id: res.data.user.id
      }

      console.log(JSON.stringify(userinfo))

      sessionStorage.setItem('news_token', JSON.stringify(userinfo))
      // if (res.meta.status !== 200) return this.$toast.fail(res.meta.msg)
      this.$toast.success('登录成功')
      // 如果有跳转而来的路径，跳转回去，否则到首页
      console.log(this.$route.query)
      this.$route.query.formUrl ? this.$router.push(this.$route.query.formUrl) : this.$router.push('/')
    },
    regist () {
      this.$router.push('/regist')
    }
  }
}
</script>

<style lang='stylus' scoped>
$bg = #f2f2f2
$font-color = #cc3300
$vw_base = 750

vw(x)
  (x / $vw_base) * 100vw

.box
  padding: vw(20)
  background: $bg
  height: 100%

  .back i
    font-size: vw(56)

  .logo
    height: vw(300)
    margin-top: vw(60)
    text-align: center

    i
      font-size: vw(270)
      color: $font-color

  .loginForm
    margin-top: vw(60)
    height: vw(350)

    .van-cell
      background: $bg
      border-bottom: 1px solid #aaa

    button
      border 0
      background $font-color
</style>

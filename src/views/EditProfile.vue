<template>
  <div class="container">
    <navBar label="编辑资料" />
    <div class="head_img">
      <div>
        <img
          :class="userinfo.head_img===''?'none':''"
          :src="$axios.defaults.baseURL + userinfo.head_img"
        />
        <van-uploader class="uploader" :after-read="afterRead" />
      </div>
    </div>
    <div class="list">
      <listBar label="昵称" :tips="userinfo.nickname" @click.native="initNickNameDialog" />
      <listBar label="密码" tips="******" @click.native="showPasswordDialog=true" />
      <listBar
        label="性别"
        :tips="userinfo.gender | formatGender"
        @click.native="showGenderAction=true"
      />
    </div>
    <!-- 修改昵称的对话框 -->
    <van-dialog
      title="修改昵称"
      v-model="showNickNameDialog"
      @cancel="editNickNameCancel"
      @confirm="editNickName"
    >
      <van-form>
        <van-field placeholder="请输入用户名" v-model="nickName" />
      </van-form>
    </van-dialog>
    <!-- 修改密码对话框 -->
    <van-dialog
      title="修改密码"
      show-cancel-button
      v-model="showPasswordDialog"
      @confirm="editPassword"
    >
      <van-field type="password" v-model="password" />
    </van-dialog>
    <!-- 修改性别 -->
    <van-action-sheet
      v-model="showGenderAction"
      close-on-click-action
      :actions="genderList"
      @select="onSelect"
    />
  </div>
</template>

<script>
import navBar from '../components/NavBar'
import listBar from '../components/ListBar'

export default {
  data () {
    return {
      userinfo: {},
      showNickNameDialog: false,
      nickName: '',
      showPasswordDialog: false,
      password: '',
      showGenderAction: false,
      genderList: [
        {
          name: '男',
          value: 1
        },
        { name: '女', value: 0 }
      ]
    }
  },
  mounted () {
    // this.userinfo = this.$route.params.userinfo
    // this.userinfo = this.$store.state.userInfo.user
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      const id = JSON.parse(sessionStorage.getItem('news_token')).id
      const { data: res } = await this.$axios.get('user/' + id)
      this.userinfo = res.data
    },
    // 上传头像
    async afterRead (files) {
      const { file } = files
      const fd = new FormData()
      fd.append('file', file)
      const { data: res } = await this.$axios.post('/upload', fd)
      this.userinfo.head_img = res.data.url
      // this.$store.dispatch('editUserInfoAsync', {
      //   head_img: res.data.url
      // })
      this.editUserInfo({
        head_img: res.data.url
      })
    },
    // 编辑用户
    async editUserInfo (editData) {
      const { data: res } = await this.$axios.post(
        '/user_update/' + this.userinfo.id,
        editData
      )

      if (res.message === '修改成功') {
        this.getUserInfo()
        return this.$toast.success(res.message)
      }
    },
    // 将用户原有的nickname保存起来
    initNickNameDialog () {
      this.nickName = this.userinfo.nickname
      this.showNickNameDialog = true
    },
    // 取消修改昵称
    editNickNameCancel () {
      this.nickName = this.userinfo.nickname
    },
    // 修改昵称
    editNickName () {
      this.editUserInfo({
        nickname: this.nickName
      })
    },
    // 修改密码
    editPassword () {
      if (this.password === '') {
        return this.$toast.fail('密码不能为空')
      }
      this.editUserInfo({
        password: this.password
      })
    },
    // 修改性别
    onSelect (item) {
      this.editUserInfo({
        gender: item.value
      })
    }
  },
  components: {
    navBar,
    listBar
  },
  filters: {
    formatGender (gender) {
      let sex = '未知'
      switch (gender) {
        case 1:
          sex = '男'
          break
        case 0:
          sex = '女'
          break
        default:
          sex = '未知'
          break
      }
      return sex
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

.container
  background: $bg
  height: 100%

.head_img
  height: vw(300)
  display: flex
  align-items: center
  justify-content: center

  &>div
    width: vw(160)
    height: vw(160)
    border-radius: 50%
    background: #424a60
    position: relative

    .none
      display: none

    img
      width: 100%
      height: 100%
      border-radius: 50%

    .uploader
      position: absolute
      width: vw(160)
      height: vw(160)
      left: 0
      opacity: 0
      border-radius: 50%

.list
  padding: vw(40)
</style>

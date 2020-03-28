import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    userInfo: {

    }
  },
  mutations: {
    getUserInfo (state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    getUserInfoAsync (context, userInfo) {
      context.commit('getUserInfo', userInfo)
    },
    // 编辑用户
    async editUserInfoAsync (context, editData) {
      const { data: res } = await this.$axios.post(
        '/user_update/' + this.userinfo.id,
        {
          editData
        }
      )
      if (res.message === '修改成功') {
        return this.$toast.success(res.message)
      }
    }
  }
})
export default store

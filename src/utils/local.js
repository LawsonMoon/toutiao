// 顶一个常量 token的key
const KEY = 'tt-hm'

const local = {
  setUser (user) {
    // 传递的user是token
    const jsonStr = JSON.stringify(user)
    // 将token存到sessionStorage中
    window.sessionStorage.setItem(KEY, jsonStr)
  },
  getUser () {
    const jsonStr = window.sessionStorage.getItem(KEY)
    return JSON.parse(jsonStr)
  },
  delUser () {
    //   删除token
    window.sessionStorage.removeItem(KEY)
  }
}

export default local

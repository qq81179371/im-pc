import defaultImg from '../assets/images/avatar.png'
/**
 * 检测图片是否存在
 * @param url
 */
const imageIsExist = (url) => new Promise((resolve) => {
  let img = new Image()
  // eslint-disable-next-line func-names
  img.onload = function() {
    if (this.complete === true) {
      resolve(true)
      img = null
    }
  }
  img.onerror = () => {
    resolve(false)
    img = null
  }
  img.src = url
})
// 指令名称为：real-img
const realImg = {
  async  mounted(el) {
    const imgURL = el.src// 获取图片地址
    if (imgURL) {
      const exist = await imageIsExist(imgURL)
      if (exist) {
        el.setAttribute('src', imgURL)
      } else {
        el.setAttribute('src', defaultImg)
      }
    } else {
      el.setAttribute('src', defaultImg)
    }
  }
}

const a = {}

export { realImg, a }

import './login.css'
import '../reset.css'
import background from '../asset/callSignBg.png'
import { deleteCookie, getCookie } from "../module/cookie";

console.log('Hello ImoLogin')

window.onload = () => {
  if (!getCookie('fileToken')) {
    console.log('fileToken is exist')
    location.href = '../index.html'
  }
}

const loginBackground = document.querySelector('.login-background')
loginBackground.style.backgroundImage = `url(${background})`

const delCookieBtn = document.querySelector('.del-cookie-btn')
delCookieBtn.addEventListener('click', () => {
  deleteCookie('fileToken')
})

const imoInput = document.querySelectorAll('.imo-input')
const loginBtn = document.querySelector('.imo-login-btn')
loginBtn.disabled = true

imoInput.forEach((input) => {
  input.addEventListener('input', (event) => {
    const value = event.target.value
    if (!value.length) {
      loginBtn.disabled = true
    }
    if (imoInput[0].value.length === imoInput[1].value.length) {
      loginBtn.disabled = false
    }
  })
})

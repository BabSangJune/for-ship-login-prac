import './login.css'
import '../reset.css'
import background from '../asset/callSignBg.png'
import { deleteCookie, getCookie, setCookie } from "../module/cookie";
import * as setLoginAtt from './setLoginAtt'
import * as modal from '../module/modal/modal.js'

console.log('Hello ImoLogin')

const confirmVerifyCode = 1234

const loginBackground = document.querySelector('.login-background')
loginBackground.style.backgroundImage = `url(${ background })`

const delFileCookieBtn = document.querySelector('.del-cookie-btn__file')
delFileCookieBtn.addEventListener('click', () => {
  deleteCookie('fileToken')
})

const delCodeCookieBtn = document.querySelector('.del-cookie-btn__code')
delCodeCookieBtn.addEventListener('click', () => {
  deleteCookie('codeToken')
})

window.onload = () => {
  if (!getCookie('fileToken')) {
    location.href = '../index.html'
  }
  setImoInputEvent()
  modal.modalOn()
}

const setImoInputEvent = () => {
  const imoInput = document.querySelectorAll('.imo-input')
  const loginBtn = document.querySelector('.imo-login-btn')

  if (!imoInput[0].value || !imoInput[1].value) {
    loginBtn.disabled = true
  }

  imoInput.forEach((input) => {
    input.addEventListener('input', (event) => {
      const value = event.target.value
      if (!value.length) {
        loginBtn.disabled = true
      }

      if (imoInput[0].value !== imoInput[1].value) {
        loginBtn.disabled = true
      }

      if (imoInput[0].value === imoInput[1].value) {
        loginBtn.disabled = false
      }
    })
  })

  loginBtn.addEventListener('click', (event) => {
    event.preventDefault()
    if (imoInput[0].value !== imoInput[1].value) {
      alert('비밀번호가 일치하지 않습니다.')
      initInput(imoInput)
      imoInput[0].focus()
      return
    }

    if (imoInput[0].value === imoInput[1].value) {
      const codeToken = getCookie('codeToken')
      codeToken ? goLoading() : codeTokenFalse()
      initInput(imoInput)
    }
  })
}

const goLoading = () => {
  const InputWrapper = document.querySelector('.input-wrapper')

  removeChild(InputWrapper)

  InputWrapper.className = `loading-wrapper`
  let loadingPercentNum = 0
  let loadingPercent = `${ loadingPercentNum }%`

  const { loadingValue, loadingBar } = setLoginAtt.setLoadingBar(InputWrapper, loadingPercentNum, loadingPercent)

  startLoadingInterval(loadingPercentNum, loadingPercent, loadingValue, loadingBar)
  // loadingPercentNum = setInterval(startLoadingInterval, 150, loadingPercentNum, loadingPercent, loadingValue, loadingBar)
}

// const startLoadingInterval = (loadingPercentNum, loadingPercent, loadingValue, loadingBar) => {
//   console.log('startLoadingInterval')
//   loadingPercentNum += 1
//   loadingPercent = `${ loadingPercentNum }%`
//   loadingValue.textContent = loadingPercent
//   loadingBar.setAttribute('value', `${ loadingPercentNum }`)
//   console.log(loadingPercentNum)
//   if (loadingPercentNum === 100) {
//     // location.href = '../main/main.html'
//     alert('loading complete')
//   }
// }

const startLoadingInterval = (loadingPercentNum, loadingPercent, loadingValue, loadingBar) => {
  const loadingInterval = setInterval(() => {
    loadingPercentNum += 1
    loadingPercent = `${ loadingPercentNum }%`
    loadingValue.textContent = loadingPercent
    loadingBar.setAttribute('value', `${ loadingPercentNum }`)
    if (loadingPercentNum === 100) {
      clearInterval(loadingInterval)
      location.href = '../main/main.html'
    }
  }, 50)
}

const removeChild = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}

const initInput = (inputs) => {
  inputs.forEach((input) => {
    input.value = ''
  })
}

const codeTokenFalse = () => {
  const inputWrapper = document.querySelector('.input-wrapper')
  const InputForm = document.querySelector('.login-input-wrapper')
  const inputTitle = document.querySelector('.input-title')
  const inputSubTitle = document.querySelector('.input-title__sub')

  inputTitle.textContent = 'Please enter the code.'
  inputSubTitle.textContent = 'Please contact the shipping company for confirmation code to register your new machine and enter the code you received.'

  // while (InputForm.firstChild) {
  //   InputForm.removeChild(InputForm.firstChild)
  // }
  removeChild(InputForm)
  changeToInputCode(InputForm)
  setLoginAtt.setContact(inputWrapper)
}

const changeToInputCode = (InputForm) => {
  for (let i = 0; i < 4; i++) {
    const codeInput = document.createElement('input')
    codeInput.setAttribute('class', `code-input code-input-${ i }`)
    codeInput.setAttribute('type', 'text')
    codeInput.setAttribute('maxlength', '1')
    InputForm.appendChild(codeInput)
    codeInput.addEventListener('keyup', onInputCode)
  }
}

const onInputCode = (event) => {
  const codeInput = document.querySelectorAll('.code-input')
  let verifyCode = ''

  if (event.target.value.length === 1 && event.target.nextElementSibling) {
    event.target.nextElementSibling.focus()
  }

  if (event.keyCode === 8 && event.target.previousElementSibling) {
    event.target.previousElementSibling.focus()
  }

  verifyCode = codeInput[0].value + codeInput[1].value + codeInput[2].value + codeInput[3].value

  if (verifyCode.length === 4) {
    if (verifyCode !== confirmVerifyCode.toString()) {
      initInput(codeInput)
      codeInput[0].focus()
      alert('인증코드가 일치하지 않습니다.')
      return
    }

    setCookie('codeToken', true)
    goLoading()
  }
}
